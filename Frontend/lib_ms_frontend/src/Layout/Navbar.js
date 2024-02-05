import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IconContext } from "react-icons";
import '../Home/style.css';

export default function Navbar(){
  
    return(
  <IconContext.Provider value={{size:"1.5em"}}>
  <nav className="navbar navbar-expand-lg">
    <div className="container-fluid">
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
        <Link className="nav-link" aria-current="page" to={"/"}><FaHome /> Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={"/addbook"}><IoMdAddCircleOutline /> Add Book</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
</IconContext.Provider>
    )
}