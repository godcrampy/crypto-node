const crypto = require("crypto");

/**
 *
 * @param {String} message string to be hashed
 */
function sha256(message) {
  return crypto
    .createHash("sha256")
    .update(message)
    .digest("hex");
}

module.exports = sha256;
