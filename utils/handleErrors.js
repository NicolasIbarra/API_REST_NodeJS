/**
 * Function that returns different errors to users.
 * @param {*} res 
 * @param {*} message 
 * @param {*} code 
 */
const handleHttpError = (res, message, code) => {
  res.status(code);
  res.send({ error: message });
};

module.exports = ({ handleHttpError });
