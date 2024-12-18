export const fetchHabit = async (habitId, reset, getToken) => {
  try {
    const token = await getToken();
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}}/habit/${habitId}/survey`,
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
      navigate("/");
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
      navigate("/");
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
      navigate("/");
    } else {
      console.error("Failed to delete habit");
    }
  } catch (err) {
    console.error("Error during habit deletion:", err);
  }
};
