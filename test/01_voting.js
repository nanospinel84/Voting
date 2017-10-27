var Voting = artifacts.require("Voting");
chai = require("chai");
chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);

expect = chai.expect;

contract("Voting contracts", function(VotingList) {
  describe("Deployed contract", function() {
    it("Get an instance", function() {
      return Voting.new().then(function(instance) {
        votingContract = instance;
        expect(votingContract).to.not.to.be.null;
      });
    });
  });



  describe("Test functions", function() {
    it("sould set a Candidate", function() {
      return votingContract.setCandidate(0x4dc600e74695cc8bf805f2dfd8609c7c33a4aed6, "80759619", "1234567890", 33, false, "partido1").then(function(response) {
        expect(response).to.not.to.be.an("error");
      });
    });

    it("sould set a Voter", function() {
      return votingContract.setVoter(0x4dc600e74695cc8bf805f2dfd8609c7c33a4aed6, "80759619", "1234567890", 33, false, "partido1").then(function(response) {
        expect(response).to.not.to.be.an("error");
      });
    });

    it("Validate if the candidate is on the candidate list", function() {
      return votingContract.isCandidateOnList(0x4dc600e74695cc8bf805f2dfd8609c7c33a4aed6).then(function(response) {
        expect(response).to.be.true;
      });
    });

    it("Validate if the candidate is not on the candidate list", function() {
      return votingContract.isCandidateOnList(0x4dc600e74695cc8bf805).then(function(response) {
        expect(response).to.be.false;
      });
    });

    it("retrieve candidate", function() {
      return votingContract.getCandidate(0x4dc600e74695cc8bf805).then(function(response) {
        expect(response).to.not.to.be.an("error");
      });
    });

    it("vote for a candidate", function() {
      return votingContract.vote(0x4dc600e74695cc8bf805f2dfd8609c7c33a4aed6, 0x4dc600e74695cc8bf805f2dfd8609c7c33a4aed6).then(function(response) {
        console.log('response vote: ', response);
        expect(response).to.not.to.be.an("error");
      });
    });

    it("another vote from same voter for a candidate", function() {
      return votingContract.vote(0x4dc600e74695cc8bf805f2dfd8609c7c33a4aed6, 0x4dc600e74695cc8bf805f2dfd8609c7c33a4aed6).then(function(response) {
        console.log('response vote: ', response);
        expect(response).to.not.to.be.an("error");
      });
    });

    it("retrieve the votes of candidate", function() {
      return votingContract.getVotesByCandidate(0x4dc600e74695cc8bf805f2dfd8609c7c33a4aed6).then(function(response) {
        console.log('votes: ', parseInt(response));
        expect(response).to.not.to.be.an("error");
      });
    });

  });

});
