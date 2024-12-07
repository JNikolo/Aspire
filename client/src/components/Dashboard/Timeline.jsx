import { useState } from "react";
import { MdAddCircle } from "react-icons/md";
import { format } from "date-fns";
const Timeline = ({ newPost, habitLogs, habitName }) => {
  const [posts, setPosts] = useState([]);
  // const [newPost, setNewPost] = useState(false); //modal to upload a new post

  return (
    <div>
      <h2 className="text-left text-xl text-brown-light font-medium my-4">
        Timeline
      </h2>
      {/* the oldest post will be to the left */}
      <div className="carousel rounded-box flex-row  w-[358px] sm:w-full">
        {/*  dummy data 1 */}
        {habitLogs &&
          habitLogs.map((log) => (
            <div className="carousel-item  mr-2" key={log.id}>
              <div className="flex-none">
                <div className="w-32 md:w-48 shadow-xl h-60 md:h-68">
                  {log.image && (
                    <img
                      src={log.image}
                      alt="running"
                      className="w-full object-cover h-1/3"
                    />
                  )}

                  <div
                    className={`card-body rounded-box  flex-none p-2 bg-stone-300 text-black ${
                      log.image ? "h-2/3" : "h-full"
                    }`}
                  >
                    <div className="flex-grow overflow-y-clip">
                      <h2 className="card-title flex-grow overflow-y-clip text-sm md:text-md">
                        {log.title}
                      </h2>
                    </div>

                    <div className="badge badge-primary text-stone-50 text-xs md:text-sm h-1/12">
                      {habitName}
                    </div>
                    <div className="flex-grow overflow-y-scroll h-2/3">
                      <p className="text-sm md:text-md ">{log.description}</p>
                    </div>

                    <div className="card-actions justify-end">
                      <div className="badge badge-outline text-xs md:text-md lg:text-lg">
                        {format(new Date(log.logDate), "MMM dd")}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

        {habitLogs.length === 0 && (
          <div className="carousel-item mr-2">
            <div className="flex-none">
              <div className="w-32 md:w-48 shadow-xl h-60 md:h-68">
                <div className="card-body rounded-box flex-col flex space-y-2 p-2 bg-stone-300 text-black h-full">
                  <h2 className="card-title text-md md:text-lg h-1/3">
                    No logs yet
                  </h2>

                  <div className="">
                    <p className="text-md md:text-lg ">
                      Start logging your progress to track your journey!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="block "></div>
        <button
          onClick={newPost}
          className="rounded-box shadow-xl h-60 md:h-68 carousel-item bg-stone-300 items-center justify-center w-32 md:w-48 hover:white-100"
        >
          <MdAddCircle className="w-[50px] h-[50px] text-brown-light" />
          {/* add a new entry */}
        </button>
      </div>
    </div>
  );
};

export default Timeline;
