import '../../App.css';
import './Help.css';
import { Link } from 'react-router-dom';

function Help() {
    return (
        <div className='hero-container'>

      <img src={process.env.PUBLIC_URL + '/images/homebg.jpg'} alt='background home projector cinema' />

      <h2 id='help'></h2>
      <br />
      <h3 id='controls'></h3>

    <p id='notice'></p>

    </div>
    );
}

export default Help;