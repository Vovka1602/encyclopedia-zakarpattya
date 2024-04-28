import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import HomePageUnregistered from './pages/HomePage/HomePageUnregistered';
import SignupPage from './pages/SignupPage/SignupPage';
import LoginPage from './pages/LoginPage/LoginPage';
import LocationInfoPage from './pages/LocationInfoPage/LocationInfoPage';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path='/welcome' element={ <HomePageUnregistered/> }></Route>
                <Route path='/' element={ <HomePage/> }></Route>
                <Route path='/signup' element={ <SignupPage/> }></Route>
                <Route path='/login' element={ <LoginPage/> }></Route>
                <Route path='/locationinfo/:id' element={ <LocationInfoPage/> }></Route>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
