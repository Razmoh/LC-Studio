import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//import des pages du site
import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'
import Profil from './pages/profil';
import AdminBoutique from './pages/admin_boutique';
import AdminUser from './pages/admin_user';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />}></Route>
          <Route exact path='/login' element={<Login />}></Route>
          <Route exact path='/register' element={<Register />}></Route>
          <Route exact path='/profil' element={<Profil />}></Route>
          <Route exact path={'/admin_boutique'} element={<AdminBoutique />}></Route>
          <Route exact path={'/admin_user'} element={<AdminUser />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
