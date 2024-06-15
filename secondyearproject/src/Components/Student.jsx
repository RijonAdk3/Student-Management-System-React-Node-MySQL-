import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Student = () =>{
    const [student, setStudent] = useState([])
    const navigate = useNavigate()
    useEffect(() =>{
        axios.get('http://localhost:3000/auth/student')
            .then(result => {
                if(result.data.Status) {
                    setStudent(result.data.Result);
                }else {
                    alert(result.data.Error)
                }
            }).catch(err => console.log(err))
    }, [])


    const handleDelete = (id) =>{
        axios.delete('http://localhost:3000/auth/delete_student/'+id)
        .then(result =>{
            if(result.data.Status){
                window.location.reload()
            }else{
                alert(result.data.Error)
            }
        })
    }

    return(
        <div className='px-5 mt-3'>
            <div className='d-flex justify-content-center'>
                <h3>Student List</h3>
        </div>
        <Link to="/dashboard/add_student" className='btn btn-success'>
        Add Student
        </Link>

        {/* Fetching the regards of students*/}
        <div className='mt -3'>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>AdmitStatus</th>
                        <th>Actions</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        student.map(s => (
                            <tr key={s.id}>
                                <td>{s.name}</td>
                                {/* Putting path of server to access image folder */}
                                <td>
                                    <img src={`http://localhost:3000/Images/`+s.image} className="student_image"/>
                                </td>
                                <td>{s.email}</td>
                                <td>{s.address}</td>
                                <td>{s.admitStatus}</td>
                                <td>
                                <Link to={`/dashboard/edit_student/`+s.id} className="btn btn-info btn-sm me-2" style={{ fontFamily: 'Arial' }}>Edit</Link>
                                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(s.id)} style={{ fontFamily: 'Verdana' }}>Delete</button>

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


export default Student