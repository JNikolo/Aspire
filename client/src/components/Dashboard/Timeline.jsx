import { useEffect, useState } from "react";
import { MdAddCircle } from "react-icons/md";
import { format } from "date-fns";

const Timeline = ({ newPost, habitLogs, habitName, habit }) => {
  useEffect(() => {
    console.log(habitLogs);
  }, [habitLogs]);
  return (
    <div>
      <h2 className="text-left text-xl text-brown-light font-medium my-4">
        Timeline
      </h2>
      {/* the oldest post will be to the left */}
      <div className="carousel carousel-end rounded-box flex-row w-[358px]  sm:w-full ">
        {/*  dummy data 1 */}
        {habitLogs &&
          habitLogs.map((log) => (
            <div
              className="carousel-item rounded-box mr-2 bg-stone-300"
              key={log.id}
            >
              <div className="flex-none">
                <div className=" md:w-48 shadow-xl h-60 md:h-64 w-40">
                  {log.picture && (
                    <img
                      src={log.picture}
                      alt="loading..."
                      className="w-full p-1 object-cover h-2/5 rounded-box"
                    />
                  )}

                  <div
                    className={`card-body rounded-box  flex-none p-1.5 bg-stone-300 text-black ${
                      log.picture ? "h-3/5" : "h-full"
                    }`}
                  >
                    <div className="flex-grow overflow-y-clip h-1/5 ">
                      <h2 className="card-title flex-grow overflow-y-clip text-sm md:text-lg">
                        {log.title ? log.title : "Completed!"}
                      </h2>
                    </div>

                    <div className="badge badge-primary text-stone-50 h-1/5 text-xs md:text-sm h-1/12">
                      {log.Community ? log.Community.name : "Personal"}
                    </div>
                    <div className="flex-grow overflow-y-scroll h-2/5">
                      <p className="text-sm md:text-md ">{log.description}</p>
                    </div>

                    <div className="card-actions justify-end h-1/5">
                      <div className="badge badge-outline text-xs md:text-md lg:text-lg">
                        {format(new Date(log.logDate), "MMM d")}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

        {habitLogs.length === 0 && (
          <div className="carousel-item mr-2 bg-stone-300 rounded-box">
            <div className="flex-none">
              <div className="w-32 md:w-48 shadow-xl h-72 md:h-68 rounded-box bg-stone-300">
                <div className="card-body rounded-box flex-col flex  p-2 bg-stone-300 text-black h-full">
                  <h2 className="card-title text-md md:text-lg h-1/3">
                    No logs yet
                  </h2>

                  <p className="text-md md:text-lg ">
                    Start logging your progress to track your journey!
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="block h-full"></div>
        <button
          onClick={newPost}
          className="flex flex-col rounded-box shadow-xl carousel-item bg-stone-300 items-center justify-center w-32 md:w-48 hover:white-100"
        >
          <div className="flex flex-col space-y-2 items-center justify-center">
            <MdAddCircle className="w-[50px] h-[50px] text-brown-light" />

            <p className="text-brown-light text-xl md:text-2xl">New Post</p>
          </div>

          {/* add a new entry */}
        </button>
      </div>
    </div>
  );
};

export default Timeline;
