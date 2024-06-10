import Web3 from 'web3';

declare global {
    interface Window {
        web3: Web3;
    }
}

export const connectMetaMask = async () => {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const accounts = await window.web3.eth.getAccounts();
            console.log("MetaMask connected");
            return accounts[0]; // Return the connected account address
        } catch (error) {
            console.error("User denied account access", error);
            alert("User denied account access");
            return null;
        }
    } else {
        console.error("MetaMask not found. Please install MetaMask.");
        alert("MetaMask not found. Please install MetaMask.");
        return null;
    }
};
