const BlockChain = require("./src/workless-blockchain");

let bc = new BlockChain("mozarella");

bc.addBlock(45);
bc.addBlock(78);
bc.addBlock(19);
bc.addBlock(4);
bc.printBlockChain();

console.log(bc.verifyBlockChain());
bc.next.next.data = 42;
console.log(bc.verifyBlockChain());