
import express from 'express';
import con from '../utils/db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


//creating the instnace of express router
const router = express.Router()


//handling student login
router.post('/student_login',(req, res) => {

    //fetching student details based on the email
    const sql = "SELECT * FROM student WHERE email = ?";
    con.query(sql,[req.body.email], (err, result) => {
        if (err) return res.json({loginStatus: false, Error: "Query error"});

        //checking for correct PW for correct mail
        if (result.length > 0) {
            bcrypt.compare(req.body.password, result[0].password, (err,response) =>{
                if(err) return res.json({loginStatus: false, Error: "Wrong password"});

                //if password match then
                if(response){
                    const email = result[0].email;
                    const token = jwt.sign(
                        { role: "student", email: email , id: result[0].id},
                        "jwt_secret_key_",
                        { expiresIn: '1d' }
            );
            //setting token in cookie
            res.cookie('token', token);
            return res.json({ loginStatus: true, id: result[0].id });

                }
            })


        } else {
            return res.json({ loginStatus: false, Error: "Wrong email or password" });
        }
    });
})



router.get('/detail/:id', (req,res) =>{
    const id = req.params.id;
    const sql = "SELECT * FROM student WHERE id = ?";
    con.query(sql,[id],(err,result)=>{
        if(err) return res.json({Status: false});
        return res.json(result)
    })
})


router.get('/logout', (req,res) => {
    res.clearCookie('token');
    return res.json({Status: true});
})


export {router as StudentRouter}