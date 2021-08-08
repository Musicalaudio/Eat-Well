import { Link } from "react-router-dom"

const NavMenu = () => {
    return (
      <nav className="nav nav-menu">
          <ul className="nav-list" style={{width: "100%"}}>
              <li className="nav-list-item">
                  <Link className="nav-link">Diets</Link>
              </li>
              <li className="nav-item">
                  <Link className="nav-link">Cuisine</Link>
              </li>
              <li className="nav-item">
                  <Link className="nav-link"> Meal Plan </Link>
              </li>
              <li className="nav-item">
                  <Link className="nav-link"> Wine </Link>
              </li>
              <li className="nav-item">
                  <Link className="nav-link"> Random Recipe </Link>
              </li>
              <li className="nav-item"> 
                  <Link className="nav-link"> Shopping List </Link> 
              </li>
          </ul>
      </nav>
    );
}
 
export default NavMenu;