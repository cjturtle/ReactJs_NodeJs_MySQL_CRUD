import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [auth, setAuth] = useState(false);
  const [na_me, setNa_me] = useState("");
  const [message, setMessage] = useState("");

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get("http://localhost:3001/").then((res) => {
      console.log(res);
      if (res.data.Status === "Success") {
        setAuth(true);
        setNa_me(res.data.name);
      } else {
        setAuth(false);
        setMessage(res.data.Message);
      }
    });
  });

  const navigate = useNavigate();
  const handleLogout = () => {
    axios
      .get("http://localhost:3001/logout")
      .then((res) => {
        if (res.data.Status === "Success") {
          navigate("/");
        } else {
          alert("Error");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="">
      <nav className="navbar bg-success ">
        {auth ? (
          <div className="container-fluid d-flex py-2  ">
            <div className="d-flex  ms-4 gap-5">
              <Link
                className="text-light link-warning  text-decoration-none"
                to="/read"
              >
                <h5> LEE Systems Technology Ventures EXAM</h5>
              </Link>
              <Link
                className="btn btn-outline-warning link-light btn-sm text-decoration-none"
                to="/create"
              >
                Add Employee
              </Link>
            </div>
            <div className="d-flex gap-4">
              <button
                className="btn btn-outline-warning link-light btn-sm mx-3"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className="container d-flex justify-content-center my-2">
            <Link
              className="text-light link-warning  text-decoration-none"
              to="/read"
            >
              <h5> LEE Systems Technology Ventures EXAM</h5>
            </Link>
            <h1> </h1>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
