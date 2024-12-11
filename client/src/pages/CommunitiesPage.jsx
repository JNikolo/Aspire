import React, { useState } from "react";
import { format } from "date-fns";
import { NavBar } from "../components/NavBar";

const communityOptions = [
  { value: "1", label: "Mindful Living" },
  { value: "2", label: "Language Learners" },
  { value: "3", label: "Music Journey" },
  { value: "4", label: "Culinary Adventures" },
  { value: "5", label: "Creative Crafts" },
  { value: "6", label: "Sustainable Living" },
];

const log = [
  {
    id: 1,
    title: "React Hooks",
    description: "Spent 2 hours coding today",
    picture: "https://picsum.photos/200/300",
    community: { name: "Code & Create" },
    logDate: new Date(),
  },
  {
    id: 2,
    title: "Day 1 of Fitness Challenge",
    description: "I'm feeling tired, but also great! 29 more days to go",
    picture: "https://picsum.photos/200/300",
    community: { name: "Fitness Goals" },
    logDate: new Date(),
  },
  {
    id: 3,
    title: "Morning Run",
    description: "I was out of breath from running. The view was worth it",
    picture: "https://picsum.photos/200/300",
    community: { name: "Running Crew" },
    logDate: new Date(),
  },
  {
    id: 4,
    title: "Book Review",
    description: "Discussing 'Atomic Habits' by James Clear",
    picture: "https://picsum.photos/200/300",
    community: { name: "Book Club" },
    logDate: new Date(),
  },
  {
    id: 5,
    title: "Steve Job - Autobiography",
    description: "I've read 3 chapters today. It's so good",
    picture: "https://picsum.photos/200/300",
    community: { name: "Book Club" },
    logDate: new Date(),
  },
];

export const CommunitiesPage = () => {
  const [items, setItems] = useState(log);
  const [filter, setFilter] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [selectedCommunities, setSelectedCommunities] = useState(
    communityOptions[0]
  );
  const initialDisplay = 4;
  const displayCommunities = showAll
    ? communityOptions
    : communityOptions.slice(0, initialDisplay);

  const handleCommunityChange = (event) => {
    const selectedCommunity = event.target.value;
    setFilter(selectedCommunity);

    if (selectedCommunity) {
      const filteredItems = log.filter(
        (item) => item.community.name === selectedCommunity
      );
      setItems(filteredItems);
    } else {
      setItems(log);
    }
  };

  return (
    <>
      <NavBar />
      <div className="bg-[url('assets/mountain.jpeg')] bg-cover min-h-screen flex flex-col items-center p-4">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold text-blue-light mt-8">
            Communities
          </h1>
          <p className="text-gray mt-2">
            Join a community to connect with like-minded individuals.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-8 w-full max-w">
          {displayCommunities.map((community) => (
            <div
              key={community.value}
              className="card bg-white/90 hover:bg-white transition-colors flex flex-col items-center justify-center p-5 rounded-lg shadow-md h-32 w-60 cursor-pointer"
              onClick={() => setSelectedCommunities(community)}
            >
              <div className="text-xl font-bold text-blue-light text-center">
                {community.label}
              </div>
              <button className="btn mt-4 bg-brown-dark text-white w-2/3">
                Join Community
              </button>
            </div>
          ))}
          {showAll ? (
            <div
              className="card bg-white/90 hover:bg-white transition-colors flex items-center justify-center cursor-pointer p-5 shadow-md h-32 w-60"
              onClick={() => setShowAll(false)}
            >
              <div className="text-xl font-bold text-brown-dark">
                Show Less{" "}
              </div>
            </div>
          ) : (
            communityOptions.length > initialDisplay && (
              <div
                className="card bg-white/90 hover:bg-white transition-colors flex items-center justify-center cursor-pointer p-5 rounded-lg shadow-md h-32 w-60"
                onClick={() => setShowAll(true)}
              >
                <div className="text-xl font-bold text-brown-dark">
                  Show All
                </div>
              </div>
            )
          )}
        </div>

        <div className="mt-8 w-full max-w-10xl flex">
          <div className="card-body bg-white bg-opacity-50 shadow-md p-6 rounded-lg">
            <h2 className="text-4xl font-bold text-blue-light text-center">
              Community Feed
            </h2>
            <label className="form-control w-full max-w-xs text-center">
              <div className="label">
                <p className="text-stone-600 mt-2">
                  Explore posts from this community.
                </p>
              </div>
              <select
                className="select select-bordered bg-slate-200 text-stone-600"
                value={filter}
                onChange={handleCommunityChange}
              >
                <option value="">All Communities</option>
                <option value="Code & Create">Code & Create</option>
                <option value="Book Club">Book Club</option>
                <option value="Running Crew">Running Crew</option>
                <option value="Fitness Goals">Fitness Goals</option>
              </select>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-8 w-full max-w">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="h-auto sm:w-auto s:h-auto md:h-60 md:w-auto lg:h-auto shadow-xl bg-stone-300 rounded-box"
                >
                  {item.picture && (
                    <img
                      src={item.picture}
                      alt="post"
                      className="w-full object-cover h-1/3 rounded-t-box"
                    />
                  )}
                  <div
                    className={`card-body rounded-box flex-none p-2 bg-stone-300 text-black ${
                      item.picture ? "h-2/3" : "h-full"
                    }`}
                  >
                    <div className="flex-grow overflow-y-clip ">
                      <h2 className="card-title flex-grow overflow-y-clip text-sm md:text-md ">
                        {item.title}
                      </h2>
                    </div>
                    <div className="badge badge-primary text-stone-50 text-xs md:text-sm h-1/12 ">
                      {item.community.name}
                    </div>
                    <div className="flex-grow overflow-y-scroll h-2/3">
                      <p className="text-sm md:text-md">{item.description}</p>
                    </div>
                    <div className="card-actions justify-end">
                      <div className="badge badge-outline text-xs md:text-md lg:text-lg text-stone-600">
                        {format(new Date(item.logDate), "MMM dd")}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommunitiesPage;
