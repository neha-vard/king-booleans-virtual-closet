import { collection, getDocs, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Carousel, { CarouselItem } from "../carousel";
import { firestore } from "../firebaseConfig";

const PastOutfits = () => {
  const [outfits, setOutfits] = useState([]);
  const [hats, setHats] = useState([]);
  const [shirts, setShirts] = useState([]);
  const [pants, setPants] = useState([]);
  const [shoes, setShoes] = useState([]);
  const [dates, setDates] = useState([]);

  useEffect(() => {
    // loop through all the documents in the outfits collection and add them to the outfits array
    const outfitsCollection = collection(firestore, "outfits");
    const q = query(outfitsCollection);
    getDocs(q)
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // console.log(doc.id, " => ", doc.data());
          const outfit = doc.data();
          const { hat, shirt, pant, shoe, date } = outfit;
          setHats((hats) => [...hats, hat]);
          setShirts((shirts) => [...shirts, shirt]);
          setPants((pants) => [...pants, pant]);
          setShoes((shoes) => [...shoes, shoe]);
          setDates((dates) => [...dates, date]);
          setOutfits((outfits) => [...outfits, outfit]);
          console.log("Hello");
        });
      })
      .catch((error) => {
        console.log(error);
      });
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
        {hats.map((hat, i) => (
          <CarouselItem key={i}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                position: "relative",
              }}
            >
              <style>{`
              .prev {
                position: relative;
                transform: translateY(-3275%);
                left: -5%;
              }
              .next {
                position: relative;
                transform: translateY(-3275%);
                left: 5%;
              }
            `}</style>
              <p
                style={{
                  textAlign: "center",
                  marginBottom: "20px",
                  padding: "10px",
                  backgroundColor: "lightgray",
                  width: "fit-content",
                  alignSelf: "center",
                }}
              >
                {dates[i]}
              </p>
              <img
                src={hat}
                alt="hat"
                style={{ objectFit: "contain", height: "140px", width: "auto" }}
              />
              <img
                src={shirts[i]}
                alt="shirt"
                style={{ objectFit: "contain", height: "240px", width: "auto" }}
              />
              <img
                src={pants[i]}
                alt="pants"
                style={{ objectFit: "contain", height: "240px", width: "auto" }}
              />
              <img
                src={shoes[i]}
                alt="shoes"
                style={{ objectFit: "contain", height: "160px", width: "auto" }}
              />
            </div>
          </CarouselItem>
        ))}
      </Carousel>
    </div>
  );
};
export default PastOutfits;
