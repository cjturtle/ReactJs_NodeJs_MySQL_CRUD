import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import moment from "moment";

const Update = () => {
  const { id } = useParams();
  const [recid, setRecordId] = useState("");
  const [fullname, setFullname] = useState("");
  const [address, setAddress] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [civilstat, setCivilstat] = useState("");
  const [contactnum, setContactnum] = useState("");
  const [salary, setSalary] = useState("");
  const [isactive, setIsactive] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/${id}`);
        const [json] = await response.data;
        setRecordId(json.recid);
        setFullname(json.fullname);
        setAddress(json.address);
        setBirthdate(json.birthdate);
        setAge(json.age);
        setGender(json.gender);
        setCivilstat(json.civilstat);
        setContactnum(json.contactnum);
        setSalary(json.salary);
        setIsactive(json.isactive);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const data = {
      recid,
      fullname,
      address,
      birthdate,
      age,
      gender,
      civilstat,
      contactnum,
      salary,
      isactive,
    };
    console.log(data);
    try {
      await axios.put(`http://localhost:3001/${id}`, data);
      alert("Update Successfully");
    } catch (error) {
      console.log(error);
    }
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

  return (
    <div className=" d-flex justify-content-center ">
      <div className="border border-dark rounded p-5 w-75 my-5">
        <form onSubmit={handleUpdate}>
          <h6 className="text-center mb-4">
            Record Id: <span className="fw-normal">{recid}</span>
          </h6>
          <div className="d-flex justify-content-around gap-3 ">
            <div className="w-50">
              <h6 className="mt-4">Employee Full Name:</h6>
              <input
                className="w-100"
                type="text"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />

              <h6 className="mt-4">Address:</h6>
              <input
                className="w-100"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />

              <h6 className="mt-4">
                Birth Date:{" "}
                <span className="fw-normal">
                  {moment(birthdate).format("YYYY-MM-DD")}
                </span>
              </h6>
              <input
                className="w-100"
                type="date"
                onChange={(e) => {
                  setBirthdate(e.target.value);
                  setAge(calculateAge(moment(birthdate).format("YYYY-MM-DD")));
                }}
              />

              <h6 className="mt-4">
                Age: <span>{age}</span>
              </h6>

              <h6 className="mt-4">
                Gender: <span className="fw-normal">{gender}</span>
              </h6>
              <div className="d-flex gap-2 ">
                <input
                  type="radio"
                  value="Male"
                  checked={gender === "Male"}
                  onChange={(e) => setGender(e.target.value)}
                />
                <label>Male</label>
                <input
                  type="radio"
                  value="Female"
                  checked={gender === "Female"}
                  onChange={(e) => setGender(e.target.value)}
                />
                <label>Female</label>
                <input
                  type="radio"
                  value="Others"
                  checked={gender === "Others"}
                  onChange={(e) => setGender(e.target.value)}
                />
                <label>Others</label>
              </div>
            </div>

            <div className="w-50">
              <h6 className="mt-4">
                Civil Status: <span className="fw-normal">{civilstat}</span>
              </h6>
              <div className="d-flex gap-2">
                <select
                  className="w-100"
                  onChange={(e) => setCivilstat(e.target.value)}
                  value={civilstat}
                >
                  <option value="N/A">Choose</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Separated">Separated</option>
                  <option value="Widowed">Widowed</option>
                </select>
              </div>
              <h6 className="mt-4">Contact No.:</h6>
              <input
                className="w-100"
                type="text"
                value={contactnum}
                onChange={(e) => setContactnum(e.target.value)}
              />

              <h6 className="mt-4">Salary:</h6>
              <input
                className="w-100"
                type="text"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
              />

              <h6 className="mt-4">
                Active: <span className="fw-normal">{isactive}</span>
              </h6>
              <div className="d-flex gap-2">
                <input
                  type="checkbox"
                  onChange={(e) => setIsactive(e.target.value)}
                  value="1"
                />
                <label>Active</label>
                <input
                  type="checkbox"
                  onChange={(e) => setIsactive(e.target.value)}
                  value="0"
                />
                <label>Inactive</label>
              </div>
              <Link to="/read" className="float-end btn btn-secondary mt-5">
                Back{" "}
              </Link>
              <button className="btn btn-warning float-end mx-3 mt-5">
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Update;
