import * as helpers from "../helpers";

describe("helpers", function () {
  describe("helpers.fetchJSON", function () {
    let data;
    const URL = "some url";
    beforeEach(function () {
      data = {
        message: "something",
        status: "success",
      };
      jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
          json: () => Promise.resolve(data),
        })
      );
    });

    afterEach(function () {
      global.fetch.mockRestore();
    });

    test("should resolve", function () {
      return helpers
        .fetchJSON(URL)
        .then((response) => expect(response).toEqual(data));
    });

    test("should reject when status is 'error'", function () {
      data.status = "error";
      data.message = "error message";

      return helpers
        .fetchJSON(URL)
        .catch((error) => expect(error).toEqual(data));
    });

    test("should reject when code is 404", function () {
      data.message = "error message";
      data.code = 404;

      return helpers
        .fetchJSON(URL)
        .catch((error) => expect(error).toEqual(data));
    });

    // test("should reject instantly", function () {

    // })
  });
});
