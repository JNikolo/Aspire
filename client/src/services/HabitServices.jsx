export const fetchHabit = async (habitId, reset, getToken) => {
  try {
    const token = await getToken();
    const response = await fetch(
      `http://127.0.0.1:3000/habit/${habitId}/survey`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();
    const { habitName, frequency, notifications, selectedDays } = data;
    reset({
      habitName,
      frequency: frequency.map((f) => f.dayOfWeek),
      notifications,
      selectedDays: selectedDays.map((d) => d.dayOfWeek),
    });
  } catch (err) {
    console.error("Error during habit fetch:", err);
  }
};
export const getHabits = async (getToken) => {
  try {
    const token = await getToken();
    const response = await fetch("http://127.0.0.1:3000/habit", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch habits");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error during fetching all habits:", err);
    throw err;
  }
};

export const createHabit = async (getToken, data, navigate) => {
  try {
    const token = await getToken();
    const response = await fetch("http://127.0.0.1:3000/habit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      navigate("/dashboard");
    }
  } catch (err) {
    console.error("Error during habit creation:", err);
  }
};

export const updateHabit = async (getToken, habitId, data, navigate) => {
  try {
    const token = await getToken();
    const response = await fetch(
      `http://127.0.0.1:3000/habit/${habitId}/survey`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );
    if (response.ok) {
      navigate("/dashboard");
    }
  } catch (err) {
    console.error("Error during habit update:", err);
  }
};

export const deleteHabit = async (habitId, getToken, navigate) => {
  try {
    const token = await getToken();
    const response = await fetch(`http://127.0.0.1:3000/habit/${habitId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      navigate("/dashboard");
    } else {
      console.error("Failed to delete habit");
    }
  } catch (err) {
    console.error("Error during habit deletion:", err);
  }
};

export const postHabitLog = async (habitId, data, getToken) => {
  try {
    const token = await getToken();
    const response = await fetch(`http://127.0.0.1:3000/habit/${habitId}/log`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to create habit log");
    }

    return await response.json();
  } catch (err) {
    console.error("Error during habit log creation:", err);
    throw err;
  }
};

export const fetchHabitLogs = async (habitId, getToken) => {
  try {
    const token = await getToken();
    const response = await fetch(`http://127.0.0.1:3000/habit/${habitId}/log`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch habit logs");
    }

    return await response.json();
  } catch (err) {
    console.error("Error during habit logs fetch:", err);
    throw err;
  }
};

export const updateHabitLog = async (habitId, logId, data, getToken) => {
  try {
    const token = await getToken();
    const response = await fetch(
      `http://127.0.0.1:3000/habit/${habitId}/log/${logId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );
  } catch (err) {
    console.error("Error during habit log update:", err);
  }
};

export const deleteHabitLog = async (habitId, logId, getToken) => {
  try {
    const token = await getToken();
    const response = await fetch(
      `http://127.0.0.1:3000/habit/${habitId}/log/${logId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (err) {
    console.error("Error during habit log deletion:", err);
  }
};
