import './App.css';
import { ApplicationRouter } from './router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Header } from './components/common';

function App() {
  return (
    <div className="App">
      <Header />
      <ToastContainer />
      <ApplicationRouter />
    </div>
  );
}

export default App;
