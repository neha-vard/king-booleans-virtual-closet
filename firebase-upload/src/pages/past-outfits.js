import { doc, addDoc, collection, getDoc } from "firebase/firestore";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import React, { useEffect, useState } from "react";
import Carousel, { CarouselItem } from "../carousel";
import { firestore, storage } from "../firebaseConfig";

const PastOutfits = () => {
  const [outfits, setOutfits] = useState([]);

  useEffect(() => {
    const outfitsRef = ref(
      storage,
      "gs://king-booleans-virtual-closet.appspot.com/past-outfits"
    );

    getDoc(doc(firestore, "outfits", "outfit1")).then((doc) => {
      const outfit = doc.data();
      console.log(outfit);
      const { hat, shirt, pant, shoe, date } = outfit;
      console.log(hat, shirt, pant, shoe, date);
      console.log("hello");
    });

    // addDoc(collection(firestore, "outfits"), {
    //   hat: "url",
    //   shirt: "shirt",
    //   pant: "pant",
    //   shoe: "shoe",
    //   date: "date",
    // });

    Promise.all([listAll(outfitsRef)])
      .then(([outfitsRes]) => {
        const fetchDownloadUrls = async (items) => {
          return Promise.all(items.map((item) => getDownloadURL(item)));
        };
        Promise.all([fetchDownloadUrls(outfitsRes.items)])
          .then(([outfits]) => {
            setOutfits(outfits);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [hats, setHats] = useState([]);
  const [shirts, setShirts] = useState([]);
  const [pants, setPants] = useState([]);
  const [shoes, setShoes] = useState([]);
  const [dates, setDates] = useState([]);

  // useEffect(() => {
  //   outfits.forEach((outfit) => {
  //     fetch(outfit)
  //       .then((response) => response.text())
  //       .then((data) => {
  //         // JSON.parse(data) NOT SEEMING TO WORK
  //         const { hat, shirt, pant, shoe, date } = JSON.parse(data);
  //         // hats.push(hat);
  //         // shirts.push(shirt);
  //         // pants.push(pant);
  //         // shoes.push(shoe);
  //         // dates.push(date);

  //         // const parsedData = parseOutfitData(data);
  //         // const { hat, shirt, pant, shoe, date } = parsedData;
  //         // hats.push(hat);
  //         // shirts.push(shirt);
  //         // pants.push(pant);
  //         // shoes.push(shoe);
  //         // dates.push(date);
  //       })
  //       .catch(error => console.log(error));
  //   });
  // }, [outfits]);

  useEffect(() => {
    outfits.forEach((outfit) => {
      fetch(outfit)
        .then((response) => response.text())
        .then((data) => {
          try {
            const parsedData = JSON.parse(data);
            setHats((hats) => [...hats, parsedData.hat]);
            setShirts((shirts) => [...shirts, parsedData.shirt]);
            setPants((pants) => [...pants, parsedData.pant]);
            setShoes((shoes) => [...shoes, parsedData.shoe]);
            setDates((dates) => [...dates, parsedData.date]);
          } catch (error) {
            console.log(error);
          }
        })
        .catch((error) => console.log(error));
    });
  }, [outfits]);

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
        {hats.map((hats, index) => (
          <CarouselItem key={index}>
            {" "}
            <div>
              <img src={hats} alt="hat" />
              <img src={shirts} alt="shirt" />
              <img src={pants} alt="pants" />
              <img src={shoes} alt="shoes" />
              <p>Date: {dates}</p>
            </div>{" "}
            <img src={hats} alt="this" key={index} height="160" />{" "}
          </CarouselItem>
        ))}
        {/* {shoes.map((shoes, i) => (
          <CarouselItem key={i}>
            {" "}
            <img src={shoes} alt="this" key={i} height="160" />{" "}
          </CarouselItem>
        ))} */}
      </Carousel>

      <p>length of hats is {hats.length}</p>
    </div>
  );
};
export default PastOutfits;
