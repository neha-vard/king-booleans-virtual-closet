import React from "react";
import { useEffect, useState } from "react";
import { firestore, storage } from "../firebaseConfig";
import { ref, getDownloadURL, listAll } from "firebase/storage";
import Carousel, { CarouselItem } from "../carousel";
import { addDoc, collection } from "firebase/firestore";
import "./outfit-builder.css";

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

    const date = now.toLocaleString();
    // get the month and dat from the date string
    const month = date.split("/")[0];
    const day = date.split("/")[1];
    const year = date.split("/")[2].substring(0, 4);

    addDoc(collection(firestore, "outfits"), {
      hat: hats[currentHatIndex],
      shirt: shirts[currentShirtIndex],
      pant: pants[currentPantIndex],
      shoe: shoes[currentShoeIndex],
      date: `${month}-${day}-${year}`,
    });
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Outfit Builder</h1>
      <h3 className="sub-title">Build an outfit with items in your closet!</h3>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transform: "translate(-30%, 400%)",
        }}
      >
        <label
          style={{
            marginTop: "-46%",
          }}
          class="clothing-label"
        >
          Hat
        </label>
        <label
          class="clothing-label"
          style={{
            marginTop: "16%",
          }}
        >
          Shirt
        </label>
        <label
          class="clothing-label"
          style={{
            marginTop: "16%",
          }}
        >
          Pants
        </label>
        <label
          class="clothing-label"
          style={{
            marginTop: "16%",
          }}
        >
          Shoes
        </label>
      </div>
      <div style={{ position: "relative", marginTop: "-16%" }}>
        <Carousel onActiveIndexChange={setCurrentHatIndex}>
          {hats.map((hats, i) => (
            <CarouselItem key={i}>
              <img src={hats} alt="this" key={i} className="carousel-image" />
            </CarouselItem>
          ))}
        </Carousel>
        <Carousel onActiveIndexChange={setCurrentShirtIndex}>
          {shirts.map((shirts, i) => (
            <CarouselItem key={i}>
              <img src={shirts} alt="this" key={i} className="carousel-image" />
            </CarouselItem>
          ))}
        </Carousel>
        <Carousel onActiveIndexChange={setCurrentPantIndex}>
          {pants.map((pants, i) => (
            <CarouselItem key={i}>
              <img src={pants} alt="this" key={i} className="carousel-image" />
            </CarouselItem>
          ))}
        </Carousel>
        <Carousel onActiveIndexChange={setCurrentShoeIndex}>
          {shoes.map((shoes, i) => (
            <CarouselItem key={i}>
              <img src={shoes} alt="this" key={i} className="carousel-image" />
            </CarouselItem>
          ))}
        </Carousel>
        <button onClick={addPastOutfit} className="dress-me-button">
          Dress Me
        </button>
      </div>
    </div>
  );
};

export default OutfitBuilder;
