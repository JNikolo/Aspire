import { useState } from "react";
import shrek from "../assets/shrek.png";
import { useNavigate } from "react-router-dom";

export const ProfilePage = () => {
  const [communities, setCommunities] = useState([
    "Riding a bike",
    "Drinking water",
    "Swamp Time",
  ]);

  const [habits, setHabits] = useState([
    "Morning Meditation",
    "Doing Leetcode",
    "Daily Walk",
  ]);

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileName, setProfileName] = useState("Shrek");
  const [profileImage, setProfileImage] = useState(shrek);
  const [tempName, setTempName] = useState(profileName);
  const [tempImage, setTempImage] = useState(profileImage);

  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setTempImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const saveChanges = () => {
    setProfileName(tempName);
    setProfileImage(tempImage);
    setIsEditingProfile(false);
  };

  const discardChanges = () => {
    setTempName(profileName);
    setTempImage(profileImage);
    setIsEditingProfile(false);
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
                Save Changes
              </button>
              <button
                onClick={discardChanges}
                className="btn bg-red-500 text-white hover:bg-red-600 shadow-md px-4 py-2 rounded-lg"
              >
                Discard Changes
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditingProfile(true)}
              className="btn bg-blue-500 text-white hover:bg-blue-600 shadow-md px-4 py-2 rounded-lg"
            >
              Edit Profile
            </button>
          )}
        </div>
        <div className="flex-shrink-0 relative">
          {isEditingProfile ? (
            <label className="cursor-pointer">
              <img
                src={tempImage}
                alt="Editable Profile"
                className="w-36 h-36 rounded-full object-cover border-4 border-blue-300"
              />
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>
          ) : (
            <img
              src={profileImage}
              alt="Profile"
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
            <h2 className="text-3xl font-bold text-black mb-4">{profileName}</h2>
          )}
          <div className="flex flex-wrap gap-2">
            {communities.map((community, index) => (
              <div
                key={index}
                className="bg-blue-100 rounded-lg px-4 py-2 text-black shadow-sm"
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
          <h3 className="text-2xl font-bold text-black">Habits</h3>
          <button
            onClick={() => navigate("/new-habit")}
            className="btn bg-blue-500 text-white hover:bg-blue-600 shadow-md px-4 py-2 rounded-lg"
          >
            New Habit
          </button>
        </div>
        <div className="flex flex-col gap-4">
          {habits.map((habit, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-4 flex items-center"
            >
              <h4 className="text-xl font-bold text-black">{habit}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
