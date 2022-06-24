import { Link } from 'react-router-dom';
import logo from '../hunter.jpg';
import { useState } from 'react';
import { ethers } from 'ethers';
import countryAbi from '../artifacts/contracts/DigitalCountry.sol/DigitalCountry.json';

const Account = () => {
  // const [newName, setName] = useState();
  const countryAddress = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9"
  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }
  const [userName, setUserName] = useState()

  async function getCountryName() { //Надо в кэш записывать
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const country = new ethers.Contract(countryAddress, countryAbi.abi, provider)
      try {
        const name = await country.getMsgUser()
        setUserName(name)
        console.log(name)

      } catch (err) {
        console.log("Error: ", err)
      }
    }    
  }
  getCountryName()

  return (
    <div className='account-main'>
      <div className='account-nft-name'>
        <div className='account-nft-name-border'>
          <img src={logo} alt={'logo'} />
          <h1>{userName}</h1>
        </div>
        {/* <button onClick={() => changeName()}>Change name</button> */}
        {/* <input
          className='addu'
          onChange={(e) => setName(e.target.value)}
          placeholder='New name'
        /> */}
      </div>
      <div className='account-inner'>
        <h1>Personal account</h1>
        <h2>
          Unite a group of people and give them the opportunity to change the
          rules on the go.
        </h2>
        <Link to='/about'>
          <h3>About</h3>
        </Link>
      </div>
    </div>
  );
};

export { Account };
