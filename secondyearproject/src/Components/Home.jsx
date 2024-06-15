import React, { useState } from "react";
import { useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
const Home = () => {

  const [adminTotal, setAdminTotal] = useState(0)
  const [studentTotal, setStudentTotal] = useState(0)
  const [admins, setAdmins] = useState([])

  useEffect(() =>{
    adminCount();
    studentCount();
    AdminRecords();
  }, [])


  const AdminRecords = () => {
    axios.get('http://localhost:3000/auth/admin_records')
    .then(result => {
      if(result.data.Status){
        setAdmins(result.data.Result)
      } else{
        alert(result.data.Error)
      }
    })
  }

  const adminCount = () => {
    axios.get('http://localhost:3000/auth/admin_count')
    .then(result => {
      if(result.data.Status){
        setAdminTotal(result.data.Result[0].admin)
      }
    })
  }

  const studentCount = () => {
    axios.get('http://localhost:3000/auth/student_count')
    .then(result => {
      if(result.data.Status){
        setStudentTotal(result.data.Result[0].student)
      }
    })
  }



  const containerStyle = {
    width: "40%", // Adjust the width of the container box
    marginTop: "100px",
    padding: "20px",
    height: "200px",
    backgroundColor: "skyblue",
  };

  const customBorderStyle = {
    border: "5px solid green", // Adjust the border size and color as needed
  };

  const titleStyle = {
    fontSize: "24px", // Adjust the font size as needed
    fontWeight: "bold", // Make the font bold
    color: "blue",

  };

  const hrStyle = {
    borderTop: "3px solid black", // Adjust thickness and color as needed
    fontWeight: "bold", // Make the line bold
    margin: "10px 0", // Adjust margin as needed
  };

  return (
    <div>
      <div className="p-3 d-flex justify-content-around mt-3">
        <div className="px-3 pt-2 pb-3 shadow-sm" style={{ ...containerStyle, ...customBorderStyle }}>
          <div className="text-centre pb-1">
          <h4 style={titleStyle}>Admin</h4>
          </div>
          <hr style={hrStyle}/>
          <div className="d-flex justify-content-between">
            <h5>Total:</h5>
            <h5>{adminTotal}</h5>
          </div>
        </div>

        <div className="px-3 pt-2 pb-3 shadow-sm" style={{ ...containerStyle, ...customBorderStyle }}>
          <div className="text-centre pb-1">
          <h4 style={titleStyle}>Student</h4>
          </div>
          <hr style={hrStyle}/>
          <div className="d-flex justify-content-between">
            <h5>Total:</h5>
            <h5>{studentTotal}</h5>
          </div>
        </div>
      </div>
      <div className="mt-4 px-5 pt-3">
        <h3>List of Admins</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              admins.map((a,index)=> (
                <tr key={index}>
                  <td>{a.email}</td>
                  <td>
                    <button
                      className="btn btn-info btn-sm me-2"
                    >
                      Edit  
                    </button>
                    <button
                      className="btn btn-warning btn-sm">
                      Delete
                    </button> 
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  

  );
};

export default Home;
