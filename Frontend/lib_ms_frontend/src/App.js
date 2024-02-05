import './App.css';
import Navbar from './Layout/Navbar';
import Home from './Home/Home';
import ViewBook from './Books/ViewBook';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import AddBook from './Books/AddBook';
import EditBook from './Books/EditBook';

function App() {
  return (
    <div className="App">

      <Router>

      <Navbar/>

      <Routes>
        <Route exact path="/"element={<Home/>}/>
        <Route exact path="/viewbook/:id"element={<ViewBook/>}/>
        <Route exact path="/addbook"element={<AddBook/>}/>
        <Route exact path="/editbook/:id"element={<EditBook/>}/>

      </Routes>

      </Router>
     
    </div>
  );
}

export default App;
