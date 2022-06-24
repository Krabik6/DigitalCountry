import {useState} from 'react';

export const Statistics = () => {
    // async function requestAccount() {
    //   await window.ethereum.request({ method: 'eth_requestAccounts' });
    // }
    const [st, setSt] = useState({
        countryName: "",
        countryGeneration: 0,
        currentGovernmentAddress: "",
        currentGovernmentName: "",
    })

    window.blockchain.getInfo().then(info => {
        setSt(info);
    });

    const label = (name, text) => (
        <div className="flex items-center pb-2">
            <div className="font-semibold mr-5 text-3xl capitalize">
                {name}
            </div>
            <div className="text-2xl">
                {String(text)}
            </div>
        </div>
    );

    return (
        <div>
            <h1 className='text-7xl font-bold mb-10'>Country statistics</h1>

            {label("Country name", st.countryName)}
            {label("government name", st.currentGovernmentName)}

            {label("generation", st.countryGeneration)}
            {/*todo!!!!*/}
            {label("population", 1)}

            {/* <Routes>
            <Route path="contacts" element={<p>Our contact</p>} />
            <Route path="team" element={<p>Our team</p>} />
        </Routes> */}
        </div>
    );
};