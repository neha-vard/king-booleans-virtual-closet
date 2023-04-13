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


const PastOutfits = () => {

  const [outfits, setOutfits] = useState([]);

  useEffect(() => {
    const storageRef = ref(storage, "gs://king-booleans-virtual-closet.appspot.com/past-outfits");

    storageRef.listAll().then((result) => {
      result.items.forEach((itemRef) => {
        itemRef.getDownloadURL().then((url) => {
          fetch(url)
            .then((response) => response.text())
            .then((data) => {
              const { hat, shirt, pant, shoe, date } = JSON.parse(data);
              setOutfits((prevOutfits) => [
                ...prevOutfits,
                { hat, shirt, pant, shoe, date },
              ]);
            })
            .catch((error) => console.log(error));
        });
      });
    }).catch((error) => console.log(error));
  }, []);

  


  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Past Outfits</h1>
      <h3
        style={{
          textAlign: "center",
          fontWeight: "600",
          marginBottom: "5%",
        }}
      >
        View some of your past outfits!
      </h3>
        
    
      <Carousel>
        {outfits.map((outfit, index) => (
          <CarouselItem key={index}>
            {" "}
            <div>
              <img src={outfit.hat} alt="hat" />
              <img src={outfit.shirt} alt="shirt" />
              <img src={outfit.pant} alt="pants" />
              <img src={outfit.shoe} alt="shoes" />
              <p>Date: {outfit.date}</p>
            </div>
          </CarouselItem>
        ))}
      </Carousel>
    </div>
  );
};
export default PastOutfits;