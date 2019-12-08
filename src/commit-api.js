const sha256 = require("./sha256");

class CommitmentApi {
  /**
   *
   * @param {string} key random 256 bit value
   */
  constructor(key) {
    this.key = key;
  }
  /**
   *
   * @param {String} message message to commit to
   * @returns {Object} commit and the key
   */
  commit(message) {
    const commit = sha256(message + this.key);
    return {commit, key: this.key};
  }
}

/**
 *
 * @param {String} commit given commit to verify
 * @param {String} key Key of the API used for commiting
 * @param {String} message Message to verify against
 * @returns {Boolean} does the commit match with message and the key
 */
function verify(commit, key, message) {
  return sha256(message + key) === commit;
}

module.exports = {
  CommitmentApi,
  verify
};
