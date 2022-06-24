import { Link } from 'react-router-dom';

const Homepage = () => {
  return (
    <div className='homepage-main'>
      <div className='homepage-inner'>
        <h1>Digital country</h1>
        <h2>
          Unite a group of people and give them the opportunity to change the
          rules on the go.
        </h2>
        <h2>
          information about mechanisms of digital country//
        </h2>

        <Link to="/about"><h3>About</h3></Link>
      </div>
    </div>
  );
};

export { Homepage };
