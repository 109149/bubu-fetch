import { fetchJSON } from "./helpers";

/**
 * @author 109149
 * @time Tue 02 Mar 2021 16:36:18 +04
 *
 * Fetches all breeds names.
 *
 * @param {String} ?url is another endpoint.
 * @return {Promise} list of breeds.
 */
const getAllBreeds = (url) => {
  const URL = url || "https://dog.ceo/api/breeds/list/all";

  /*
   * {
   *  "message": {
   *    "breed1": [
   *      "subbreed1",
   *      "subbreed2",
   *    ],
   *    "breed2": [],
   *  },
   *  "status":"success"
   * }
   */
  return new Promise((resolve) => {
    fetchJSON(URL)
      .then((response) => response.message)
      .then((response) => {
        const breeds = [];

        Object.keys(response).forEach((breed) => {
          const subBreeds = response[breed].map((subBreed) =>
            [subBreed, breed].join(" ")
          );

          if (subBreeds.length === 0) {
            /* when there is no subbreed */
            breeds.push(breed);
          } else {
            subBreeds.forEach((subBreed) => breeds.push(subBreed));
          }
        });

        resolve(breeds.sort());
      })
      .catch((error) => {
        if (process.env.NODE_ENV === "development")
          console.error(
            "couldn't fetch breeds:",
            error.name,
            "-",
            error.message
          );
        resolve([]);
      });
  });
};

/**
 * @author 109149
 * @time Tue 02 Mar 2021 16:44:10 +04
 *
 * Fetches random breed image.
 *
 * @param {String} ?url is another endpoint.
 * @return {Promise} image url.
 */
const random = (url) => {
  const URL = url || "https://dog.ceo/api/breeds/image/random";

  /*
   * {
   *  "message": "https://...",
   *  "status":"success"
   * }
   */
  return new Promise((resolve) => {
    fetchJSON(URL)
      .then((response) => resolve(response.message))
      .catch((error) => {
        if (process.env.NODE_ENV === "development")
          console.error(
            "couldn't fetch random image:",
            error.name,
            "-",
            error.message
          );
        resolve("");
      });
  });
};

/**
 * @author 109149
 * @time Tue 02 Mar 2021 20:32:36 +04
 *
 * Fetches multiple (1-50 inclusive) random breed images.
 *
 * @param {number} numberOfDogs is number of dog images to fetch [1,50] (default 3).
 * @param {string} url is endpoint for random breeds collections.
 * @return {Promise} array of dog image urls.
 */
const randomMultiple = (numberOfDogs = 3, url) => {
  if (
    typeof numberOfDogs !== "number" ||
    numberOfDogs < 1 ||
    numberOfDogs > 50
  ) {
    if (process.env.NODE_ENV === "development")
      console.error(
        "couldn't fetch random image:",
        "InvalidArgumentForNumberOfDogs",
        "-",
        "something's wrong with `numberOfDogs`"
      );

    return Promise.resolve([]);
  }

  const URL = `${
    url ?? "https://dog.ceo/api/breeds/image/random/"
  }${numberOfDogs}`;

  /**
   * {
   *  "message": [
   *    'img-url1',
   *    'img-url2',
   *    'img-url3',
   *  ],
   *  "status": "success"
   * }
   */
  return new Promise((resolve) => {
    random(URL).then((response) => {
      if (typeof response === "string") resolve([]);
      resolve(response);
    });
  });
};

/**
 * @author 109149
 * @time Tue 02 Mar 2021 21:08:04 +04
 *
 * Fetches images from specified breed.
 *
 * @param {string} breed is the name of the dog breed.
 * @return {Promise} array of image urls of specified dog breed.
 */
const getAllImagesFromBreed = (breed) => {
  const URL = `https://dog.ceo/api/breed/${breed}/images`;

  /**
   * {
   *  "message": [
   *    'img1',
   *    'img2',
   *     // ...
   *  ],
   *  "status": "success"
   * }
   */
  return new Promise((resolve) => {
    fetchJSON(URL)
      .then((response) => resolve(response.message))
      .catch((error) => {
        if (process.env.NODE_ENV === "development")
          console.error(
            "couldn't fetch breed images:",
            error.name,
            "-",
            error.message
          );
        resolve([]);
      });
  });
};

/**
 * @author 109149
 * @time Tue 02 Mar 2021 21:09:04 +04
 *
 * Fetches random image from specified breed.
 *
 * @param {string} breed is the name of the dog breed.
 * @return {Promise} image url of specified dog breed.
 */
const getRandomFromBreed = (breed) => {
  const URL = `https://dog.ceo/api/breed/${breed}/images/random`;

  /**
   * {
   *  "message": "breed img url",
   *  "status": "success"
   * }
   */
  return new Promise((resolve) => {
    random(URL).then((response) => resolve(response));
  });
};

/**
 * @author 109149
 * @time Tue 02 Mar 2021 21:10:21 +04
 *
 * Fetches random number of images from specified breed.
 *
 * @param {string} breed is the name of the dog breed.
 * @param {number} numberOfDogs is the number of dog images to fetch (default 3).
 * @return {Promise} array of image urls of specified dog breed.
 */
const getRandomMultipleFromBreed = (breed, numberOfDogs = 3) => {
  const URL = `https://dog.ceo/api/breed/${breed}/images/random/${numberOfDogs}`;

  return new Promise((resolve) => {
    randomMultiple(numberOfDogs, URL).then((response) => resolve(response));
  });
};

/**
 * @author 109149
 * @time Tue 02 Mar 2021 21:24:44 +04
 *
 * Fetches list of sub-breeds from breed.
 *
 * @param {string} breed is the name of the dog breed.
 * @return {Promise} array of the subbreeds.
 */
const getSubBreedsFromBreed = (breed) => {
  const URL = `https://dog.ceo/api/breed/${breed}/list`;

  /*
   * {
   *  "message": [
   *    'subbreed1',
   *    'subbreed2',
   *    'subbreed3',
   *    // ...
   *  ],
   *  "status":"success"
   * }
   */
  return new Promise((resolve) => {
    fetchJSON(URL)
      .then((response) => resolve(response.message))
      .catch((error) => {
        if (process.env.NODE_ENV === "development")
          console.error(
            "couldn't fetch subbreeds:",
            error.name,
            "-",
            error.message
          );
        resolve([]);
      });
  });
};

/**
 * @author 109149
 * @time Tue 02 Mar 2021 21:29:15 +04
 *
 * Fetches images from specified breed and subbreed.
 *
 * @param {string} breed is the name of the dog breed.
 * @param {string} subbreed is the name of the dog subbreed.
 * @return {Promise} array of image urls of dog subbreed.
 */
const getAllImagesFromSubBreed = (breed, subbreed) => {
  const URL = `https://dog.ceo/api/breed/${breed}/${subbreed}/images`;

  /**
   * {
   *  "message": [
   *    "img1',
   *    "img2',
   *    // ...
   *  ],
   *   "status": "success"
   * }
   */
  return new Promise((resolve) => {
    fetchJSON(URL)
      .then((response) => resolve(response.message))
      .catch((error) => {
        if (process.env.NODE_ENV === "development")
          console.error(
            "couldn't fetch subbreed images:",
            error.name,
            "-",
            error.message
          );
        resolve([]);
      });
  });
};

/**
 * @author 109149
 * @time Tue 02 Mar 2021 21:34:34 +04
 *
 * Fetches single random image from specified breed + subbreed.
 *
 * @param {string} breed is the name of the dog breed.
 * @param {string} subbreed is the name of the dog subbreed.
 * @return {Promise} image url of dog subbreed.
 */
const getRandomImageFromSubBreed = (breed, subbreed) => {
  const URL = `https://dog.ceo/api/breed/${breed}/${subbreed}/images/random`;

  /**
   * {
   *  "message": "img url",
   *  "status": 'success'
   * }
   */
  return new Promise((resolve) => {
    random(URL).then((response) => resolve(response));
  });
};

/**
 * @author 109149
 * @time Tue 02 Mar 2021 21:42:50 +04
 *
 * Fetches random images from specified breed and subbreed.
 *
 * @param {string} breed is the name of the dog breed.
 * @param {string} subbreed is the name of the dog subbreed.
 * @param {number} numberOfDogs is the number of dog images to fetch.
 * @return {Promise} array of image urls of dog subbreed.
 */
const getRandomMultipleFromSubBreed = (breed, subbreed, numberOfDogs = 3) => {
  const URL = `https://dog.ceo/api/breed/${breed}/${subbreed}/images/random/${numberOfDogs}`;

  return new Promise((resolve) => {
    randomMultiple(numberOfDogs, URL).then((response) => resolve(response));
  });
};

export {
  getAllBreeds,
  random,
  randomMultiple,
  getAllImagesFromBreed,
  getRandomFromBreed,
  getRandomMultipleFromBreed,
  getSubBreedsFromBreed,
  getAllImagesFromSubBreed,
  getRandomImageFromSubBreed,
  getRandomMultipleFromSubBreed,
};
