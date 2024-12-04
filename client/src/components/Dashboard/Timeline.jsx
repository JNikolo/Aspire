import { useState } from "react";
import { MdAddCircle } from "react-icons/md";

const Timeline = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState(false); //modal to upload a new post

  return (
    <div>
      <h2 className="text-left text-xl text-brown-light font-medium my-4">
        Timeline
      </h2>
      {/* the oldest post will be to the left */}
      <div className="carousel rounded-box flex-none w-[358px] sm:w-full">
        {/*  dummy data 1 */}
        <div className="carousel-item">
          <div className="flex-none">
            <div className="bg-base-100 w-32 md:w-48 lg:w-56 shadow-xl">
              <img
                src="https://www.coachup.com/nation/wp-content/uploads/2017/08/cropped-dreamstime_s_34232682.png"
                alt="running"
              />
              <div className="card-body flex-none p-2">
                <h2 className="card-title text-sm md:text-md lg:text-lg">
                  1 Easy
                </h2>
                <div className="badge badge-secondary text-xs md:text-sm lg:text-md">
                  Leetcode Easy
                </div>
                <p className="text-sm md:text-md lg:text-lg">
                  Watched tutorial
                </p>
                <div className="card-actions justify-end">
                  <div className="badge badge-outline text-xs md:text-md lg:text-lg">
                    Nov 28
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*  dummy data 1 */}
        <div className="carousel-item">
          <div className="flex-none">
            <div className="bg-base-100 w-32 md:w-48 lg:w-56 shadow-xl">
              <img
                src="https://www.coachup.com/nation/wp-content/uploads/2017/08/cropped-dreamstime_s_34232682.png"
                alt="running"
              />
              <div className="card-body flex-none p-2">
                <h2 className="card-title text-sm md:text-md lg:text-lg">
                  1 Easy
                </h2>
                <div className="badge badge-secondary text-xs md:text-sm lg:text-md">
                  Leetcode Easy
                </div>
                <p className="text-sm md:text-md lg:text-lg">Completed solo</p>
                <div className="card-actions justify-end">
                  <div className="badge badge-outline text-xs md:text-md lg:text-lg">
                    Nov 30
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*  dummy data 2 */}
        <div className="carousel-item">
          <div className="flex-none">
            <div className="bg-base-100 w-32 md:w-48 lg:w-56 shadow-xl">
              <img
                src="https://www.coachup.com/nation/wp-content/uploads/2017/08/cropped-dreamstime_s_34232682.png"
                alt="running"
              />
              <div className="card-body flex-none p-2">
                <h2 className="card-title text-sm md:text-md lg:text-lg">
                  10 Hard
                </h2>
                <div className="badge badge-secondary text-xs md:text-sm lg:text-md">
                  Leetcode Easy
                </div>
                <p className="text-sm md:text-md lg:text-lg">No tutorial</p>
                <div className="card-actions justify-end">
                  <div className="badge badge-outline text-xs md:text-md lg:text-lg">
                    Dec 2
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="block"></div>
        <button className="carousel-item bg-white items-center justify-center w-32 md:w-48 lg:w-56 hover:white-100">
          <MdAddCircle className="w-[50px] h-[50px]" />
          {/* add a new entry */}
        </button>
      </div>
    </div>
  );
};

export default Timeline;
