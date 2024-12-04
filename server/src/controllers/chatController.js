import { prisma } from "../middlewares/prisma.js";
import { openai } from "../services/openai.js";

const getHabits = async (userId) => {
  const habits = await prisma.habit.findMany({
    where: {
      userId: userId,
    },
    select: {
      habitName: true, // Assuming `habitName` is the name of the habit field
      frequency: {
        select: {
          dayOfWeek: true, // Assuming `days` represents the frequency days
        },
      },
    },
  });

  return habits;
};

const getHabitLogs = async (habitName, userId) => {
  const habitLogs = await prisma.habitLog.findMany({
    where: {
      habit: {
        habitName: {
          contains: habitName,
          mode: "insensitive",
        },
        userId: userId,
      },
    },
  });

  return habitLogs;
};

const tools = [
  {
    type: "function",
    function: {
      name: "get_habits",
      description:
        "Get all habits for a user. Call this whenever you need to know the user's habits.",
      parameters: {
        type: "object",
        properties: {
          user_id: {
            type: "string",
            description: "The user ID to get habits for.",
          },
        },
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_habit_logs",
      description:
        "Get the logs for a specific habit. Call this whenever you need to know the user's entry logs for a specific habit or user asks about their performance.",
      parameters: {
        type: "object",
        properties: {
          habit_name: {
            type: "string",
            description: "The habit name to get progress for.",
          },
          user_id: {
            type: "string",
            description: "The user ID to get progress for.",
          },
        },
        required: ["habit_name"],
      },
    },
  },
];

async function executeTool(toolName, args, userId) {
  switch (toolName) {
    case "get_habits":
      return await getHabits(userId);
    case "get_habit_logs":
      return await getHabitLogs(args.habit_name, userId);
    default:
      throw new Error(`Tool ${toolName} is not supported`);
  }
}

export async function generateResponse(messages, userId) {
  const currentMessageContent = messages[messages.length - 1].content;

  try {
    const previousMessages = messages.slice(0, -1);
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a helpful coach assisting a user with their habits. 
          Use the 'get_habits' tool to get the user's habits when user asks about their habits, 
          and 'get_habit_logs' tool to get the progress of a specific habit when user asks for tips and analysis on one specific habit.
          Use this information to provide personalized advice and encouragement 
          to help the user stay on track.`,
        },
        ...previousMessages,
        { role: "user", content: currentMessageContent },
      ],
      tools: tools,
    });

    console.log("Response generated:", response);

    // Check if the model requested a tool call
    if (response.choices[0].finish_reason === "tool_calls") {
      const toolCalls = response.choices[0].message.tool_calls;
      console.log("Tool calls:", toolCalls);
      const toolResults = await Promise.all(
        toolCalls.map(async (toolCall) => {
          const { name, arguments: argsString } = toolCall.function;
          const toolCallId = toolCall.id;
          const args = JSON.parse(argsString);

          try {
            const toolResult = await executeTool(name, args, userId);
            return {
              id: toolCallId,
              result: toolResult,
              success: true,
            };
          } catch (error) {
            console.error(`Error executing tool ${name}:`, error);
            return {
              id: toolCallId,
              error: error.message,
              success: false,
            };
          }
        })
      );

      // Map results back to the LLM
      const toolResultMessages = toolResults.map((toolResult) => ({
        role: "tool",
        content: JSON.stringify(
          toolResult.success ? toolResult.result : { error: toolResult.error }
        ),
        tool_call_id: toolResult.id,
      }));

      // Send the tool result back to the model for final response generation
      const completionPayload = {
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are a helpful coach assisting a user with their habits. 
            Use the 'get_habits' tool to get the user's habits, 
            and 'get_habit_logs' tool to get the progress of a specific habit.
            Use this information to provide personalized advice and encouragement 
            to help the user stay on track.`,
          },
          ...previousMessages,
          { role: "user", content: currentMessageContent },
          response.choices[0].message,
          ...toolResultMessages,
        ],
      };

      const finalResponse = await openai.chat.completions.create({
        model: completionPayload.model,
        messages: completionPayload.messages,
      });

      console.log("Final response:", finalResponse.choices[0].message.content);

      return finalResponse.choices[0].message;
    }

    // If no tool call, return the generated response directly
    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error during response generation:", error);
    return { error: "An error occurred during response generation" };
  }
}
