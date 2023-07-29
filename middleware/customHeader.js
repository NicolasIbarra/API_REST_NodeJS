/**
 * Example of header and how to treat custom headers.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const customHeader = (req, res, next) => {
  try {
    const apiKey = req.headers.apikey;
    if (apiKey === "API_TEST") {
      next();
    } else {
      res.status(403);
      res.send({ ERROR: "INCORRECT_API_KEY" });
    }
  } catch (e) {
    res.status(403);
    res.send({ ERROR: "SOMETHING_WENT_WRONG" });
  }
};

module.exports = customHeader;
