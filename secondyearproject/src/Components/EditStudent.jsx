import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const EditStudent = () => {

    //only takes id from url
    const {id} = useParams();
    const [student, setStudent] = useState({
        name: '',
        email: '',
        admitStatus: '',
        address: '',
        category_id: '',
    });


    const [category, setCategory] = useState([])
    const navigate = useNavigate()


    useEffect(()=> {
        axios.get('http://localhost:3000/auth/category')
        .then(result => {
            if(result.data.Status) {
                setCategory(result.data.Result);
            }else {
                alert(result.data.Error)
            }
        }).catch(err => console.log(err))

        axios.get('http://localhost:3000/auth/student/'+id)
        .then(result=>{
            setStudent({
                ...student,
                name: result.data.Result[0].name,
                email: result.data.Result[0].email,
                address: result.data.Result[0].address,
                admitStatus: result.data.Result[0].admitStatus,
                category_id: result.data.Result[0].category_id
            })
        }).catch(err => console.log(err))
    }, [])


    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put('http://localhost:3000/auth/edit_student/'+id, student)
        .then(result=>{
            if(result.data.Status){
                navigate('/dashboard/student')
            } else{
                alert(result.data.Error)
            }
        }).catch(err => console.log(err))
    }

    
    return (
        <div className='d-flex justify-content-center align-items-center mt-3'>
            <div className='p-3 rounded w-50 border'>
            
            <h3 className="text-center">Edit Student</h3>
            <form className="row g-1" onSubmit={handleSubmit}>
                <div className='col-12'>
                    
                    <label htmlFor="inputName" className="form-label">
                        Name
                    </label>
                    <input
                     type="text"
                     className="form-control rounded-0"
                     id="inputName"
                     placeholder="Enter Name"
                     value={student.name}
                     onChange={(e) => setStudent({...student, name: e.target.value})}
                     />
                </div>

                <div className='col-12'>
                    <label htmlFor="inputEmail4" className="form-label">
                        Email
                    </label>
                    <input
                     type="email"
                     className="form-control rounded-0"
                     id="inputEmail4"
                     placeholder="Enter Email"
                     autoComplete="off"
                     value={student.email}
                     onChange={(e) => setStudent({...student, email: e.target.value})}
                     />
                </div>

                <div className='col-12'>
                    <label htmlFor="inputAdmitStatus" className="form-label">
                        AdmitStatus
                    </label>
                    <input
                     type="text"
                     className="form-control rounded-0"
                     id="inputAdmitStatus"
                     placeholder="Enter Status"
                     autoComplete="off"
                     value={student.admitStatus}
                     onChange={(e) => setStudent({...student, admitStatus: e.target.value})}
                    />
                    </div>

                    <div className='col-12'>
                    <label htmlFor="inputAddress" className="form-label">
                        Address
                    </label>
                    <input
                     type="text"
                     className="form-control rounded-0"
                     id="inputAddress"
                     placeholder="Enter Address"
                     autoComplete="off"
                     value={student.address}
                     onChange={(e) => setStudent({...student, address: e.target.value})}
                     />
                    </div>

                    <div className='col-12'>
                    <label htmlFor="category" className="form-label">
                        Category
                    </label>
                    <select name="category" id="category" className="form-select"
                     onChange={(e) => setStudent({...student, category_id: e.target.value})}>
                        {category.map(c => {
                            //addeded key = c.id 
                            return <option key={c.id} value={c.id}>{c.name}</option>
                        })}


                    </select>
                    </div>
                    <div className="col-12">
                    <button type="submit" className="btn btn-primary w-100">
                        Edit Student</button>
                    </div>
            </form>
        </div>
    </div>
    )
}

export default EditStudent