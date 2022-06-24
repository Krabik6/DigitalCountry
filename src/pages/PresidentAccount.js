// import { Link } from 'react-router-dom';
import logo from '../belos.jpg';
import {useState} from 'react';
import {ethers} from 'ethers';
import countryAbi from '../artifacts/contracts/DigitalCountry.sol/DigitalCountry.json';
import formAbi from '../artifacts/contracts/DigitalCountry.sol/BoeingFormOfGovernment.json'

const PresidentAccount = () => {

    // const [newName, setName] = useState();
    const countryAddress = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9"
    const formAddress = "0x856e4424f806D16E8CBC702B3c0F2ede5468eae5"

    async function requestAccount() {
        await window.ethereum.request({method: 'eth_requestAccounts'});
    }

    const [userName, setUserName] = useState()

    async function getUserName() { //Надо в кэш записывать
        requestAccount()
        if (typeof window.ethereum !== 'undefined') {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const country = new ethers.Contract(countryAddress, countryAbi.abi, provider)
            try {
                const name = await country.getMsgUser()
                setUserName(name)

            } catch (err) {
                console.log("Error: ", err)
            }
        }
    }

    getUserName()

    const [newUserAddress, setNewUserAddress] = useState()
    const [newUserName, setNewUserName] = useState()
    const [newUserType, setNewUserType] = useState()
    const [newUserBool, setNewUserBool] = useState()

    async function addUser() {
        if (typeof window.ethereum !== 'undefined') {
            await requestAccount()
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner()
            const contract = new ethers.Contract(formAddress, formAbi.abi, signer)
            const transaction = await contract.addUser(newUserAddress, newUserName, Number(newUserType), Boolean(newUserBool))

            await transaction.wait()
        }
    }

    const [newGovernmentAddress, setNewGovernmentAddress] = useState()
    const [newGovernmentName, setNewGovernmentName] = useState()
    const [kill, setNewKill] = useState() //вмето да - нет можно сделать кнопочку рычажок
    async function changeGovernment() {
        if (typeof window.ethereum !== 'undefined') {
            await requestAccount()
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner()
            const contract = new ethers.Contract(formAddress, formAbi.abi, signer)
            const transaction = await contract.changeGovernment(newGovernmentAddress, newGovernmentName, Boolean(kill))
            //   address newGovernment,
            //   string calldata newGovernmentName,
            //   bool killFreeSpeech
            await transaction.wait()
        }
    }


    return (
        <div className='account-main'>
            <div className='account-nft-name'>
                <div className='account-nft-name-border'>
                    <img src={logo} alt={'logo'}/>
                    <h1>{userName}</h1>
                </div>
                <div className='change'>
                    <button onClick={() => addUser()}>addUser</button>
                    <input className='input-change' onChange={e => setNewUserAddress(e.target.value)}
                           placeholder="address"/>
                    <input className='input-change' onChange={e => setNewUserName(e.target.value)}
                           placeholder="New name"/>
                    <input className='input-change' onChange={e => setNewUserType(e.target.value)} placeholder="type"/>
                    <input className='input-change' onChange={e => setNewUserBool(e.target.value)} placeholder="bool"/>
                </div>
                <div className='change'>

                    <button onClick={() => changeGovernment()}>addUser</button>

                    <input className='input-change' onChange={e => setNewGovernmentAddress(e.target.value)}
                           placeholder="address"/>
                    <input className='input-change' onChange={e => setNewGovernmentName(e.target.value)}
                           placeholder="name"/>
                    <input className='input-change' onChange={e => setNewKill(e.target.value)} placeholder="bool"/>
                </div>

            </div>
            <div className='account-inner'>
                <h1>Personal account</h1>
                <h2>
                    Unite a group of people and give them the opportunity to change the
                    rules on the go.
                </h2>
                <h3>Add a citizen</h3>
                <h3>Delete a citizen</h3>
                <h3>Change from of goverment</h3>
            </div>
        </div>
    );
};

export {PresidentAccount};
