import { doc, collection, getDocs, query, getDoc } from "firebase/firestore";
// import { getDownloadURL, listAll, ref } from "firebase/storage";
import React, { useEffect, useState } from "react";
import Carousel, { CarouselItem } from "../carousel";
import { firestore, storage } from "../firebaseConfig";

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

    // const docRef = doc(firestore, "outfits", "outfit1");
    // getDoc(docRef)
    //   .then((docSnap) => {
    //     if (docSnap.exists()) {
    //       const outfit = docSnap.data();
    //       const { hat, shirt, pant, shoe, date } = outfit;
    //       setHats((hats) => [...hats, hat]);
    //       setShirts((shirts) => [...shirts, shirt]);
    //       setPants((pants) => [...pants, pant]);
    //       setShoes((shoes) => [...shoes, shoe]);
    //       setDates((dates) => [...dates, date]);
    //       setOutfits((outfits) => [...outfits, outfit]);
    //       console.log("hat is " + hat);
    //       console.log(shirt);
    //       console.log(pant);
    //       console.log(shoe);
    //       console.log(date);
    //       console.log("hello");
    //     } else {
    //       // doc.data() will be undefined in this case
    //       console.log("No such document!");
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    // getDoc(doc(firestore, "outfits", "outfit1")).then((doc) => {
    //   const outfit = doc.data();
    //   console.log(outfit);
    //   const { hat, shirt, pant, shoe, date } = outfit;
    //   console.log(hat, shirt, pant, shoe, date);
    //   console.log("hello");
    // });

    // Promise.all([listAll(outfitsRef)])
    //   .then(([outfitsRes]) => {
    //     const fetchDownloadUrls = async (items) => {
    //       return Promise.all(items.map((item) => getDownloadURL(item)));
    //     };
    //     Promise.all([fetchDownloadUrls(outfitsRes.items)])
    //       .then(([outfits]) => {
    //         setOutfits(outfits);
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //       });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }, []);

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

  // useEffect(() => {
  //   outfits.forEach((outfit) => {
  //     fetch(outfit)
  //       .then((response) => response.text())
  //       .then((data) => {
  //         try {
  //           const parsedData = JSON.parse(data);
  //           setHats((hats) => [...hats, parsedData.hat]);
  //           setShirts((shirts) => [...shirts, parsedData.shirt]);
  //           setPants((pants) => [...pants, parsedData.pant]);
  //           setShoes((shoes) => [...shoes, parsedData.shoe]);
  //           setDates((dates) => [...dates, parsedData.date]);
  //         } catch (error) {
  //           console.log(error);
  //         }
  //       })
  //       .catch((error) => console.log(error));
  //   });
  // }, [outfits]);

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
            <div style={{ display: "flex", flexDirection: "column" }}>
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
              <p style={{ textAlign: "center" }}>{dates[i]}</p>
            </div>
          </CarouselItem>
        ))}
      </Carousel>
    </div>
  );
};
export default PastOutfits;
