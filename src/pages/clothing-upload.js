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
      <div style={{ width: "60%", marginLeft: "17%" }}>
        <div
          style={{
            marginTop: "8%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            transform: "translate(-25%, -40%)",
          }}
        >
          <label class="upload-text" for="upload">
            Choose a file to upload
          </label>
          <input type="file" onChange={handleChange} accept="/image/*" />
          <p> (Vertical images look better)</p>
          <Dropdown
            label="Choose clothing type"
            options={options}
            value={value}
            onChange={handleChange2}
          />
        </div>
        <div
          style={{
            marginLeft: "25%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "-20%",
          }}
        >
          <img
            src={image}
            alt=""
            class="image"
            style={{ visibility: image == null ? "hidden" : "visible" }}
          />
          <button
            onClick={handleUpload}
            class="add-item-button"
            style={{ visibility: image == null ? "hidden" : "visible" }}
          >
            Add this item to your virtual closet!
          </button>
          <p
            style={{
              visibility: percent === 0 ? "hidden" : "visible",
            }}
          >
            {percent} "% done"
          </p>
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
