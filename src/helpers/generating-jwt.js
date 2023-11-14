const jwt = require("jsonwebtoken");

const generatingJWT = (userId) => {
  return new Promise((resolve, reject) => {
    const payload = { userId };
    jwt.sign(
      payload,
      process.env.SECRETORPRIVATEKEY,
      { expiresIn: "10h" },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("Error al generar el token");
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = { generatingJWT };
