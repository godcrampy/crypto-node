/**
 *
 * @param {Function} hashFunction
 * @param {String} message data to be hashed
 * @param {Number} difficulty difficulty of PoW
 * @returns {Number} nonce
 */
function proofOfWork(hashFunction, message, difficulty) {
  let nonce = 0;
  console.time("Time for PoW");
  console.log("Starting Proof of Work");
  while (nonce < 10e10) {
    if (hashFunction(message + nonce).slice(0, difficulty) === "0".repeat(difficulty)) {
      console.timeEnd("Time for PoW");
      return nonce;
    }
    ++nonce;
  }
  throw new Error("Nonce not found");
}

module.exports = proofOfWork;
