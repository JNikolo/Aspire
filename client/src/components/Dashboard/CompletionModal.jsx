import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { useAuth, useUser } from "@clerk/clerk-react";
import { format } from "date-fns";
import { deleteHabitLog, updateHabitLog } from "../../services/habitServices";
import { BsTrash3 } from "react-icons/bs";
import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";
import supabase from "../../supabaseClient";
const MAX_FILE_SIZE_MB = 50;

const CompletionModal = ({
  habit,
  completionDate,
  toggleCompletion,
  toggleDate,
  isEditMode,
  setToggleDate,
  modalId,
  log,
  postHabitLog,
}) => {
  const { getToken } = useAuth();
  const { isSignedIn, user } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    setError,
    clearErrors,
    reset,
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      isPublic: false,
      picture: null,
      communityId: "",
    },
  });

  const communityOptions = [
    { value: "1", label: "Community 1" },
    { value: "2", label: "Community 2" },
    { value: "3", label: "Community 3" },
  ];

  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const formRef = useRef(null);

  const [image, setImage] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [habitLogs, setHabitLogs] = useState([]);
  const formData = watch();
  const isPublic = watch("isPublic");

  useEffect(() => {
    if (log) {
      setValue("title", log.title);
      setValue("description", log.description);
      setValue("picture", log.picture);
      setValue("isPublic", log.isPublic);
      setValue("communityId", log.communityId);
    }
  }, [log, isEditMode, habit, reset]);

  useEffect(() => {
    const modal = document.getElementById(modalId);
    if (modal) {
      const handleClose = () => {
        reset();
        setImage(null);
        if (videoRef.current && videoRef.current.srcObject) {
          videoRef.current.srcObject
            .getTracks()
            .forEach((track) => track.stop());
        }
        setIsCameraOpen(false);
      };
      modal.addEventListener("close", handleClose);
      return () => {
        modal.removeEventListener("close", handleClose);
      };
    }
  }, [reset, modalId]);

  useEffect(() => {
    if (habitLogs.length > 0) {
      const sortedLogs = [...habitLogs].sort(
        (a, b) => new Date(b.logDate) - new Date(a.logDate)
      );
      setHabitLogs(sortedLogs);
    }
  }, [habitLogs]);

  const handleTakePhoto = async () => {
    setIsCameraOpen(true);
    setTimeout(async () => {
      const video = videoRef.current;
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: { ideal: "environment" } },
          });
          if (video) {
            video.srcObject = stream;
            video.play();
          }
        } catch (err) {
          console.error("Error accessing camera: ", err);
        }
      }
    }, 100);
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

      const scale = Math.min(
        canvasWidth / videoWidth,
        canvasHeight / videoHeight
      );

      const x = canvasWidth / 2 - (videoWidth / 2) * scale;
      const y = canvasHeight / 2 - (videoHeight / 2) * scale;

      context.clearRect(0, 0, canvasWidth, canvasHeight);
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
      setValue("picture", dataUrl);
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
      const fileSizeMB = file.size / (1024 * 1024);
      if (fileSizeMB > MAX_FILE_SIZE_MB) {
        alert("File size exceeds 50MB. Please upload a smaller file.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue("picture", reader.result);
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  const handleDeleteButton = () => {
    //delete image from storage based on log.picture

    deleteHabitLog(habit.id, log.id, getToken).then(() => {
      //delete image from storage

      const modal = document.getElementById(modalId);
      if (modal) {
        toggleCompletion(completionDate);
        setToggleDate(null);
        modal.close();
      }
      document.getElementById("my_modal_6").checked = false;
    });
  };

  const onSubmit = async (data) => {
    if (data.picture && data.picture.startsWith("data:image")) {
      const base64Data = data.picture.split(",")[1];
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "image/png" });

      const uniqueId = uuidv4();
      const fileName = `public/${uniqueId}.png`;
      const { data: file, error } = await supabase.storage
        .from("logImages")
        .upload(fileName, blob, {
          contentType: "image/png",
          upsert: true,
        });
      if (error) {
        console.error("Error uploading image: ", error);
        return;
      }
      data.picture = `${
        import.meta.env.VITE_SUPABASE_URL
      }/storage/v1/object/logImages/${fileName}`;
    }
    console.log("community" + data.communityId);
    if (isEditMode) {
      data.logDate = completionDate || new Date();
      updateHabitLog(habit.id, log.id, data, getToken).then(() => {
        const modal = document.getElementById(modalId);
        if (modal) {
          modal.close();
          toggleCompletion(completionDate);
          setToggleDate(null);
        }
      });
    } else {
      data.logDate = completionDate || new Date();
      postHabitLog(habit.id, data, getToken).then(() => {
        const modal = document.getElementById(modalId);
        if (modal) {
          toggleCompletion(completionDate);
          setToggleDate(null);
          modal.close();
        }
      });
    }

    reset({ title: "", description: "", isPublic: false, picture: null });
  };

  return (
    <dialog id={modalId} className="modal">
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box bg-stone-100">
          <h3 className="text-lg font-bold text-brown-dark">Delete Log</h3>
          <p className="py-4 text-brown-dark">
            Are you sure you want to delete this log?
          </p>
          <div className="modal-action">
            <button
              className="btn text-black bg-red-500 hover:bg-red-400 hover:text-white borrder-5 border-white hover:border-transparent hover:shadow-lg"
              onClick={handleDeleteButton}
            >
              <span>Delete</span>
            </button>
            <label
              htmlFor="my_modal_6"
              className="btn bg-blue-light text-black hover:bg-blue-dark hover:text-white border-5 border-white hover:border-transparent hover:shadow-lg"
            >
              <span>Cancel</span>
            </label>
          </div>
        </div>
      </div>

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
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-xl text-brown-dark">
              Completion Log {format(toggleDate, "MMMM d")}
            </h3>
            {isEditMode && (
              <label
                htmlFor="my_modal_6"
                className="btn btn-outline flex items-center text-black hover:border-5 hover:border-white"
              >
                <BsTrash3 size={20} /> Delete
              </label>
            )}
          </div>
          {errors.title && (
            <div className="text-red-500 text-sm">Title is required</div>
          )}
          <input
            type="text"
            placeholder="Title"
            name="title"
            value={formData.title}
            className="input input-bordered input-primary w-full border-stone-400 bg-stone-50 text-brown-dark"
            {...register("title", { required: isPublic })}
          />
          {errors.description && (
            <div className="text-red-500 text-sm">Description is required</div>
          )}
          <textarea
            className="textarea textarea-bordered border-stone-400 bg-stone-50 text-brown-dark"
            placeholder="Notes / Description"
            name="description"
            value={formData.description}
            {...register("description", { required: isPublic })}
          ></textarea>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            name="image"
            register={register("picture")}
            hidden
          />
          <div className="flex flex-col space-y-5 mt-auto">
            {formData.picture && (
              <div className="mt-2">
                <img
                  src={formData.picture}
                  alt="Uploaded"
                  className="max-w-full h-auto rounded-box max-h-40"
                />
              </div>
            )}
            <div className="flex space-x-2">
              <button
                className="btn btn-sm md:btn-md border-stone-400 bg-blue-dark text-brown-dark"
                onClick={() => fileInputRef.current.click()}
                type="button"
              >
                {formData.picture ? "Update Image" : "Upload Image"}
              </button>
              <button
                className="btn btn-sm md:btn-md border-stone-400 bg-blue-dark hover:bg-blue-light text-brown-dark"
                onClick={handleTakePhoto}
                type="button"
              >
                Take Photo
              </button>
              {formData.picture && (
                <button
                  className="btn btn-sm md:btn-md border-stone-400 text-bold text-stone-100 bg-red-500 hover:bg-red-400 "
                  onClick={() => {
                    setImage(null);
                    setValue("picture", null);
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
              <span className="label-text text-brown-dark">
                Post to your communities?
              </span>
            </label>
            <input
              type="checkbox"
              className="toggle toggle-primary  [--tglbg:white] bg-blue-dark hover:bg-blue-light"
              {...register("isPublic")}
            />
          </div>
          <div className="pb-12">
            {isPublic && (
              <>
                <Select
                  maxMenuHeight={100}
                  name="communitiesPost"
                  className="text-brown-dark"
                  placeholder="Select Community"
                  options={communityOptions}
                  onChange={(selectedOptions) =>
                    setValue("communityId", parseInt(selectedOptions.value))
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
          <button
            type="button"
            onClick={handleButtonClick}
            className="btn sticky bottom-0 border-5 border-white bg-brown-dark hover:bg-brown-light hover:border-white text-white"
          >
            {isEditMode
              ? isDirty
                ? "Update Post"
                : "Done"
              : isPublic
              ? "Create Public Post"
              : "Create Private Post"}
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
