import React from "react";
import { v4 as uuid } from "uuid";
import "./App.css";
import { Loading, SelectBreeds, InfiniteScroll } from "../";
import {
  useSetupBreeds,
  useCurrentBreed,
  useDisplayedImages,
  useLoadingImages,
} from "./hooks";

function App() {
  // console.trace();
  const [loading, setLoading] = React.useState(true);
  const [breeds, setBreeds] = React.useState([]);
  const [currentBreed, setCurrentBreed] = React.useState(breeds[0]);
  const [images, setImages] = React.useState([]);
  const [diplayedImages, setDiplayedImages] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [loadingImages, setLoadingImages] = React.useState(true);

  useSetupBreeds({ setBreeds, setCurrentBreed, setLoading });
  useCurrentBreed({
    currentBreed,
    setImages,
    setDiplayedImages,
    setLoadingImages,
    setPage,
  });
  useDisplayedImages({ images, setDiplayedImages, page });
  useLoadingImages({ diplayedImages, images, setLoadingImages });

  /**
   * @author 109149
   * @time Wed 03 Mar 2021 22:41:18 +04
   *
   * Checks if user selected breed exists in breeds list and updates currently
   * selected breed.
   */
  const handleChange = (event) => {
    let userChosenBreed = breeds.find((breed) => breed === event.target.value);

    if (userChosenBreed && userChosenBreed !== currentBreed) {
      setCurrentBreed(userChosenBreed);
    }
  };

  const infiniteScrollCallback = React.useCallback(
    () => setPage((prev) => prev + 1),
    []
  );

  if (process.env.NODE_ENV === "development") console.log("render");
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
          <InfiniteScroll
            loadingImages={loadingImages}
            cb={infiniteScrollCallback}
          >
            {diplayedImages.map((url) => {
              return <p key={uuid()}>{url}</p>;
              // return (
              //   <img key={uuid()} src={url} alt={`dog-breed-${currentBreed}`} />
              // );
            })}
          </InfiniteScroll>
        </div>
      )}
    </>
  );
}

export default App;
