import { Outlet, Link } from 'react-router-dom';
import { ethers } from 'ethers';
import countryAbi from '../artifacts/contracts/DigitalCountry.sol/DigitalCountry.json'
import { useState } from 'react';

// const nameOfGovermens = 'DigitalCountry';
const numOfMembers = 123;
const presidentName = ['Leva,', ' ', 'Andrey'];

const countryAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"

const  About = () => {
  // async function requestAccount() {
  //   await window.ethereum.request({ method: 'eth_requestAccounts' });
  // }
  const [countryName, setcountryName] = useState()
    const [version, setVersion] = useState()
    const [address, setAddress] = useState()
  async function getCountryName() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const country = new ethers.Contract(countryAddress, countryAbi.abi, provider)
      try {
        const cName = await country.getCountryName()
        setcountryName(cName)

        const cAddress = await country.getFormAddress()
        setAddress(cAddress)
        
        const cVersion = await country.getCountryVersion()
        setVersion( Number(cVersion))
      } catch (err) {
        console.log("Error: ", err)
      }
    }    
  }
  getCountryName()


  return (
    <div className='aboutpage-main'>
      <div className='aboutpage-inner'>
        <h1>Current form of goverment</h1>
        <h2>Name: {countryName}</h2>
        <h2>Version: {version}</h2>
        <h2>Address: {address}</h2>
        <h2>Number of members: {numOfMembers}</h2>
        <h2>President(s): {presidentName}</h2>
        <Link to='/posts'>
          <h3 id='link-to-blog'>Blog</h3>
        </Link>
        {/* <button onClick={() => requestAccount()}>connect</button> */}

        {/* <Routes>
                <Route path="contacts" element={<p>Our contact</p>} />
                <Route path="team" element={<p>Our team</p>} />
            </Routes> */}
        <Outlet />
      </div>
    </div>
  );
};

export { About };
