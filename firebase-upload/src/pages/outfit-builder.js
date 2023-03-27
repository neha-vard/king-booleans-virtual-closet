
import React from "react";
import { useEffect, useState } from "react";
import { storage } from "../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL, listAll} from "firebase/storage";
import Carousel, {CarouselItem } from "../carousel";
  
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
    <Carousel>
    {hats.map((hats, i) => <CarouselItem > <img src={hats} alt="this" key={i} height="140"/> </CarouselItem>)}
    </Carousel>
    <Carousel> 
    {shirts.map((shirts, i) => <CarouselItem> <img src={shirts} alt="this" key={i} height="240"/> </CarouselItem>)}
    </Carousel>
    <Carousel> 
    {pants.map((pants, i) => <CarouselItem> <img src={pants} alt="this" key={i} height="240"/> </CarouselItem>)}
    </Carousel>
    <Carousel>
    {shoes.map((shoes, i) => <CarouselItem> <img src={shoes} alt="this" key={i} height="160"/> </CarouselItem>)}
    </Carousel>
    </div>
  );
};
  
export default OutfitBuilder;