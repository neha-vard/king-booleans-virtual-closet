import React from "react";
import { useState } from "react";
import { storage } from "../firebaseConfig";
import { ref, uploadBytesResumable } from "firebase/storage";

const ClothingUpload = () => {
  // State to store uploaded file
  const [file, setFile] = useState(""); // progress
  const [percent, setPercent] = useState(0); // Handle file upload event and update state

  function handleChange(event) {
    setFile(event.target.files[0]);
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
      <h3 className="sub-title">
        Upload images of your clothing to your virtual closet!
      </h3>
      <div style={{ width: "60%", marginLeft: "17%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "5%",
          }}
        >
          <Dropdown
            label="What type of clothing are you uploading? "
            options={options}
            value={value}
            onChange={handleChange2}
          />

          <input type="file" onChange={handleChange} accept="/image/*" />

          <div style={{ marginLeft: "-6%" }}>
            <button onClick={handleUpload}>
              Add this item to your virtual closet!
            </button>
          </div>
        </div>
      </div>
      <p style={{ marginTop: "2%", textAlign: "center" }}>{percent} "% done"</p>
    </div>
  );
};

const Dropdown = ({ label, value, options, onChange }) => {
  return (
    <label>
      {label}

      <select value={value} onChange={onChange}>
        {options.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </select>
    </label>
  );
};

export default ClothingUpload;
