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
      <div className="carousel rounded-box flex-none max-w-[866px]">
        {/*  dummy data 1 */}
        <div className="carousel-item">
          <div className="flex-none">
            <div className="bg-base-100 w-[300px] h-[400px] shadow-xl">
              <img
                src="https://www.coachup.com/nation/wp-content/uploads/2017/08/cropped-dreamstime_s_34232682.png"
                alt="running"
              />
              <div className="card-body flex-none">
                <h2 className="card-title">
                  task.name
                  <div className="badge badge-secondary">task.category</div>
                </h2>
                <p>task.description</p>
                <div className="card-actions justify-end">
                  <div className="badge badge-outline">task.date</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*  dummy data 1 */}
        <div className="carousel-item">
          <div className="flex-none">
            <div className="bg-base-100 w-[300px] h-[400px] shadow-xl">
              <img
                src="https://www.coachup.com/nation/wp-content/uploads/2017/08/cropped-dreamstime_s_34232682.png"
                alt="running"
              />
              <div className="card-body flex-none">
                <h2 className="card-title">
                  Running!
                  <div className="badge badge-secondary">Exercise</div>
                </h2>
                <p>Ran 1 mile in the track at my local park</p>
                <div className="card-actions justify-end">
                  <div className="badge badge-outline">Nov 10, 2024</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*  dummy data 2 */}
        <div className="carousel-item">
          <img
            src="https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp"
            alt="Burger"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp"
            alt="Burger"
          />
        </div>
        <div className="block"></div>
        <button className="carousel-item bg-white items-center justify-center w-[300px] h-[400px] hover:white-100">
          <MdAddCircle className="w-[50px] h-[50px]" />
          {/* add a new entry */}
        </button>
      </div>
    </div>
  );
};

export default Timeline;
