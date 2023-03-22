
import React from "react";
import { useEffect, useState } from "react";
import { storage } from "../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL, listAll} from "firebase/storage";
  
const OutfitBuilder = () => {

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

  return (
    <div>
      <h1>Shirts</h1>
      {shirts.map((shirts, i) => <img src={shirts} alt="this" key={i}/>)}
      <h1>Pants</h1>
      {pants.map((pants, i) => <img src={pants} alt="this" key={i}/>)}
      <h1>Shoes</h1>
      {shoes.map((shoes, i) => <img src={shoes} alt="this" key={i}/>)}
      <h1>Hats</h1>
      {hats.map((hats, i) => <img src={hats} alt="this" key={i}/>)}

    </div>
  );
};
  
export default OutfitBuilder;