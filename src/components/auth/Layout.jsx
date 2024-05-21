import { Outlet, Link } from "react-router-dom";
import "../styles/Layout.css"; 
import Footer from '../Footer'
const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/signin">SignIn</Link>
          </li>
          <li>
            <Link to="/signup">SignUp</Link>
          </li>
        </ul>
      </nav>
      <div>
      </div>
      <Outlet />
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      
      <Footer />
    </>
  )
};

export default Layout;