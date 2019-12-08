const {CommitmentApi, verify} = require("./src/commit-api");
// key is used to make sure that the message stays collision safe
const key = require("./src/sha256")("pizza-pie");
console.log(key);

const api = new CommitmentApi(key);
const message = "Old is Gold";
const wrongMessage = "New is Bleu";

const {commit} = api.commit(message);

console.log(commit);

console.log(verify(commit, key, message));
console.log(verify(commit, key, wrongMessage));
