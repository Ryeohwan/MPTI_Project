import { Route, Routes } from 'react-router-dom';
import './App.css';
import CustomerHeader from './components/Header/CustomerHeader';
import TrainerHeader from './components/Header/TrainerHeader';
import Home from './pages/Common/Home';
import TrainerMyClient from './pages/Trainer/TrainerMyClient';
import TrainerMyPage from './pages/Trainer/TrainerMyPage';
import TrainerMyReservation from './pages/Trainer/TrainerMyReservation';
import ClientMyLog from './pages/Client/ClientMyLog';
import ClientMyPage from './pages/Client/ClientMyPage';
import ClientMyReservation from './pages/Client/ClientMyReservation';
import ClientMySchdule from './pages/Client/ClientMySchdule';


function App() {
  return (
    <div className="App">
      {/* <TrainerHeader/> */}
      <CustomerHeader/>

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/TrainerMyPage' element={<TrainerMyPage/>}/>
        <Route path='/TrainerMyClient' element={<TrainerMyClient/>}/>
        <Route path='/TrainerMyReservation' element={<TrainerMyReservation/>}/>

        <Route path='/ClientMyLog' element={<ClientMyLog/>}/>
        <Route path='/ClientMyPage' element={<ClientMyPage/>}/>
        <Route path='/ClientMyReservation' element={<ClientMyReservation/>}/>
        <Route path='/ClientMySchdule' element={<ClientMySchdule/>}/>
      </Routes>

     
      
    </div>
  );
}

export default App;
