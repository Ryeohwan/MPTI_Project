import './App.css';
import CustomerHeader from './components/Header/CustomerHeader';
import TrainerHeader from './components/Header/TrainerHeader';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      {/* <TrainerHeader/> */}
      <CustomerHeader/>
      <Home/>
    </div>
  );
}

export default App;
