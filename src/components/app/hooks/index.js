import React from "react";
import * as dogCeo from "../../../api/dog-ceo";

/**
 * @author 109149
 * @time Sat 06 Mar 2021 21:51:03 +04
 *
 * Initial setup for application. Sets fetched breeds list, current breed and
 * loading.
 */
const useSetupBreeds = ({ setBreeds, setCurrentBreed, setLoading }) => {
  React.useEffect(() => {
    dogCeo.getAllBreeds().then((breeds) => {
      let initialBreed = breeds[0];

      setBreeds(breeds);

      setCurrentBreed((prev) => {
        return prev === "" || !prev ? initialBreed : prev;
      });

      setLoading(false);
    });
  }, [setBreeds, setCurrentBreed, setLoading]);
};

/**
 * @author 109149
 * @time Sun 07 Mar 2021 01:12:26 +04
 *
 * Sets images based on selected breed/subbreed.
 */
const useCurrentBreed = (props) => {
  const {
    currentBreed,
    setImages,
    setDiplayedImages,
    setLoadingImages,
    setPage,
  } = props;

  React.useEffect(() => {
    if (currentBreed) {
      // if (process.env.NODE_ENV === "development")
      //   console.log("useCurrentBreed: Effect");
      let isSubBreed = currentBreed.split(" ").length === 2;

      function handleDogCeoResponse(response) {
        setImages(response);
        setDiplayedImages([]); // cuz user selected new breed
        setLoadingImages(true);
        setPage(0);
      }

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
  }, [currentBreed, setImages, setDiplayedImages, setLoadingImages, setPage]);
};

/**
 * @author 109149
 * @time Sun 07 Mar 2021 01:13:05 +04
 *
 * Updates current list of displayed images by concatenating new ones.
 */
const useDisplayedImages = (props) => {
  const { images, setDiplayedImages, page } = props;
  const NUMBER_OF_IMAGES_PER_PAGE = 25;

  React.useEffect(() => {
    if (images.length > 0) {
      setDiplayedImages((prev) => {
        let start = prev.length;
        let end = prev.length + NUMBER_OF_IMAGES_PER_PAGE;

        if (start >= images.length || end > images.length) return prev;
        return prev.concat(images.slice(start, end));
      });
    }
  }, [images, page, setDiplayedImages]);
};

/**
 * @author 109149
 * @time Sun 07 Mar 2021 01:14:08 +04
 *
 * Sets loading images to false when there are no more new images to display.
 */
const useLoadingImages = (props) => {
  const { diplayedImages, images, setLoadingImages } = props;

  React.useEffect(() => {
    if (diplayedImages.length >= images.length) setLoadingImages(false);
  }, [diplayedImages, images, setLoadingImages]);
};

export {
  useSetupBreeds,
  useCurrentBreed,
  useDisplayedImages,
  useLoadingImages,
};
