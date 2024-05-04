import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    axios
      .post("http://localhost:3001/login", values)
      .then((res) => {
        if (res.data.Status === "Success") {
          navigate("/read");
        } else {
          alert(res.data.Message);
        }
      })
      .then((err) => console.log(err));
  };
  return (
    <div className="d-flex justify-content-center ">
      <div className="border border-dark rounded d-flex justify-content-around 5 w-75 my-5 p-5">
        <div className=" d-flex flex-column justify-content-center  gap-5">
          <h5>LSTV DOCUMENTATON PORTAL</h5>
          <h5 className="text-center ">LSTV PROJECT EXAM</h5>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="px-5 py-3 container">
            <div className="d-flex flex-column gap-4 ">
              <h2 className="text-center">Login</h2>

              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control border border-dark"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  onChange={(e) =>
                    setValues({ ...values, email: e.target.value })
                  }
                />
                <div id="emailHelp" className="form-text">
                  We'll never share your Username with anyone else.
                </div>
              </div>

              <div className="mb">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control border border-dark"
                  id="exampleInputPassword1"
                  onChange={(e) =>
                    setValues({ ...values, password: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="row justify-content-end ">
              <button className="btn btn-success btn-sm mt-4 w-50 ">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
