import logo from './logo.svg';
import './App.css';
import ContainerArea from './components/ContainerArea';
import { LocationProvider } from './context/LocationContext';

function App() {
  return (
    <div className="App">
      <LocationProvider>
        <ContainerArea />
      </LocationProvider>
    </div>
  );
}

export default App;
