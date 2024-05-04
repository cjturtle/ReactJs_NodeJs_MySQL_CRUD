import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import moment from "moment";

const Details = () => {
  const { id } = useParams();
  const [recordid, setRecordId] = useState("");
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
  return (
    <div className=" d-flex justify-content-center ">
      <div className=" my-5 p-5 w-50 border border-dark rounded ">
        <div className="">
          <h6 className="text-center mb-4">
            Record Id: <span className="fw-normal">{recordid}</span>
          </h6>
          <h6>
            Employee Full Name: <span className="fw-normal ">{fullname}</span>
          </h6>
          <h6>
            Address: <span className="fw-normal ">{address}</span>
          </h6>
          <h6>
            Birth Date:{" "}
            <span className="fw-normal ">{moment(birthdate).format("LL")}</span>
          </h6>
          <h6>
            Age: <span className="fw-normal ">{age}</span>
          </h6>
          <h6>
            Gender: <span className="fw-normal ">{gender}</span>
          </h6>
          <h6>
            Civil Status: <span className="fw-normal ">{civilstat}</span>
          </h6>
          <h6>
            Contact No.: <span className="fw-normal ">{contactnum}</span>
          </h6>
          <h6>
            Salary: <span className="fw-normal ">{salary}</span>
          </h6>
          <h6>
            Active: <span className="fw-normal ">{isactive}</span>
          </h6>
        </div>
        <Link to="/read" className="float-end btn btn-secondary">
          Back{" "}
        </Link>
      </div>
    </div>
  );
};

export default Details;
