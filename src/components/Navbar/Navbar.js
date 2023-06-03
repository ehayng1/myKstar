import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css"

export const Navbar = function () {
  const navigate = useNavigate()
  return (
    <div className="navBar">
      <nav>
        <NavLink to={"/"} className={"Links"}>
          <h1>My K Star</h1>
        </NavLink>
        <NavLink to={"/"} className={"Links"}>
          {" "}
          Home{" "}
        </NavLink>
        <NavLink to={"/scoreboard"} className={"Links"}>
          {" "}
          Scoreboard{" "}
        </NavLink>
        <NavLink to={"/dictionary"} className={"Links"}>
          {" "}
          Dictionary{" "}
        </NavLink>
        <NavLink to={"/learn"} className={"Links"}>
          {" "}
          Learn{" "}
        </NavLink>
        <button onClick={function () {
          localStorage.removeItem("user");
          navigate("/login")
        }}>Logout</button>
      </nav>
      <hr className="navbar-divider" />
    </div>
  );
};
