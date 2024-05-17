import './App.css';
import './components/Buttons.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import SignupPage from './pages/SignupPage/SignupPage';
import LoginPage from './pages/LoginPage/LoginPage';
import LocationInfoPage from './pages/LocationInfoPage/LocationInfoPage';
import WelcomePage from './pages/HomePage/WelcomePage';
import LikesPage from './pages/LikesPage/LikesPage';

function App() {
  return (
    <div className="App">
        <img className='backdrop' src={require(".//components/backdrop.png")} alt='background'></img>
        <BrowserRouter>
            <Routes>
                <Route path='/welcome' element={ <WelcomePage/> }></Route>
                <Route path='/' element={ <HomePage/> }></Route>
                <Route path='/likes' element={ <LikesPage/> }></Route>
                <Route path='/signup' element={ <SignupPage/> }></Route>
                <Route path='/login' element={ <LoginPage/> }></Route>
                <Route path='/locationinfo/:id' element={ <LocationInfoPage/> }></Route>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
