import { useState } from "react";
import { storage } from "./firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function App() {
  // State to store uploaded file
  const [file, setFile] = useState(""); // progress
  const [percent, setPercent] = useState(0); // Handle file upload event and update state
  const [url, setUrl] = useState("");
  // const starsRef = ref(storage, `/files/${file.name}`);
  const starsRef = ref(storage, 'gs://king-booleans-virtual-closet.appspot.com/files/download.jpg');
  getDownloadURL(starsRef).then((url) => {
    setUrl(url);
  });

  // const listRef = ref(storage, 'gs://king-booleans-virtual-closet.appspot.com/files');
  // listAll(listRef)
  // .then((res) => {
  //   res.prefixes.forEach((folderRef) => {
  //     // All the prefixes under listRef.
  //     // You may call listAll() recursively on them.
  //   });
  //   res.items.forEach((itemRef) => {
  //     // All the items under listRef.
  //   });
  // }).catch((error) => {
  //   // Uh-oh, an error occurred!
  // });


  
  function handleChange(event) {
    setFile(event.target.files[0]);
  }
  const handleUpload = () => {
    if (!file) {
      alert("Please upload an image first!");
    }
    const storageRef = ref(storage, `/files/${file.name}`); // progress can be paused and resumed. It also exposes progress updates. // Receives the storage reference and the file to upload.
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        ); // update progress
        setPercent(percent);
      },
      (err) => console.log(err),
      // () => {
      //   // download url
      //   const starsRef = ref(storage, 'gs://king-booleans-virtual-closet.appspot.com/files/download.jpg');
      //   getDownloadURL(starsRef).then((url) => {
      //     setUrl(url);
      //   });
      // },
    );

  }
  
  return (
    <div>
      <input type="file" onChange={handleChange} accept="/image/*" />

      <button onClick={handleUpload}>Upload to Firebase</button>
      <p>{percent} "% done"</p>
  
      <img src={url} alt="uploaded"  />

    </div >


  );
}
export default App;
