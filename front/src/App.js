import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//import des pages du site
import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'
import Profil from './pages/profil';
import AdminBoutique from './pages/admin_boutique';
import AdminUser from './pages/admin_user';
import Admin from './pages/admin';
import Boutique from './pages/boutique'
import Product from './pages/product_id';
import AboutMe from './pages/aboutme'
import Visuel from './pages/visuel';

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
          <Route exact path={'/admin'} element={<Admin />}></Route>
          <Route exact path={'/boutique'} element={<Boutique />}></Route>
          <Route exact path={'/aboutme'} element={<AboutMe />}></Route>
          <Route path={'/boutique/:id'} element={<Product />}></Route>
          <Route path={'/visuel'} element={<Visuel />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
