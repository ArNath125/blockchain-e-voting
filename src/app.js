// app.js

let web3;
let electionContract;
const contractAddress = "0x35CcaD4ec0c78Dc70146CdDa4835b8cAC4FB84ab";  
const contractABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "_party",
        "type": "string"
      }
    ],
    "name": "AddedCandidateEvent",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "_publicKey",
        "type": "address"
      }
    ],
    "name": "AddedVoterEvent",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "message",
        "type": "string"
      }
    ],
    "name": "ElectionEnd",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "message",
        "type": "string"
      }
    ],
    "name": "ElectionReady",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_candidateId",
        "type": "uint256"
      }
    ],
    "name": "VotedEvent",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "candidateCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "candidates",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "candidateId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "party",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "voteCount",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "castVotesCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "end",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "start",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "voterCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "voters",
    "outputs": [
      {
        "internalType": "address",
        "name": "voterAddress",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "hasVoted",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "isVerified",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_party",
        "type": "string"
      }
    ],
    "name": "addCandidate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_publicKey",
        "type": "address"
      }
    ],
    "name": "addVoter",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "startElection",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "endElection",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "resetElection",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_candidateId",
        "type": "uint256"
      }
    ],
    "name": "vote",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "winnerIndex",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "winnerIndex_",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_candidateId",
        "type": "uint256"
      }
    ],
    "name": "getCandidateVoteCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "winnerDetails",
    "outputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "party",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "voteCount",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }
];  

let currentAccount;

window.addEventListener('load', async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        await connectWallet();
    } else {
        alert('Please install MetaMask!');
    }

    electionContract = new web3.eth.Contract(contractABI, contractAddress);
    await loadCandidates();
    await checkAdmin();
    await checkVoterStatus();
});

async function connectWallet() {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    currentAccount = accounts[0];
    document.getElementById('wallet-address').innerText = `Connected: ${currentAccount}`;
}

async function checkAdmin() {
    const owner = await electionContract.methods.owner().call();
    if (currentAccount.toLowerCase() !== owner.toLowerCase()) {
        document.getElementById('admin-section').style.display = 'none';
    }
}

async function checkVoterStatus() {
  try {
      const voter = await electionContract.methods.voters(currentAccount).call();

      if (voter.isVerified) {
          document.getElementById('voter-status').innerText = 'You are verified to vote.';
      } else {
          document.getElementById('voter-status').innerText = 'You are not verified to vote.';
      }
  } catch (error) {
      console.error("Error fetching voter status:", error);
      document.getElementById('voter-status').innerText = 'Unable to verify voter.';
  }
}


async function loadCandidates() {
  try {
      const candidateCount = await electionContract.methods.candidateCount().call();
      const candidateList = document.getElementById('candidate-list');
      candidateList.innerHTML = '';

      for (let i = 1; i <= candidateCount; i++) {
          const candidate = await electionContract.methods.candidates(i).call();

          const candidateBox = document.createElement('div');
          candidateBox.className = 'candidate-box';
          candidateBox.innerHTML = `<strong>${candidate.name}</strong><br>${candidate.party}`;
          candidateBox.onclick = () => voteCandidate(i);

          candidateList.appendChild(candidateBox);
      }
  } catch (error) {
      console.error("Error loading candidates:", error);
  }
}


async function addCandidate() {
    const name = document.getElementById('candidate-name').value;
    const party = document.getElementById('candidate-party').value;
    await electionContract.methods.addCandidate(name, party).send({ from: currentAccount });
    alert(`Candidate ${name} added successfully!`);
    await loadCandidates();
}

async function addVoter() {
    const voterAddress = document.getElementById('voter-address').value;
    await electionContract.methods.addVoter(voterAddress).send({ from: currentAccount });
    alert(`Voter ${voterAddress} added successfully!`);
}

async function startElection() {
    await electionContract.methods.startElection().send({ from: currentAccount });
    alert("Election started!");
}

async function endElection() {
    await electionContract.methods.endElection().send({ from: currentAccount });
    alert("Election ended.");
    const winner = await electionContract.methods.winnerDetails().call();
    document.getElementById('winner').innerText = `Winner: ${winner[0]} (${winner[1]}) with ${winner[2]} votes`;
}

async function voteCandidate(candidateId) {
    await electionContract.methods.vote(candidateId).send({ from: currentAccount });
    alert("Vote cast successfully!");
    await loadCandidates();
}
