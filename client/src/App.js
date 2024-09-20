
import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import DatingForm from './datingForm';
import HomePage from './homePage';
import ReadyToDatePage from './hover';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/form' element={<DatingForm/>}/>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/hover' element={<ReadyToDatePage/>}/>
               </Routes>
      </Router>
    </div>
  );
}

export default App;
