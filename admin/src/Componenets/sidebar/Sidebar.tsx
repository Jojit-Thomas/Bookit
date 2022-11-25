import "./sidebar.css";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import StoreIcon from "@mui/icons-material/Store";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Book from "@mui/icons-material/Book"
import { Link } from "react-router-dom";
// import { DarkModeContext } from "../../context/darkModeContext";
// import { useContext } from "react";
// import Swal from 'sweetalert2'
const handleLogout = () => {
  // Swal.fire({
  //   title: 'Do you want to logout?',
   
  //   showCancelButton: true,
  //   confirmButtonText: 'Yes',
  
  //   customClass: {
  //     actions: 'my-actions',
  //     cancelButton: 'order-1 right-gap',
  //     confirmButton: 'order-2',
     
  //   }
  // })

};
const Sidebar = () => {
  // const { dispatch } = useContext(DarkModeContext);
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Bookit</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/bus" style={{ textDecoration: "none" }}>
            <li>
              <Book className="icon" />
              <span>All Bus</span>
            </li>
          </Link>
          <Link to="/bus/add" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Add Bus</span>
            </li>
          </Link>
          <p className="title">USER</p>
          <li onClick={()=>{handleLogout()}}>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      {/* <div className="bottom">
        <div
          className="colorOption"
          // onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          // onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div> */}
    </div>
  );
};

export default Sidebar;
