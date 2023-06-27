import { collection, getDocs, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Carousel, { CarouselItem } from "../carousel";
import { firestore } from "../firebaseConfig";
import "./past-outfits.css";

const PastOutfits = () => {
  // const [outfits, setOutfits] = useState([]);
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
          // setOutfits((outfits) => [...outfits, outfit]);
          console.log("Hello");
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function formatDate(string) {
    var options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(string).toLocaleDateString([], options);
  }

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Past Outfits</h1>
      <h3 className="sub-title">View some of your past outfits!</h3>

      <Carousel>
        {hats.map((hat, i) => (
          <CarouselItem key={i}>
            <div className="outfit" style={{ marginBottom: "" }}>
              <style>{`
              .triangle-buttons__triangle {
                border-style: solid;

                /* Size */
                height: 0px;
                width: 0px;
                transform: translate(0, -1020px);
                position: relative;
              }

              .triangle-buttons__triangle--r {
                border-color: transparent transparent transparent lightgray;
                border-width: 1.3rem 0 1.3rem 1.3rem;
                margin-right: 100px;
                position: relative;
              }

              .triangle-buttons__triangle--l {
                border-color: transparent lightgray transparent transparent;
                border-width: 1.3rem 1.3rem 1.3rem 0;
                margin-left: 100px;
                position: relative;
              }
              
            `}</style>
              <p className="date">{formatDate(dates[i])}</p>
              <img src={hat} alt="hat" className="past-outfits-image" />
              <img src={shirts[i]} alt="shirt" className="past-outfits-image" />
              <img src={pants[i]} alt="pants" className="past-outfits-image" />
              <img src={shoes[i]} alt="shoes" className="past-outfits-image" />
            </div>
          </CarouselItem>
        ))}
      </Carousel>
    </div>
  );
};
export default PastOutfits;
