import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";

const Home = () => {
  const [auth, setAuth] = useState(false);
  const [na_me, setNa_me] = useState("");
  const [message, setMessage] = useState("");

  const [datas, setDatas] = useState([]);
  const reloadPage = () => {
    window.location.reload();
  };

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get("http://localhost:3001/").then((res) => {
      console.log(res);
      if (res.data.Status === "Success") {
        setDatas(res.data.result);
        setAuth(true);
        setNa_me(res.data.name);
      } else {
        setAuth(false);
        setMessage(res.data.Message);
      }
    });
  }, []);

  const handleDelete = (id) => {
    window.location.reload();
    axios.delete("http://localhost:3001/" + id).then((response) => {
      if (response.ok) {
        alert("Delete Successfully");
      }
    });
  };

  function calculateAge(birthDate) {
    var birthDateObj = new Date(birthDate);
    var currentDate = new Date();
    var age = currentDate.getFullYear() - birthDateObj.getFullYear();

    if (
      currentDate.getMonth() < birthDateObj.getMonth() ||
      (currentDate.getMonth() === birthDateObj.getMonth() &&
        currentDate.getDate() < birthDateObj.getDate())
    ) {
      age--;
    }

    return age;
  }
  console.log(datas);
  return (
    <div>
      {auth ? (
        <div className="container-fluid d-flex flex-column px-5 py-3 ">
          <table className="table border">
            <thead>
              <tr>
                <th>Record Id</th>
                <th>Employee Full Name</th>
                <th>Address</th>
                <th>Birth Date</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Civil Status</th>
                <th>Contact No.</th>
                <th>Salary</th>
                <th>Active</th>
                <th>Action</th>
              </tr>
            </thead>
            {datas &&
              datas.map((data) => (
                <tbody>
                  <tr>
                    <th>{data.recid}</th>
                    <td>{data.fullname}</td>
                    <td>{data.address}</td>
                    <td>{moment(data.birthdate).format("LL")}</td>
                    <td>
                      {calculateAge(
                        moment(data.birthdate).format("YYYY-MM-DD")
                      )}
                    </td>
                    <td>{data.gender}</td>
                    <td>{data.civilstat}</td>
                    <td>{data.contactnum}</td>
                    <td>{data.salary}</td>
                    <td>{data.isactive}</td>
                    <td className="d-flex gap-3">
                      <Link
                        to={`/details/${data.recid}`}
                        className="btn btn-info btn-sm my-2"
                      >
                        READ
                      </Link>
                      <Link
                        to={`/update/${data.recid}`}
                        className="btn btn-warning btn-sm my-2"
                      >
                        UPDATE
                      </Link>
                      <button
                        className="btn btn-danger btn-sm my-2"
                        onClick={() => {
                          handleDelete(data.recid);
                          reloadPage();
                        }}
                      >
                        DELETE
                      </button>
                    </td>
                  </tr>
                </tbody>
              ))}
          </table>
        </div>
      ) : (
        <div>
          <h3>{message}</h3>
          <h3>Login Now</h3>
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
