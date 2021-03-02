import * as dogCeo from "../dog-ceo";
import * as helpers from "../helpers";

jest.mock("../helpers");

describe("Dog CEO API", function () {
  describe("dogCeo.getAllBreeds", function () {
    test("should fetch all breeds in sorted order", function () {
      const message = {
        a: ["c", "b"],
        d: [],
      };
      const response = {
        message,
        status: "success",
      };
      helpers.fetchJSON.mockImplementation(() => Promise.resolve(response));

      const result = ["b a", "c a", "d"];

      return dogCeo
        .getAllBreeds()
        .then((response) => expect(response).toEqual(result));
    });

    test("should return empty array when status is 'error'", function () {
      const response = {
        message: "status is 'error'",
        status: "error",
        code: 200,
      };
      helpers.fetchJSON.mockImplementation(() => Promise.reject(response));

      return dogCeo
        .getAllBreeds()
        .then((response) => expect(response).toEqual([]));
    });

    test("should return empty array when code is 404", function () {
      const response = {
        message: "code is 404",
        status: "success",
        code: 404,
      };
      helpers.fetchJSON.mockImplementation(() => Promise.reject(response));

      return dogCeo
        .getAllBreeds()
        .then((response) => expect(response).toEqual([]));
    });

    test("should return empty array when url is invalid", function () {
      const error = {
        message: "JSON.parse: unexpected ...",
        name: "SyntaxError",
      };
      helpers.fetchJSON.mockImplementation(() => Promise.reject(error));

      return dogCeo
        .getAllBreeds("wrong url")
        .then((response) => expect(response).toEqual([]));
    });
  });

  describe("dogCeo.random", function () {
    test("should return random image", function () {
      const message = "url";
      const response = {
        message,
        status: "success",
      };
      helpers.fetchJSON.mockImplementation(() => Promise.resolve(response));

      return dogCeo.random().then((response) => expect(response).toBe(message));
    });

    test("should return empty string when status is 'error'", function () {
      const message = "url";
      const response = {
        message,
        status: "error",
      };
      helpers.fetchJSON.mockImplementation(() => Promise.reject(response));

      return dogCeo.random().then((response) => expect(response).toBe(""));
    });

    test("should return empty string when code is 404", function () {
      const message = "url";
      const response = {
        message,
        status: "success",
        code: 404,
      };
      helpers.fetchJSON.mockImplementation(() => Promise.reject(response));

      return dogCeo.random().then((response) => expect(response).toBe(""));
    });
  });

  /**
   * other assertions for status and code are not necessary, as
   * dogCeo.randomMultiple is wrapper over dogCeo.random
   */
  describe("dogCeo.randomMultiple", function () {
    test("should return 3 images", function () {
      const data = {
        message: ["img1", "img2", "img3"],
        status: "success",
      };
      helpers.fetchJSON.mockImplementation(() => Promise.resolve(data));

      return dogCeo
        .randomMultiple()
        .then((response) => expect(response).toHaveLength(3));
    });

    test("should return 1 images", function () {
      const data = {
        message: ["img"],
        status: "success",
      };
      helpers.fetchJSON.mockImplementation(() => Promise.resolve(data));

      return dogCeo
        .randomMultiple()
        .then((response) => expect(response).toHaveLength(1));
    });

    test("should return 50 images", function () {
      const data = {
        message: Array(50).fill("img"),
        status: "success",
      };
      helpers.fetchJSON.mockImplementation(() => Promise.resolve(data));

      return dogCeo
        .randomMultiple()
        .then((response) => expect(response).toHaveLength(50));
    });

    test("should return empty array when `numberOfDogs` is 0", function () {
      return dogCeo
        .randomMultiple(0)
        .then((response) => expect(response).toHaveLength(0));
    });

    test("should return empty array when `numberOfDogs` is 51", function () {
      return dogCeo
        .randomMultiple(51)
        .then((response) => expect(response).toHaveLength(0));
    });

    test("should return empty array when `numberOfDogs` is not `number` type", function () {
      return dogCeo
        .randomMultiple("a")
        .then((response) => expect(response).toHaveLength(0));
    });
  });

  describe("dogCeo.getAllImagesFromBreed", function () {
    let breed;
    beforeEach(function () {
      breed = "some breed name";
    });

    test("should get images", function () {
      const data = {
        message: Array(69).fill("img"),
        status: "success",
      };
      helpers.fetchJSON.mockImplementation(() => Promise.resolve(data));

      return dogCeo
        .getAllImagesFromBreed(breed)
        .then((response) => expect(response).toHaveLength(data.message.length));
    });

    test("should return empty array status is `error`", function () {
      const data = {
        message: "invalid breed",
        status: "error",
      };
      helpers.fetchJSON.mockImplementation(() => Promise.reject(data));

      return dogCeo
        .getAllImagesFromBreed(breed)
        .then((response) => expect(response).toHaveLength(0));
    });
  });

  describe("dogCeo.getRandomFromBreed", function () {
    let breed;
    beforeEach(function () {
      breed = "some breed";
    });

    test("should be 1 image", function () {
      const data = {
        message: "img",
        status: "success",
      };
      helpers.fetchJSON.mockImplementation(() => Promise.resolve(data));

      return dogCeo
        .getRandomFromBreed(breed)
        .then((response) => expect(response).toBe(data.message));
    });

    test("should return empty string when something's wrong", function () {
      const data = {};
      helpers.fetchJSON.mockImplementation(() => Promise.reject(data));

      return dogCeo
        .getRandomFromBreed(breed)
        .then((response) => expect(response).toBe(""));
    });
  });

  describe("dogCeo.getRandomMultipleFromBreed", function () {
    let breed;
    beforeEach(function () {
      breed = "some breed";
    });

    test("should return 3 images", function () {
      const data = {
        message: Array(3).fill("img"),
        status: "succes",
      };
      helpers.fetchJSON.mockImplementation(() => Promise.resolve(data));

      return dogCeo
        .getRandomMultipleFromBreed(breed)
        .then((response) => expect(response).toHaveLength(3));
    });

    test("should return 50 images", function () {
      const data = {
        message: Array(50).fill("img"),
        status: "success",
      };
      helpers.fetchJSON.mockImplementation(() => Promise.resolve(data));

      return dogCeo
        .getRandomMultipleFromBreed(breed, 50)
        .then((response) => expect(response).toHaveLength(50));
    });

    test("should return empty array when something's wrong", function () {
      const data = {};
      helpers.fetchJSON.mockImplementation(() => Promise.reject(data));

      return dogCeo
        .getRandomMultipleFromBreed(breed)
        .then((response) => expect(response).toHaveLength(0));
    });
  });

  describe("dogCeo.getSubBreedsFromBreed", function () {
    let breed;
    beforeEach(function () {
      breed = "some breed";
    });

    test("should return 3 subbreeds", function () {
      const data = {
        message: Array(3).fill("subbreed"),
        status: "success",
      };
      helpers.fetchJSON.mockImplementation(() => Promise.resolve(data));

      return dogCeo
        .getSubBreedsFromBreed(breed)
        .then((response) => expect(response).toHaveLength(3));
    });

    test("should return empty array when something's wrong", function () {
      const data = {};
      helpers.fetchJSON.mockImplementation(() => Promise.reject(data));

      return dogCeo
        .getSubBreedsFromBreed(breed)
        .then((response) => expect(response).toHaveLength(0));
    });
  });

  describe("dogCeo.getAllImagesFromSubBreed", function () {
    let breed;
    let subbreed;
    beforeEach(function () {
      breed = "some breed";
      subbreed = "some subbreed";
    });

    test("should return images", function () {
      const data = {
        message: Array(100).fill("img"),
        status: "success",
      };
      helpers.fetchJSON.mockImplementation(() => Promise.resolve(data));

      return dogCeo
        .getAllImagesFromSubBreed(breed, subbreed)
        .then((response) => expect(response).toHaveLength(100));
    });

    test("should return empty array when something's wrong", function () {
      const data = {};
      helpers.fetchJSON.mockImplementation(() => Promise.reject(data));

      return dogCeo
        .getAllImagesFromSubBreed(breed, subbreed)
        .then((response) => expect(response).toHaveLength(0));
    });
  });

  describe("dogCeo.getRandomImageFromSubBreed", function () {
    let breed;
    let subbreed;
    beforeEach(function () {
      breed = "some breed";
      subbreed = "some subbreed";
    });

    test("should return single image", function () {
      const data = {
        message: "img",
        status: "success",
      };
      helpers.fetchJSON.mockImplementation(() => Promise.resolve(data));

      return dogCeo
        .getRandomImageFromSubBreed(breed, subbreed)
        .then((response) => expect(response).toBe(data.message));
    });

    test("should return empty string when something's wrong", function () {
      const data = {};
      helpers.fetchJSON.mockImplementation(() => Promise.reject(data));

      return dogCeo
        .getRandomImageFromSubBreed(breed, subbreed)
        .then((response) => expect(response).toBe(""));
    });
  });

  describe("dogCeo.getRandomMultipleFromSubBreed", function () {
    let breed;
    let subbreed;
    beforeEach(function () {
      breed = "some breed";
      subbreed = "some subbreed";
    });

    test("should return 3 images", function () {
      const data = {
        message: Array(3).fill("img"),
        status: "success",
      };
      helpers.fetchJSON.mockImplementation(() => Promise.resolve(data));

      return dogCeo
        .getRandomMultipleFromSubBreed(breed, subbreed)
        .then((response) => expect(response).toHaveLength(3));
    });

    test("should return 50 images", function () {
      const data = {
        message: Array(50).fill("img"),
        status: "success",
      };
      helpers.fetchJSON.mockImplementation(() => Promise.resolve(data));

      return dogCeo
        .getRandomMultipleFromSubBreed(breed, subbreed, 50)
        .then((response) => expect(response).toHaveLength(50));
    });

    test("should return empty array when something's wrong", function () {
      const data = {};
      helpers.fetchJSON.mockImplementation(() => Promise.reject(data));

      return dogCeo
        .getRandomMultipleFromSubBreed(breed, subbreed)
        .then((response) => expect(response).toHaveLength(0));
    });
  });
});
