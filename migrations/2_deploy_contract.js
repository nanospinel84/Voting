var VotingList = artifacts.require("./Voting.sol");

module.exports = function(deployer) {
  deployer.deploy(VotingList);
};
