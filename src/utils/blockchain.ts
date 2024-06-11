// src/utils/blockchain.ts
import Web3 from 'web3';
import {connectMetaMask} from './connectMetaMask';
import { updateContractStatus } from './updateContractStatus';

// const contractAddress = '0x57Fc48D4bED4d2D8299FA43BF7233783831e28cC';
const contractABI = [
    // The ABI from your smart contract
    {
        "inputs": [
            { "internalType": "address", "name": "_developer", "type": "address" }
        ],
        "stateMutability": "payable",
        "type": "constructor"
    },
    {
        "inputs": [],
        "name": "approveWork",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "cancelContract",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "client",
        "outputs": [
            { "internalType": "address", "name": "", "type": "address" }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "clientApproved",
        "outputs": [
            { "internalType": "bool", "name": "", "type": "bool" }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "confirmWork",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "developer",
        "outputs": [
            { "internalType": "address", "name": "", "type": "address" }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "paymentAmount",
        "outputs": [
            { "internalType": "uint256", "name": "", "type": "uint256" }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "state",
        "outputs": [
            { "internalType": "enum FreelancePlatform.State", "name": "", "type": "uint8" }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "submitWork",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "workCompleted",
        "outputs": [
            { "internalType": "bool", "name": "", "type": "bool" }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];
const contractBytecode = '6080604052604051610cb7380380610cb783398181016040528101906100259190610139565b335f806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508060015f6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550346002819055505f600360026101000a81548160ff021916908360038111156100d0576100cf610164565b5b021790555050610191565b5f80fd5b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f610108826100df565b9050919050565b610118816100fe565b8114610122575f80fd5b50565b5f815190506101338161010f565b92915050565b5f6020828403121561014e5761014d6100db565b5b5f61015b84828501610125565b91505092915050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52602160045260245ffd5b610b198061019e5f395ff3fe608060405234801561000f575f80fd5b506004361061009c575f3560e01c8063c19d93fb11610064578063c19d93fb1461010e578063c35905c61461012c578063c7a257771461014a578063ca4b208b14610154578063ddb3a532146101725761009c565b8063109e94cf146100a05780632b68bb2d146100be578063396dbdc8146100c85780637fadf50e146100d2578063843cf81e146100f0575b5f80fd5b6100a861017c565b6040516100b5919061082a565b60405180910390f35b6100c661019f565b005b6100d0610332565b005b6100da610463565b6040516100e7919061085d565b60405180910390f35b6100f8610475565b604051610105919061085d565b60405180910390f35b610116610488565b60405161012391906108e9565b60405180910390f35b61013461049b565b604051610141919061091a565b60405180910390f35b6101526104a1565b005b61015c6105c4565b604051610169919061082a565b60405180910390f35b61017a6105e9565b005b5f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b5f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461022c576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102239061098d565b60405180910390fd5b5f8060038111156102405761023f610876565b5b600360029054906101000a900460ff16600381111561026257610261610876565b5b146102a2576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610299906109f5565b60405180910390fd5b60038060026101000a81548160ff021916908360038111156102c7576102c6610876565b5b02179055505f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc4790811502906040515f60405180830381858888f1935050505015801561032e573d5f803e3d5ffd5b5050565b5f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146103bf576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103b69061098d565b60405180910390fd5b5f8060038111156103d3576103d2610876565b5b600360029054906101000a900460ff1660038111156103f5576103f4610876565b5b14610435576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161042c906109f5565b60405180910390fd5b6001600360026101000a81548160ff0219169083600381111561045b5761045a610876565b5b021790555050565b60035f9054906101000a900460ff1681565b600360019054906101000a900460ff1681565b600360029054906101000a900460ff1681565b60025481565b60015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610530576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161052790610a5d565b60405180910390fd5b600180600381111561054557610544610876565b5b600360029054906101000a900460ff16600381111561056757610566610876565b5b146105a7576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161059e906109f5565b60405180910390fd5b600160035f6101000a81548160ff02191690831515021790555050565b60015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b5f8054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610676576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161066d9061098d565b60405180910390fd5b600180600381111561068b5761068a610876565b5b600360029054906101000a900460ff1660038111156106ad576106ac610876565b5b146106ed576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106e4906109f5565b60405180910390fd5b60035f9054906101000a900460ff1661073b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161073290610ac5565b60405180910390fd5b6001600360016101000a81548160ff0219169083151502179055506002600360026101000a81548160ff0219169083600381111561077c5761077b610876565b5b021790555060015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc60025490811502906040515f60405180830381858888f193505050501580156107e7573d5f803e3d5ffd5b5050565b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f610814826107eb565b9050919050565b6108248161080a565b82525050565b5f60208201905061083d5f83018461081b565b92915050565b5f8115159050919050565b61085781610843565b82525050565b5f6020820190506108705f83018461084e565b92915050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52602160045260245ffd5b600481106108b4576108b3610876565b5b50565b5f8190506108c4826108a3565b919050565b5f6108d3826108b7565b9050919050565b6108e3816108c9565b82525050565b5f6020820190506108fc5f8301846108da565b92915050565b5f819050919050565b61091481610902565b82525050565b5f60208201905061092d5f83018461090b565b92915050565b5f82825260208201905092915050565b7f4f6e6c7920636c69656e742063616e2063616c6c20746869732e0000000000005f82015250565b5f610977601a83610933565b915061098282610943565b602082019050919050565b5f6020820190508181035f8301526109a48161096b565b9050919050565b7f496e76616c69642073746174652e0000000000000000000000000000000000005f82015250565b5f6109df600e83610933565b91506109ea826109ab565b602082019050919050565b5f6020820190508181035f830152610a0c816109d3565b9050919050565b7f4f6e6c7920646576656c6f7065722063616e2063616c6c20746869732e0000005f82015250565b5f610a47601d83610933565b9150610a5282610a13565b602082019050919050565b5f6020820190508181035f830152610a7481610a3b565b9050919050565b7f576f726b206e6f7420636f6d706c657465642e000000000000000000000000005f82015250565b5f610aaf601383610933565b9150610aba82610a7b565b602082019050919050565b5f6020820190508181035f830152610adc81610aa3565b905091905056fea264697066735822122048c4f5a7b46ff1706dd44a53752c02302ac1e2ccb66a403a96bb75501ce13c2b64736f6c634300081a0033'

export const deployContract = async (developerAddress: string, paymentAmount: string) => {
    try {
        await connectMetaMask();
        const accounts = await window.web3.eth.getAccounts();
        const contract = new window.web3.eth.Contract(contractABI);

        const deployedContract = await contract.deploy({
            data: contractBytecode,
            arguments: [developerAddress]
        })
            .send({
                from: accounts[0],
                value: window.web3.utils.toWei(paymentAmount, 'ether'),
                gas: '15000000',
                gasPrice: '30000000000'
            });

        console.log('Contract deployed at address:', deployedContract.options.address);
        return deployedContract.options.address;
    } catch (error) {
        console.error('Error deploying contract:', error);
        // @ts-ignore
        alert(`Error deploying contract: ${error.message}`);
        return null;
    }
};

export const approveWork = async (contractAddress: string) => {
    try {
        await connectMetaMask();
        const accounts = await window.web3.eth.getAccounts();
        const contract = new window.web3.eth.Contract(contractABI, contractAddress);

        const receipt = await contract.methods.approveWork().send({
            from: accounts[0],
            gas: '150000',
            gasPrice: '30000000000'
        });

        console.log('Work approved:', receipt);
        return receipt;
    } catch (error) {
        console.error('Error approving work:', error);
        // @ts-ignore
        alert(`Error approving work: ${error.message}`);
        return null;
    }
};

export const submitWork = async (contractAddress: string) => {
    try {
        await connectMetaMask();
        const accounts = await window.web3.eth.getAccounts();
        const contract = new window.web3.eth.Contract(contractABI, contractAddress);

        const receipt = await contract.methods.submitWork().send({
            from: accounts[0],
            gas: '150000',
            gasPrice: '30000000000'
        });

        console.log('Work submitted:', receipt);
        return receipt;
    } catch (error) {
        console.error('Error submitting work:', error);
        // @ts-ignore
        alert(`Error submitting work: ${error.message}`);
        return null;
    }
};

export const cancelContract = async (contractAddress: string) => {
    try {
        await connectMetaMask();
        const accounts = await window.web3.eth.getAccounts();
        const contract = new window.web3.eth.Contract(contractABI, contractAddress);

        // Log the current state
        const currentState = await contract.methods.state().call();
        console.log('Current contract state:', currentState);

        // Check if the current state allows cancellation
        // @ts-ignore
        if (currentState !== '0') { // Assuming '0' is the State.Created
            console.error('Contract cannot be cancelled in the current state.');
            alert('Contract cannot be cancelled in the current state.');
            return null;
        }

        const receipt = await contract.methods.cancelContract().send({
            from: accounts[0],
            gas: '150000',
            gasPrice: '30000000000'
        });

        console.log('Contract cancelled:', receipt);
        return receipt;
    } catch (error) {
        console.error('Error cancelling contract:', error);
        // @ts-ignore
        alert(`Error cancelling contract: ${error.message}`);
        return null;
    }
};

export const confirmWork = async (contractAddress: string) => {
    try {
        const accounts = await window.web3.eth.getAccounts();
        const contract = new window.web3.eth.Contract(contractABI, contractAddress);

        const receipt = await contract.methods.confirmWork().send({
            from: accounts[0],
            gas: '150000',
            gasPrice: '30000000000'
        });

        console.log('Work confirmed:', receipt);
        return receipt;
    } catch (error) {
        console.error('Error confirming work:', error);
        // @ts-ignore
        alert(`Error confirming work: ${error.message}`);
        return null;
    }
};