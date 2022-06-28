// // import { Link, useSearchParams } from 'react-router-dom';
import React, {useState} from 'react';

import {Link} from "react-router-dom";
import {NewsItem} from "../../components/NewsItem";


// const scouts = ["levi", "hange", "erwin", "petra", "oruo", "miche"]
// const page = 1;
// const contentPerPage = 3
// const lastIndex = page * contentPerPage // 3
// const firstIndex = lastIndex - contentPerPage // 0
// scouts.slice(firstIndex, lastIndex)

// const NewsPage = () => {
//     //
//     return (
//         <div>
//             <h1>Our news</h1>

//         </div>
//     )
// }

// export {NewsPage}

const NewsPage = () => {
    const [st, setSt] = useState({
        countryName: "",
        countryGeneration: 0,
        currentGovernmentAddress: "",
        currentGovernmentName: "",
    });

    const [items, setItems] = useState([]);


    window.blockchain.getInfo().then(info => {
        setSt(info);
    });



    return (
        <div className="mt-8 text-2xl">

            <h1 className="font-bold text-6xl">
                Blog of {st.currentGovernmentName} Government
            </h1>


            <ul className="divide-y divide-slate-100">
                {items.map(item => (
                    <NewsItem item={item} />
                ))}
            </ul>
        </div>
    );
};

export {NewsPage};
