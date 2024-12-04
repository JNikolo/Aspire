import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";

const CompletionModal = ({
  completionDate,
  communityOptions,
  toggleCompletion,
  toggleDate,
  habit,
  editMode,
  setToggleDate,
  initialData,
  modalId, // Receive unique modal ID as a prop
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    setError,
    clearErrors,
    reset,
    watch,
  } = useForm({
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      postToCommunities: initialData?.postToCommunities || false,
      communitiesPost: initialData?.communitiesPost || [],
      image: initialData?.image || null,
      selectedCommunities: [],
    },
  });

  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const formRef = useRef(null);
  const [image, setImage] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [selectedCommunities, setSelectedCommunities] = useState([]);

  const formData = watch();
  const postToCommunities = watch("postToCommunities");

  useEffect(() => {
    reset({
      title: initialData?.title || "",
      description: initialData?.description || "",
      postToCommunities: initialData?.postToCommunities || false,
      communitiesPost: initialData?.communitiesPost || [],
      image: initialData?.image || null,
    });
    setImage(initialData?.image || null);
    setSelectedCommunities(initialData?.communitiesPost || []);
  }, [initialData, reset]);

  useEffect(() => {
    const modal = document.getElementById(modalId);
    if (modal) {
      const handleClose = () => {
        reset();
        setImage(null);
        setPostToCommunities(false);
        setToggleDate(null);
        setSelectedCommunities([]);
      };

      modal.addEventListener("close", handleClose);
      return () => {
        modal.removeEventListener("close", handleClose);
      };
    }
  }, [reset, modalId]);
  const handleTakePhoto = async () => {
    setIsCameraOpen(true);
    setTimeout(async () => {
      const video = videoRef.current;
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: { ideal: "environment" } }, // Prefer the back camera
          });
          if (video) {
            video.srcObject = stream;
            video.play();
          }
        } catch (err) {
          console.error("Error accessing camera: ", err);
        }
      }
    }, 100); // Delay to ensure the video element is rendered
  };

  const handleCapturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      const context = canvas.getContext("2d");
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      // Calculate the scaling factor to fit the video within the canvas
      const scale = Math.min(
        canvasWidth / videoWidth,
        canvasHeight / videoHeight
      );

      // Calculate the position to center the video within the canvas
      const x = canvasWidth / 2 - (videoWidth / 2) * scale;
      const y = canvasHeight / 2 - (videoHeight / 2) * scale;

      context.clearRect(0, 0, canvasWidth, canvasHeight); // Clear the canvas
      context.drawImage(
        video,
        0,
        0,
        videoWidth,
        videoHeight,
        x,
        y,
        videoWidth * scale,
        videoHeight * scale
      );
      const dataUrl = canvas.toDataURL("image/png");
      setImage(dataUrl);
      setIsCameraOpen(false);
      if (video.srcObject) {
        video.srcObject.getTracks().forEach((track) => track.stop());
      }
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    if (formRef.current) {
      formRef.current.requestSubmit(); // Trigger form submission programmatically
    }
  };

  const onSubmit = (data) => {
    // if (postToCommunities && selectedCommunities.length === 0) {
    //   console.log(postToCommunities, selectedCommunities);
    //   setError("communitiesPost", {
    //     type: "manual",
    //     message: "Please select at least one community.",
    //   });
    //   return;
    // } else {
    //   clearErrors("communitiesPost");
    // }
    toggleCompletion(toggleDate);
    console.log("Completion submitted", data);
    // Add your submission logic here
  };

  return (
    <dialog id={modalId} className="modal">
      <div className="modal-box flex flex-col max-h-screen overflow-y-auto bg-stone-100 shadow-xl rounded-lg p-6">
        <form
          ref={formRef}
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-4 flex-grow"
        >
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            type="button"
            onClick={() => {
              const modal = document.getElementById(modalId);
              if (modal) {
                setToggleDate(null);
                modal.close();
              }
            }}
          >
            ✕
          </button>
          <h3 className="font-bold text-xl text-brown-dark">
            Completion Log {completionDate}
          </h3>
          {errors.title && (
            <div className="text-red-500 text-sm">Title is required</div>
          )}
          <input
            type="text"
            placeholder="Title"
            name="title"
            value={formData.title}
            className="input input-bordered input-primary w-full border-stone-400 bg-stone-50 max-w-xs"
            {...register("title", { required: postToCommunities })}
          />
          {errors.description && (
            <div className="text-red-500 text-sm">Description is required</div>
          )}
          <textarea
            className="textarea textarea-bordered border-stone-400 bg-stone-50"
            placeholder="Notes / Description"
            name="description"
            value={formData.description}
            {...register("description", { required: postToCommunities })}
          ></textarea>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />
          <div className="flex flex-col space-y-5 pt-5 mt-auto">
            {image && (
              <div className="mt-2">
                <img
                  src={image}
                  alt="Uploaded"
                  className="max-w-full h-auto rounded-md max-h-40"
                />
              </div>
            )}
            <div className="flex space-x-2">
              <button
                className="btn btn-sm md:btn-md border-stone-400 bg-blue-dark text-brown-dark"
                onClick={() => fileInputRef.current.click()}
                type="button"
              >
                Upload Image
              </button>
              <button
                className="btn btn-sm md:btn-md border-stone-400 bg-blue-dark hover:bg-blue-light text-brown-dark"
                onClick={handleTakePhoto}
                type="button"
              >
                Take Photo
              </button>
              {image && (
                <button
                  className="btn btn-sm md:btn-md border-stone-400 bg-blue-dark hover:bg-blue-light text-brown-dark"
                  onClick={() => {
                    setImage(null);
                    fileInputRef.current.value = null;
                  }}
                  type="button"
                >
                  Remove Image
                </button>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <label className="label cursor-pointer">
              <span className="label-text">Post to your communities?</span>
            </label>
            <input
              type="checkbox"
              className="toggle toggle-primary  [--tglbg:white] bg-blue-dark hover:bg-blue-light"
              {...register("postToCommunities")}
            />
          </div>
          <div className="pb-12">
            {postToCommunities && (
              <>
                <Select
                  isMulti
                  maxMenuHeight={100}
                  name="communitiesPost"
                  placeholder="Select Communities"
                  options={communityOptions}
                  {...register("selectedCommunities")}
                  onChange={(selectedOptions) =>
                    reset({ ...formData, communitiesPost: selectedOptions })
                  }
                />
                {errors.communitiesPost && (
                  <div className="text-red-500 text-sm">
                    {errors.communitiesPost.message}
                  </div>
                )}
              </>
            )}
          </div>
          {/* {isDirty && (
            <div className="text-red-500 text-sm">Changes have been made</div>
          )} */}
          {editMode && (
            <button
              type="button"
              // onClick={handleDeleteButton} // Trigger form submission programmatically
              className="btn sticky bottom-0 border-5 border-white bg-red-600 hover:bg-brown-light hover:border-white text-white"
            >
              {postToCommunities ? "Delete Public Post" : "Delete Private Post"}
            </button>
          )}
          <button
            type="button"
            onClick={handleButtonClick} // Trigger form submission programmatically
            className="btn sticky bottom-0 border-5 border-white bg-brown-dark hover:bg-brown-light hover:border-white text-white"
          >
            {postToCommunities ? "Create Public Post" : "Create Private Post"}
          </button>
        </form>
        {isCameraOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="relative bg-white p-4 rounded-lg text-center">
              <video
                ref={videoRef}
                className="w-full h-auto rounded-lg"
                autoPlay
                playsInline
              />
              <button
                className="btn btn-sm md:btn-md border-stone-400 bg-blue-dark hover:bg-blue-light text-brown-dark mt-4"
                type="button"
                onClick={handleCapturePhoto}
              >
                Capture Photo
              </button>
              <button
                className="btn btn-sm md:btn-md border-stone-400 bg-red-500 hover:bg-red-700 text-white mt-2"
                type="button"
                onClick={() => setIsCameraOpen(false)}
              >
                Close
              </button>
              <canvas ref={canvasRef} className="hidden" />
            </div>
          </div>
        )}
      </div>
    </dialog>
  );
};

export default CompletionModal;
