import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './Loginpage/Login';
import Signup from './Signuppage/Signup';
import Mainpage from './Mainpage/Mainpage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<Mainpage/>}></Route>
          <Route  exact path='/login' element={<Login/>}></Route>
          <Route exact path="/signup" element={<Signup/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
