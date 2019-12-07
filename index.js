const crypto = require("crypto");

function sha256(message) {
  return crypto
    .createHash("sha256")
    .update(message)
    .digest("hex");
}

function hashChain(message, length) {
  let final = sha256(message);
  for (let i = 1; i < length; ++i) {
    final = sha256(final);
  }
  return final;
}

console.log(hashChain("hi", 100));