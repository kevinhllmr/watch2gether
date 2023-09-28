import '../../App.css';
import './NotFound.css';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className='hero-container'>

      <img src={process.env.PUBLIC_URL + '/images/homebg.jpg'} alt='background home projector cinema' />

      <h2 id='roomnotfound'></h2>

      <Link
        to='/room-list/'
        id='joinroombtn404'
      >
        Join Room
      </Link><br /><br />

      <p id='notice'>Das Projekt ist an der HS Anhalt und unter der Aufsicht von Toni Barth entstanden.</p>

    </div>
  );
}

export default NotFound;