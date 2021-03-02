/**
 * @author 109149
 * @time Tue 02 Mar 2021 16:59:54 +04
 *
 * Fetch data from URL.
 *
 * @param {String} URL is some endpoint.
 * @return {Promise} resolved json response.
 */
const fetchJSON = (URL) => {
  return new Promise((resolve, reject) =>
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "error" || data.code === 404) reject(data);
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      })
  );
};

export { fetchJSON };
