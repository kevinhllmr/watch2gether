import '../../App.css';
import './Help.css';
import { useNavigate } from 'react-router-dom';

function Help() {
  let navigate = useNavigate();

    return (
        <div className='hero-container'>

      <img src={process.env.PUBLIC_URL + '/images/homebg.jpg'} alt='background home projector cinema' />

      <button
        id='helpbtn'
        onClick={() => navigate('/home/')}
      >
        <p>Home</p>
      </button>

      <h2 id='help'></h2>
      <br />
      <h3 id='controls'></h3>

    <p id='notice'></p>

    </div>
    );
}

export default Help;