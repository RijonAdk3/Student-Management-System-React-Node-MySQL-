import React, { useEffect, useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddStudent = () => {
    const [student, setStudent] = useState({
        name: '',
        email: '',
        password: '',
        admitStatus: '',
        address: '',
        category_id: '',
        image: '',


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
        }, []);


        const handleSubmit = (e) => {
            e.preventDefault()
            const formData = new FormData();
            formData.append('name', student.name);
            formData.append('email', student.email);
            formData.append('password', student.password);
            formData.append('address', student.address);
            formData.append('admitStatus', student.admitStatus);
            formData.append('image', student.image);
            formData.append('category_id', student.category_id);

            //changed e.student to student
            //passing form data as object
            //navigating to student page after adding students
            axios.post('http://localhost:3000/auth/add_student', formData)
            .then(result => {
                if(result.data.Status){
                    navigate('/dashboard/student')
                } else{
                    alert(result.data.Error)
                }
            })
            .catch(err => console.log(err))
        }


    return (
        <div className='d-flex justify-content-center align-items-center mt-3'>
            <div className='p-3 rounded w-50 border'>
            
            <h3 className="text-center">Add Student</h3>
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
                     onChange={(e) => setStudent({...student, email: e.target.value})}
                     />
                </div>

                <div className='col-12'>
                    <label htmlFor="inputPassword4" className="form-label">
                        Password
                    </label>
                    <input
                     type="password"
                     className="form-control rounded-0"
                     id="inputPassword4"
                     placeholder="Enter Password"
                     onChange={(e) => setStudent({...student, password: e.target.value})}
                     />

                    
                    <label htmlFor="inputAdmitStatus" className="form-label">
                        AdmitStatus
                    </label>
                    <input
                     type="text"
                     className="form-control rounded-0"
                     id="inputAdmitStatus"
                     placeholder="Enter Status"
                     autoComplete="off"
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

                    <div className='col-12 mb-3'>
                    <label className="form-label" htmlFor="inputGroupFile01">
                        Select Image
                    </label>
                    <input
                     type="file"
                     className="form-control rounded-0"
                     id="inputGroupFile01"
                     name="image"
                     onChange={(e) => setStudent({...student, image: e.target.files[0]})}
    
                     />
                    </div>
                    <div className="col-12">
                    <button type="submit" className="btn btn-primary w-100">
                        Add Student</button>
                    </div>
            </form>
        </div>
    </div>
    )
}


export default AddStudent