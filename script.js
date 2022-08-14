window.ethereum.enable();
const provider = new ethers.providers.Web3Provider(window.ethereum, "ropsten");

let MoodContractAddress = "0xC4508Cb504808eE20dE5352eDd130b314d56c380";
let MoodContractABI = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_mood",
                "type": "string"
            }
        ],
        "name": "setMood",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getMood",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

let MoodContract;
let signer;

provider.send("eth_requestAccounts", []).then(() => {
    provider.listAccounts().then((accounts) => {
        signer = provider.getSigner(accounts[0]);
        MoodContract = new ethers.Contract(
        MoodContractAddress,
        MoodContractABI,
        signer
        );
    });
});

async function getMood(){
    console.log("GetMood")
    const getMoodPromise = MoodContract.getMood()
    const Mood = await getMoodPromise;
    console.log(Mood);
}

async function setMood(){
    console.log("setMood")
    const mood = document.getElementById("mood").value;
    const setMoodPromise = MoodContract.setMood(mood);
    await setMoodPromise;
}


