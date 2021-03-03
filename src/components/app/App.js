import React from "react";
import * as dogCeo from "../../api/dog-ceo";
import { v4 as uuid } from "uuid";
import "./App.css";
import { Loading, SelectBreeds } from "../";

function App() {
  const NUMBER_OF_IMAGES_PER_PAGE = 25;
  const [loading, setLoading] = React.useState(true);
  const [breeds, setBreeds] = React.useState([]);
  const [currentBreed, setCurrentBreed] = React.useState(breeds[0]);
  const [images, setImages] = React.useState([]);
  const [diplayedImages, setDiplayedImages] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const loader = React.useRef(null);
  const [loadingImages, setLoadingImages] = React.useState(true);

  React.useEffect(() => {
    let options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) observer.observe(loader.current);
  }, [loading]);

  React.useEffect(() => {
    dogCeo.getAllBreeds().then((response) => {
      let initialBreed = response[0];

      setBreeds(response);

      setCurrentBreed((prev) => {
        return prev === "" || !prev ? initialBreed : prev;
      });

      setLoading(false);
    });
  }, []);

  React.useEffect(() => {
    if (currentBreed) {
      let isSubBreed = currentBreed.split(" ").length === 2;

      if (isSubBreed) {
        const [subbreed, breed] = currentBreed.split(" ");
        dogCeo
          .getAllImagesFromSubBreed(breed, subbreed)
          .then(handleDogCeoResponse);
      } else {
        let breed = currentBreed;
        dogCeo.getAllImagesFromBreed(breed).then(handleDogCeoResponse);
      }
    }
  }, [currentBreed]);

  React.useEffect(() => {
    if (images.length > 0) {
      setDiplayedImages((prev) => {
        let start = prev.length;
        let end = prev.length + NUMBER_OF_IMAGES_PER_PAGE;

        if (start >= images.length || end > images.length) {
          setLoadingImages(false);
          return prev;
        }
        return prev.concat(images.slice(start, end));
      });
    }
  }, [images, page]);

  const handleDogCeoResponse = (response) => {
    setImages(response);
    setDiplayedImages([]); // cuz user selected new breed
    setLoadingImages(true);
    setPage(0);
  };

  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  };

  /**
   * @author 109149
   * @time Wed 03 Mar 2021 22:41:18 +04
   *
   * Handles whatever happens when user selects a dog breed.
   */
  const handleChange = (event) => {
    let userChosenBreed = breeds.find((breed) => breed === event.target.value);

    if (userChosenBreed && userChosenBreed !== currentBreed) {
      setCurrentBreed(userChosenBreed);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <h1>Bubu Fetch</h1>
          <SelectBreeds
            breeds={breeds}
            currentBreed={currentBreed}
            handleChange={handleChange}
          />
          {diplayedImages.map((url) => {
            // return <p key={image}>{image}</p>;
            return (
              <img key={uuid()} src={url} alt={`dog-breed-${currentBreed}`} />
            );
          })}
          <div className="infinite-scroll" ref={loader}>
            {loadingImages && <h2>WTF is dis?</h2>}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
