// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Election {
    address public owner;
    uint public candidateCount;
    uint public voterCount;
    uint public castVotesCount;
    bool public start;
    bool public end;

    constructor() {
        owner = msg.sender;
        candidateCount = 0;
        voterCount = 0;
        castVotesCount = 0;
        start = false;
        end = false;
    }

    modifier onlyAdmin() {
        require(msg.sender == owner, "Only the admin can perform this action.");
        _;
    }

    event AddedCandidateEvent(string _name, string _party);
    event AddedVoterEvent(address _publicKey);
    event ElectionReady(string message);
    event ElectionEnd(string message);
    event VotedEvent(uint _candidateId);

    struct Candidate {
        uint candidateId;
        string name;
        string party;
        uint voteCount;
    }

    struct Voter {
        address voterAddress;
        bool hasVoted;
        bool isVerified;
    }

    mapping(uint => Candidate) public candidates;
    mapping(address => Voter) public voters;

    function addCandidate(string memory _name, string memory _party) public onlyAdmin {
        require(!start && !end, "Election is ongoing or has ended.");
        candidateCount++;
        candidates[candidateCount] = Candidate(candidateCount, _name, _party, 0);
        emit AddedCandidateEvent(_name, _party);
    }

    function addVoter(address _publicKey) public onlyAdmin {
        require(!start && !end, "Election is ongoing or has ended.");
        voterCount++;
        voters[_publicKey] = Voter(_publicKey, false, true);
        emit AddedVoterEvent(_publicKey);
    }

    function startElection() public onlyAdmin {
        require(!start && !end, "Election already started.");
        start = true;
        end = false;
        emit ElectionReady("The election has officially started.");
    }

    function endElection() public onlyAdmin {
        require(start && !end, "Election hasn't started yet.");
        end = true;
        start = false;
        emit ElectionEnd("The election has officially ended.");
    }

    function resetElection() public onlyAdmin {
        for (uint i = 1; i <= candidateCount; i++) {
            delete candidates[i];
        }
        
        start = false;
        end = false;
        candidateCount = 0;
        voterCount = 0;
        castVotesCount = 0;
    }

    function vote(uint _candidateId) public {
        require(start && !end, "Election is not active.");
        require(!voters[msg.sender].hasVoted, "You have already voted.");
        require(voters[msg.sender].isVerified, "You are not verified to vote.");
        require(_candidateId > 0 && _candidateId <= candidateCount, "Invalid candidate ID.");

        candidates[_candidateId].voteCount++;
        voters[msg.sender].hasVoted = true;
        castVotesCount++;
        emit VotedEvent(_candidateId);
    }

    function winnerIndex() public view returns (uint winnerIndex_) {
        require(end, "Election must have ended.");
        uint winningVoteCount = 0;
        for (uint i = 1; i <= candidateCount; i++) {
            if (candidates[i].voteCount > winningVoteCount) {
                winningVoteCount = candidates[i].voteCount;
                winnerIndex_ = i;
            }
        }
    }

    function getCandidateVoteCount(uint _candidateId) public view returns (uint){
        return candidates[_candidateId].voteCount;
    }

    function winnerDetails() public view returns (string memory name, string memory party, uint voteCount) {
        require(end, "Election must have ended.");
        uint winnerId = winnerIndex();
        Candidate memory winner = candidates[winnerId];
        return (winner.name, winner.party, winner.voteCount);
    }
}
