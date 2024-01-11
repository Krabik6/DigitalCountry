// // import { Link, useSearchParams } from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import {Link, useLocation, useParams, useNavigate} from "react-router-dom";
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
    const {pageNumber} = useParams();
    const {pathname} = useLocation();
    const navigate = useNavigate();

    const [st, setSt] = useState({
        countryName: "",
        countryGeneration: 0,
        currentGovernmentAddress: "",
        currentGovernmentName: "",
    });

    const [items, setItems] = useState([]);



    const pageNumberInt = parseInt(pageNumber);
    const doRedirect = isNaN(pageNumberInt) || pageNumberInt.toString().length !== pageNumber.length;

    useEffect(() => {
        if(doRedirect) {
            navigate(pathname.slice(0, pathname.length - pageNumber.length) + '1', {replace: true});
        } else {
            window.blockchain.getInfo().then(info => {
                setSt(info);
            });

            window.blockchain.getNews(pageNumberInt).then(news => {
                setItems(news);
            });
        }
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
