import { useState } from "react";

const AddPost = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: "Workout",
      description: "Go to the gym and lift weights",
      completion: {},
    },
  ]);

  return <div></div>;
};

export default AddPost;
