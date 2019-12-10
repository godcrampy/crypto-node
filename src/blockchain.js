const sha256 = require("./sha256");
const proofOfWork = require("./proof-of-work");

class Block {
  /**
   *
   * @param {String} data data to store
   * @param {String} previousHash hash of previous block
   * @param {Number} workDifficulty difficulty of proof of work
   */
  constructor(data, previousHash, workDifficulty) {
    this.data = data;
    this.previousHash = previousHash;
    this.next = null;
    this.nonce = 0;
    this.workDifficulty = workDifficulty;
    this.mine();
  }
  mine() {
    const message = this.data + this.previousHash;
    this.nonce = proofOfWork(sha256, message, this.workDifficulty);
  }
  /**
   * @returns {String} hash of the block
   */
  hash() {
    const message = this.data + this.previousHash;
    return sha256(message + this.nonce);
  }
}

class BlockChain {
  /**
   *
   * @param {String} genesisKey key for genesis hash
   */
  constructor(genesisKey, workDifficulty) {
    this.genesis = sha256(genesisKey);
    this.next = null;
    this.workDifficulty = workDifficulty;
  }
  /**
   *
   * @param {String} data data to be stored
   */
  addBlock(data) {
    if (this.next === null) {
      this.next = new Block(data, this.genesis, this.workDifficulty);
    } else {
      let itr = this.next;
      while (itr.next != null) {
        itr = itr.next;
      }
      itr.next = new Block(data, itr.hash(), this.workDifficulty);
    }
  }
  printBlockChain() {
    let itr = this.next;
    while (itr !== null) {
      console.log(`Data: ${itr.data}, prevHash: ${itr.previousHash}, nonce: ${itr.nonce}`);
      itr = itr.next;
    }
  }
  /**
   * @returns {Boolean} Is blockchain valid
   */
  verifyBlockChain() {
    let itr = this.next;
    while (itr.next !== null) {
      if (
        itr.hash() !== itr.next.previousHash ||
        itr.hash().slice(0, this.workDifficulty) !== "0".repeat(this.workDifficulty)
      ) {
        return false;
      }
      itr = itr.next;
    }
    return true;
  }
}

module.exports = BlockChain;
