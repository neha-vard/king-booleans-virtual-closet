import React from "react";
import { useState } from "react";
import { storage } from "../firebaseConfig";
import { ref, uploadBytesResumable } from "firebase/storage";
import "./clothing-upload.css";

const ClothingUpload = () => {
  // State to store uploaded file
  const [file, setFile] = useState(""); // progress
  const [percent, setPercent] = useState(0); // Handle file upload event and update state
  const [image, setImage] = useState(null);

  function handleChange(event) {
    setFile(event.target.files[0]);
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  }
  const handleUpload = () => {
    if (!file) {
      alert("Please upload an image first!");
    }
    const storageRef = ref(storage, `/${value}/${file.name}`); // progress can be paused and resumed. It also exposes progress updates. // Receives the storage reference and the file to upload.
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        ); // update progress
        setPercent(percent);
      },
      (err) => console.log(err)
    );
  };

  const options = [
    { label: "Shirt", value: "shirts" },

    { label: "Pants", value: "pants" },

    { label: "Hat", value: "hats" },

    { label: "Shoes", value: "shoes" },
  ];

  const [value, setValue] = React.useState("shirts");

  const handleChange2 = (event) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Closet Builder</h1>
      <h3 style={{ textAlign: "center", fontWeight: "600" }}>
        Upload images of your clothing to your virtual closet!
      </h3>
      <div class="outer-outer-container">
        <div class="outer-container">
          {/* <input
            type="file"
            onChange={handleChange}
            accept="/image/*"
          /> */}
          <p className="upload-text">Choose a file</p>
          <div class="container">
            <div class="button-wrap">
              <label class="button" for="upload">
                Upload File
              </label>
              <input
                id="upload"
                type="file"
                onChange={handleChange}
                accept="/image/*"
              />
              <p
                style={{
                  marginTop: "90px",
                  marginLeft: "-40px",
                  // position: "absolute",
                }}
              >
                (Vertical images look better)
              </p>
            </div>
          </div>
          <Dropdown
            label="Choose clothing type"
            options={options}
            value={value}
            onChange={handleChange2}
          />

          <div style={{ marginLeft: "-6%" }}>
            <img src={image} alt="" class="image" />
            <button onClick={handleUpload} class="add-item-button">
              Add this item to your virtual closet!
            </button>
            <p
              class="progress"
              style={{ visibility: percent === 0 ? "hidden" : "visible" }}
            >
              {percent}% done
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Dropdown = ({ label, value, options, onChange }) => {
  return (
    <label class="dropdown-label">
      {label}

      <select value={value} onChange={onChange} class="dropdown-options">
        {options.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </select>
    </label>
  );
};

export default ClothingUpload;
