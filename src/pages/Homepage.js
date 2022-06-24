import {Link} from 'react-router-dom';

const Homepage = () => {
    return (
        <div className="mt-[37%] text-2xl">

            <h1 className="font-bold text-6xl">
                Digital country
            </h1>
            <p className="mt-8 text-center">
                Unite a group of people and give them the opportunity to change the
                rules on the go.
            </p>

            <p className="mt-20">
                Learn more or see <Link to="/statistics">statistics</Link>
            </p>


        </div>
    );
};

export {Homepage};
