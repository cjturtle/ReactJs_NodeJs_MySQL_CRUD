import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";

const Create = () => {
  const navigate = useNavigate();
  const [fullname, setFullname] = useState("");
  const [address, setAddress] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [age, setAge] = useState("Birthdate Required");
  const [gender, setGender] = useState("");
  const [civilstat, setCivilstat] = useState();
  const [contactnum, setContactnum] = useState("");
  const [salary, setSalary] = useState("");
  const [isactive, setIsactive] = useState();

  const inputData = {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3001", inputData);
      setFullname("");
      setAddress("");
      setBirthdate("");
      setAge("");
      setGender("");
      setCivilstat("");
      setContactnum("");
      setSalary("");
      setIsactive("");
      alert("Uploaded Successfully");
      navigate("/create");
    } catch (err) {
      console.log("erorrrsss", err);
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
        <form onSubmit={handleSubmit}>
          <h3 className="text-center mb-4">Add Employee</h3>
          <div className="d-flex justify-content-around gap-3 ">
            <div className="w-50">
              <h6 className="mt-4">Employee Full Name:</h6>
              <input
                className="w-100"
                required
                type="text"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />

              <h6 className="mt-4">Address:</h6>
              <input
                className="w-100"
                required
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />

              <h6 className="mt-4">
                Birth Date: <span className="fw-normal">{birthdate}</span>
              </h6>
              <input
                className="w-100"
                required
                type="date"
                onChange={(e) => {
                  setBirthdate(e.target.value);
                  setAge(
                    calculateAge(moment(birthdate).utc().format("YYYY-MM-DD"))
                  );
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
                  required
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
                type="number"
                required
                value={contactnum}
                onChange={(e) => setContactnum(e.target.value)}
              />

              <h6 className="mt-4">Salary:</h6>
              <input
                className="w-100"
                required
                type="number"
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
              <button className="btn btn-primary float-end mt-5">Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;
