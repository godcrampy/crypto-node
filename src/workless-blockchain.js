const sha256 = require("./sha256");

class WorklessBlock {
  /**
   *
   * @param {String} data data to be stored
   * @param {String} previousHash hash of previous block
   */
  constructor(data, previousHash) {
    this.data = data;
    this.previousHash = previousHash;
    this.next = null;
  }
  /**
   * @returns {String} hash of the block
   */
  hash() {
    return sha256(this.data + this.previousHash);
  }
}

class WorklessBlockchain {
  /**
   *
   * @param {String} genesisKey key for genesis hash
   */
  constructor(genesisKey) {
    this.genesis = sha256(genesisKey);
    this.next = null;
  }
  /**
   *
   * @param {String} data data to be stored
   */
  addBlock(data) {
    if (this.next === null) {
      this.next = new WorklessBlock(data, this.genesis);
    } else {
      let itr = this.next;
      while (itr.next != null) {
        itr = itr.next;
      }
      itr.next = new WorklessBlock(data, itr.hash());
    }
  }
  printBlockChain() {
    let itr = this.next;
    while (itr !== null) {
      console.log(`Data: ${itr.data}, prevHash: ${itr.previousHash}`);
      itr = itr.next;
    }
  }
  /**
   * @returns {Boolean} Is blockchain valid
   */
  verifyBlockChain() {
    let itr = this.next;
    while (itr.next !== null) {
      if (itr.hash() !== itr.next.previousHash) {
        return false;
      }
      itr = itr.next;
    }
    return true;
  }
}

module.exports = WorklessBlockchain;
