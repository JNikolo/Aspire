import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";

const CompletionModal = ({
  completionDate,
  communityOptions,
  toggleCompletion,
  toggleDate,
  habit,
}) => {
  useEffect(() => {
    const modal = document.getElementById("my_modal_3");
    const handleClose = () => {
      setTitle("");
      setDescription("");
      setImage(null);
      setPostToCommunities(false);
      setValidationMessage(""); // Clear validation message on close
    };

    modal.addEventListener("close", handleClose);
    return () => {
      modal.removeEventListener("close", handleClose);
    };
  }, []);

  const fileInputRef = useRef(null);
  const formRef = useRef(null);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [postToCommunities, setPostToCommunities] = useState(false);
  const [validationMessage, setValidationMessage] = useState(""); // State for validation message

  const handleTakePhoto = async () => {
    alert("Camera access would be implemented here");
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

  const handleCompletionSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    if ((!title || !description) && postToCommunities) {
      setValidationMessage("Please fill in all required fields."); // Set validation message
      return;
    }
    toggleCompletion(toggleDate);
    console.log("Completion submitted");
    // Add your submission logic here
  };

  const handleButtonClick = () => {
    if (formRef.current) {
      formRef.current.requestSubmit(); // Trigger form submission programmatically
    }
  };

  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box flex flex-col max-h-screen overflow-y-auto bg-stone-100 shadow-xl rounded-lg p-6">
        <form
          ref={formRef}
          onSubmit={handleCompletionSubmit}
          className="flex flex-col space-y-4 flex-grow"
        >
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => {
              document.getElementById("my_modal_3").close();
            }}
            type="button"
          >
            ✕
          </button>
          <h3 className="font-bold text-xl text-brown-dark">
            Completion Log for {completionDate}
          </h3>
          {validationMessage && (
            <div className="text-red-500 text-sm">{validationMessage}</div> // Display validation message
          )}
          <input
            type="text"
            placeholder="Title"
            className="input input-bordered input-primary w-full border-stone-400 bg-stone-50 max-w-xs"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required={postToCommunities}
          />
          <textarea
            className="textarea textarea-bordered border-stone-400 bg-stone-50"
            placeholder="Notes / Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required={postToCommunities}
          ></textarea>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />
        </form>
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
            >
              Upload Image
            </button>
            <button
              className="btn btn-sm md:btn-md border-stone-400 bg-blue-dark hover:bg-blue-light text-brown-dark"
              onClick={handleTakePhoto}
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
              >
                Remove Image
              </button>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <label className="label cursor-pointer">
              <span className="label-text">Post to your communities?</span>
            </label>
            <input
              type="checkbox"
              className="toggle toggle-primary  [--tglbg:white] bg-blue-dark hover:bg-blue-light"
              checked={postToCommunities}
              onChange={() => setPostToCommunities(!postToCommunities)}
            />
          </div>
          <div className="pb-12">
            {postToCommunities && (
              <Select
                isMulti
                maxMenuHeight={100}
                name="communitiesPost"
                placeholder="Select Communities"
                options={communityOptions}
              />
            )}
          </div>
        </div>
        <button
          type="button"
          onClick={handleButtonClick} // Trigger form submission programmatically
          className="btn sticky bottom-0 border-5 border-white bg-brown-dark hover:bg-brown-light hover:border-white text-white"
        >
          {postToCommunities ? "Create Public Post" : "Create Private Post"}
        </button>
      </div>
    </dialog>
  );
};

export default CompletionModal;
