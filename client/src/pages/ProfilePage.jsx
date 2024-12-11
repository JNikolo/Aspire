import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { supabase } from "../supabase/supabase";
import { v4 as uuidv4 } from "uuid";
import { FaPen } from "react-icons/fa";

export const ProfilePage = () => {
  //const { user } = useUser();
  const { getToken } = useAuth();
  const navigate = useNavigate();

  const [profileName, setProfileName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [tempName, setTempName] = useState("");
  const [tempImage, setTempImage] = useState("");
  const [habits, setHabits] = useState([]);
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = await getToken();
        if (!token) throw new Error("Failed to retrieve auth token");

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        setProfileName(data?.profileName);
        setProfileImage(data?.profilePicture);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [getToken]);

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const token = await getToken();
        if (!token) throw new Error("Failed to retrieve auth token");

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/profile/communities`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const communitiesData = await response.json();
        setCommunities(communitiesData);
      } catch (error) {
        console.error("Error fetching communities:", error);
      }
    };

    fetchCommunities();
  }, [getToken]);

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const token = await getToken();
        if (!token) throw new Error("Failed to retrieve auth token");

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/profile/habits`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const habitsData = await response.json();
        setHabits(habitsData);
        console.log(habitsData);
      } catch (error) {
        console.error("Error fetching habits:", error);
      }
    };

    fetchHabits();
  }, [getToken]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setTempImage(reader.result);
      };

      reader.readAsDataURL(file);
    } else {
      console.log("No file selected");
    }
  };

  const discardChanges = () => {
    setTempName(profileName);
    setTempImage(profileImage);
    setIsEditingProfile(false);
  };

  const saveChanges = async () => {
    try {
      const token = await getToken();
      if (!token) throw new Error("Failed to retrieve auth token");

      let uploadedImageUrl = profileImage;

      if (tempImage.startsWith("data:image")) {
        setProfileImage(tempImage);
        const fileName = `public/${uuidv4()}.png`;

        const response = await fetch(tempImage);
        const blob = await response.blob();

        const { data, error } = await supabase.storage
          .from("images")
          .upload(fileName, blob, { contentType: "image/png", upsert: true });

        if (error) throw new Error(error.message);

        uploadedImageUrl = `https://wmbdpoqbewenbpmsgaab.supabase.co/storage/v1/object/public/images/${data.path}`;

        const oldFilePath = profileImage.split(
          "/storage/v1/object/public/images/"
        )[1];
        if (oldFilePath) {
          const { error: deleteError } = await supabase.storage
            .from("images")
            .remove([oldFilePath]);
          if (deleteError) throw new Error(deleteError.message);
        }
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          profileName: tempName,
          profilePicture: uploadedImageUrl,
        }),
      });

      if (!response.ok) throw new Error("Failed to save profile changes");

      const updatedUser = await response.json();
      setProfileName(updatedUser.profileName);
      //setProfileImage(updatedUser.profilePicture);
      setIsEditingProfile(false);
    } catch (error) {
      console.error("Error saving profile changes:", error);
    }
  };

  return (
    <div className="bg-blue-100 min-h-screen flex flex-col items-center p-6">
      {/* Profile */}
      <div className="bg-white bg-opacity-90 rounded-lg shadow-xl p-6 w-full max-w-4xl flex items-center relative">
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          {isEditingProfile ? (
            <>
              <button
                onClick={saveChanges}
                className="btn bg-green-500 text-white hover:bg-green-600 shadow-md px-4 py-2 rounded-lg"
              >
                Save Changes 💾
              </button>
              <button
                onClick={discardChanges}
                className="btn bg-red-500 text-white hover:bg-red-600 shadow-md px-4 py-2 rounded-lg"
              >
                Discard Changes 🗑️
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                setTempName(profileName);
                setTempImage(profileImage);
                setIsEditingProfile(true);
              }}
              className="btn bg-blue-500 text-white hover:bg-blue-600 shadow-md px-4 py-2 rounded-lg"
            >
              Edit Profile ✏️
            </button>
          )}
        </div>
        <div className="flex-shrink-0 relative">
          {isEditingProfile ? (
            <label className="cursor-pointer">
              <img
                src={tempImage}
                loading="lazy"
                className="w-36 h-36 rounded-full object-cover border-4 border-blue-300"
              />
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
              {/* Pencil icon at top-right */}
              <div className="absolute top-0 right-0 bg-white rounded-full p-2 shadow-md">
                <FaPen className="text-blue-500" />
              </div>
            </label>
          ) : (
            <img
              src={profileImage}
              loading="lazy"
              className="w-36 h-36 rounded-full object-cover border-4 border-blue-300"
            />
          )}
        </div>
        <div className="ml-6 flex-grow">
          {isEditingProfile ? (
            <input
              type="text"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              className="text-3xl font-bold text-black mb-4 border rounded-lg p-2 bg-white"
            />
          ) : (
            <h2 className="text-3xl font-bold text-black mb-4">
              {profileName}
            </h2>
          )}
          {/* Communities */}
          <div className="flex flex-wrap gap-4">
            {communities.map((community, index) => (
              <div
                key={index}
                className="bg-blue-100 rounded-lg px-6 py-3 text-black shadow-md hover:bg-blue-200 transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
              >
                {community}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Habits */}
      <div className="mt-8 bg-white bg-opacity-90 rounded-lg shadow-xl p-6 w-full max-w-4xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold text-black">Your Habits</h3>
          <button
            onClick={() => navigate("/survey/new")}
            className="btn bg-blue-500 text-white hover:bg-blue-600 shadow-md px-4 py-2 rounded-lg"
          >
            New Habit{" "}
            <span role="img" aria-label="new habit">
              🌱
            </span>
          </button>
        </div>

        <div className="flex flex-col gap-6">
          {habits.map((habit, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 flex flex-col gap-4"
            >
              <h4 className="text-xl font-semibold text-black">
                {habit.habitName}
              </h4>
              <div className="flex flex-wrap gap-3">
                {habit.HabitLogs.map((log, logIndex) => (
                  <div
                    key={logIndex}
                    className="bg-green-100 rounded-full px-6 py-2 text-green-800 text-sm font-medium flex items-center gap-2 hover:bg-green-200 transition-all duration-300 ease-in-out"
                  >
                    <span role="img" aria-label="log-date">
                      📅
                    </span>
                    <span className="hover:underline">
                      {new Date(log.logDate).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
