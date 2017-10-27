pragma solidity ^0.4.15;

contract Voting {

    struct Person {
      string id;
      string fingerprint;
      uint age;
      bool voted;
      string organization;
    }

    mapping (address => uint) public votingTable;

    mapping (address => Person) public voters;

    mapping (address => Person) public candidates;

    function setCandidate(address _personHash, string _id, string _fingerprint, uint _age, bool _voted, string _organization) {
      candidates[_personHash] = Person({id: _id, fingerprint: _fingerprint, age: _age, voted: _voted, organization: _organization});
    }

    function setVoter(address _personHash, string _id, string _fingerprint, uint _age, bool _voted, string _organization){
      voters[_personHash] = Person({id: _id, fingerprint: _fingerprint, age: _age, voted: _voted, organization: _organization});
    }

    function stringsEqual(string x, string y) constant returns (bool) {
      return sha3(x) == sha3(y);
    }

    function isCandidateOnList(address candidate) constant returns (bool){
      return bytes(candidates[candidate].id).length != 0;
    }

    function getCandidate(address candidate) constant returns (string, string, uint, bool, string){
      return (candidates[candidate].id, candidates[candidate].fingerprint, candidates[candidate].age, candidates[candidate].voted, candidates[candidate].organization);
    }

    function getVoter(address voter) constant returns (string, string, uint, bool, string){
      return (voters[voter].id, voters[voter].fingerprint, voters[voter].age, voters[voter].voted, voters[voter].organization);
    }

    function getVotesByCandidate(address candidate) constant returns (uint){
      return votingTable[candidate];
    }

    function vote(address voter, address candidate) returns (bool){
      bool voteOk = false;
      if(isCandidateOnList(candidate) && !voters[voter].voted && voters[voter].age >= 18 && stringsEqual(voters[voter].organization, candidates[candidate].organization)){
        votingTable[candidate] += 1;
        voters[voter].voted = true;
        voteOk = true;
      }
      return voteOk;
    }
}
