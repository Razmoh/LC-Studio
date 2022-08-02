import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//import des pages du site
import Home from './pages/home'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
