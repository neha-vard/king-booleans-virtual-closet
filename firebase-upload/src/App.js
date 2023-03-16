import { useEffect, useState } from "react";
import { storage } from "./firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL, listAll} from "firebase/storage";

function App() {
  // State to store uploaded file
  const [file, setFile] = useState(""); // progress
  const [percent, setPercent] = useState(0); // Handle file upload event and update state

  const [shirts, setShirts] = useState([]);
  const [pants, setPants] = useState([]);
  const [shoes, setShoes] = useState([]);
  const [hats, setHats] = useState([]);

  useEffect(() => {
    const shirtsRef = ref(storage, 'gs://king-booleans-virtual-closet.appspot.com/shirts');
    const pantsRef = ref(storage, 'gs://king-booleans-virtual-closet.appspot.com/pants');
    const shoesRef = ref(storage, 'gs://king-booleans-virtual-closet.appspot.com/shoes');
    const hatsRef = ref(storage, 'gs://king-booleans-virtual-closet.appspot.com/hats');
  
    Promise.all([
      listAll(shirtsRef),
      listAll(pantsRef),
      listAll(shoesRef),
      listAll(hatsRef),
    ])
      .then(([shirtsRes, pantsRes, shoesRes, hatsRes]) => {
        const fetchDownloadUrls = async (items) => {
          return Promise.all(items.map((item) => getDownloadURL(item)));
        };
        Promise.all([
          fetchDownloadUrls(shirtsRes.items),
          fetchDownloadUrls(pantsRes.items),
          fetchDownloadUrls(shoesRes.items),
          fetchDownloadUrls(hatsRes.items),
        ])
          .then(([shirts, pants, shoes, hats]) => {
            setShirts(shirts);
            setPants(pants);
            setShoes(shoes);
            setHats(hats);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  
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
    );

  }
  
  return (
    <div>
      <input type="file" onChange={handleChange} accept="/image/*" />

      <button onClick={handleUpload}>Upload to Firebase</button>
      <p>{percent} "% done"</p>
  
      {/* <img src={url} alt="uploaded"  /> */}

      <h1>Shirts</h1>
      {shirts.map((shirts, i) => <img src={shirts} alt="this" key={i}/>)}
      <h1>Pants</h1>
      {pants.map((pants, i) => <img src={pants} alt="this" key={i}/>)}
      <h1>Shoes</h1>
      {shoes.map((shoes, i) => <img src={shoes} alt="this" key={i}/>)}
      <h1>Hats</h1>
      {hats.map((hats, i) => <img src={hats} alt="this" key={i}/>)}

    </div >


  );
}
export default App;
