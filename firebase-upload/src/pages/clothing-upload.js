import React from "react";
import { useState } from "react";
import { storage } from "../firebaseConfig";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
} from "firebase/storage";

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
            display: "flex",
            justifyContent: "space-around",
            marginTop: "5%",
          }}
        >
          <style>
            {`
              .container {
                display: flex;
                align-items: flex-start;
                justify-content: flex-start;
                width: 100%;
                position: absolute;
                left: 50vh;
              }
              input[type="file"] {
                position: absolute;
                z-index: -1;
                top: 10px;
                left: 18px;
                font-size: 17px;
                color: black;
              }
              .button-wrap {
                position: relative;
              }
              .button {
                display: inline-block;
                padding: 12px 18px;
                cursor: pointer;
                border-radius: 5px;
                background-color: white;
                font-size: 16px;
                font-weight: bold;
                color: black;
                border: 1.5px solid black;

              }
              `}
          </style>
          {/* <input
            type="file"
            onChange={handleChange}
            accept="/image/*"
          /> */}
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
            </div>
          </div>
          <Dropdown
            label="What type of clothing are you uploading? "
            options={options}
            value={value}
            onChange={handleChange2}
            // style={{ position: "relative", left: "20vh" }}
          />

          <div style={{ marginLeft: "-6%" }}>
            <img
              src={image}
              alt=""
              style={{
                position: "absolute",
                width: "250px",
                top: "25vh",
                left: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "20px auto",
                marginBottom: "5%",
                height: "auto",
                maxHeight: "300px",
              }}
            />
            <button
              onClick={handleUpload}
              style={{
                position: "absolute",
                top: "65vh",
                left: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "20px auto",
                marginBottom: "5%",
                borderRadius: "20px",
                backgroundColor: "white",
                fontSize: "20px",
                cursor: "pointer",
                padding: "10px",
                width: "250px",
              }}
            >
              Add this item to your virtual closet!
            </button>

            <p
              style={{
                position: "absolute",
                top: "75vh",
                left: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "20px auto",
                marginBottom: "5%",
                textAlign: "center",
                width: "250px",
                visibility: percent === 0 ? "hidden" : "visible",
              }}
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
    <label
      style={{
        position: "absolute",
        left: "45vh",
        top: "40vh",
        fontSize: "20px",
      }}
    >
      {label}

      <select
        value={value}
        onChange={onChange}
        style={{
          position: "absolute",
          top: "40px",
          left: "15vh",
          // width: "100px",
          // height: "20px",
          textAlign: "center",
          display: "flex",
          fontSize: "20px",
          borderColor: "black",
          borderRadius: "5px",
          borderWidth: "1.5px",
        }}
      >
        {options.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </select>
    </label>
  );
};

export default ClothingUpload;
