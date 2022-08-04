import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//import des pages du site
import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />}></Route>
          <Route exact path='/login' element={<Login />}></Route>
          <Route exact path='/register' element={<Register />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
