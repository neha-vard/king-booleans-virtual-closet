import React from "react";
import { useEffect, useState } from "react";
import { storage } from "../firebaseConfig";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
} from "firebase/storage";
import Carousel, { CarouselItem } from "../carousel";

const OutfitBuilder = () => {
  const [shirts, setShirts] = useState([]);
  const [pants, setPants] = useState([]);
  const [shoes, setShoes] = useState([]);
  const [hats, setHats] = useState([]);
  const [pastOutfits, setPastOutfits] = useState([]);

  useEffect(() => {
    const shirtsRef = ref(
      storage,
      "gs://king-booleans-virtual-closet.appspot.com/shirts"
    );
    const pantsRef = ref(
      storage,
      "gs://king-booleans-virtual-closet.appspot.com/pants"
    );
    const shoesRef = ref(
      storage,
      "gs://king-booleans-virtual-closet.appspot.com/shoes"
    );
    const hatsRef = ref(
      storage,
      "gs://king-booleans-virtual-closet.appspot.com/hats"
    );

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

  const [currentShirtIndex, setCurrentShirtIndex] = useState(0);
  const [currentPantIndex, setCurrentPantIndex] = useState(0);
  const [currentShoeIndex, setCurrentShoeIndex] = useState(0);
  const [currentHatIndex, setCurrentHatIndex] = useState(0);

  const addPastOutfit = () => {
    const now = new Date();
    const currentOutfit = {
      hat: hats[currentHatIndex],
      shirt: shirts[currentShirtIndex],
      pant: pants[currentPantIndex],
      shoe: shoes[currentShoeIndex],
      date: now.toLocaleString(),
    };
    setPastOutfits([...pastOutfits, currentOutfit]);
  };

  return (
    <div>
      <h1 style={{textAlign: "center"}}>Outfit Builder</h1>
      <h3 style={{textAlign: "center", fontWeight: "600", marginBottom: "5%"}}>Build an outfit with items in your closet!</h3>
      <Carousel onActiveIndexChange={setCurrentHatIndex}>
        {hats.map((hats, i) => (
          <CarouselItem key={i} >
            {" "}
            <img src={hats} alt="this" key={i} height="140" />{" "}
          </CarouselItem>
        ))}
      </Carousel>
      <Carousel onActiveIndexChange={setCurrentShirtIndex}>
        {shirts.map((shirts, i) => (
          <CarouselItem key={i}>
            {" "}
            <img src={shirts} alt="this" key={i} height="240" />{" "}
          </CarouselItem>
        ))}
      </Carousel>
      <Carousel onActiveIndexChange={setCurrentPantIndex}>
        {pants.map((pants, i) => (
          <CarouselItem key={i}>
            {" "}
            <img src={pants} alt="this" key={i} height="240" />{" "}
          </CarouselItem>
        ))}
      </Carousel>
      <Carousel onActiveIndexChange={setCurrentShoeIndex}>
        {shoes.map((shoes, i) => (
          <CarouselItem key={i}>
            {" "}
            <img src={shoes} alt="this" key={i} height="160" />{" "}
          </CarouselItem>
        ))}
      </Carousel>
      <button onClick={addPastOutfit} 
              style={{display: "flex", 
                      justifyContent: "center",
                      alignItems: "center",
                      margin: "auto",
                      marginBottom: "5%",}} 
                      >Dress Me</button>
    </div>
  );
};

export default OutfitBuilder;
