import express from 'express';
import con from "../utils/db.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import multer from 'multer';
import path from 'path';

const router = express.Router()

// AdminRoute.js
router.post('/adminlogin',(req, res) => {

    const sql = "SELECT * FROM admin WHERE email = ? AND password = ?";
    con.query(sql,[req.body.email, req.body.password], (err, result) => {
        if (err) return res.json({loginStatus: false, Error: "Query error"});

        if (result.length > 0) {
            const email = result[0].email;
            const token = jwt.sign(
                { role: "admin", email: email, id: result[0].id },
                "jwt_secret_key_",
                { expiresIn: '1d' }
            );
            res.cookie('token', token);
            return res.json({ loginStatus: true });
        } else {
            return res.json({ loginStatus: false, Error: "Wrong email or password" });
        }
    });
})


router.get('/category', (req,res) =>{
    const sql = "SELECT * FROM category";
    con.query(sql, (err, result) =>{
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })

})

router.post('/add_category', (req, res) => {
    const sql = "INSERT INTO category (`name`) VALUES (?)";
    con.query(sql, [req.body.category], (err, result) =>{
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true})
    })

})


//image uploading
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null,'Public/Images')
    },
    filename: (req,file,cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage: storage
})

router.post('/add_student',upload.single('image'), (req, res) =>{
    const sql = `INSERT INTO student
        (name, email, password, address, admitStatus, image, category_id)
        VALUES (?)`;
    bcrypt.hash(req.body.password, 10, (err, hash) =>{
        if(err) return res.json({Status: false, Error: "Query Error"})
        const values = [
            req.body.name,
            req.body.email,
            hash,
            req.body.address,
            req.body.admitStatus,
            req.file.filename,
            req.body.category_id
        ]
        con.query(sql, [values], (err, result) =>{
            if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true})
        })
    })
})

router.get('/student', (req,res) =>{
    const sql = "SELECT * FROM student";
    con.query(sql, (err, result) =>{
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })

})


router.get('/student/:id', (req,res) =>{
    const id = req.params.id;
    const sql = "SELECT * FROM student WHERE id = ?";
    con.query(sql,[id], (err, result) =>{
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
    
})


router.put('/edit_student/:id', (req, res) => {
    const id = req.params.id;
    const sql = `UPDATE student
        set name = ?, email = ?, admitStatus = ?, address = ?, category_id = ? 
        WHERE id = ?`

        const values = [
            req.body.name,
            req.body.email,
            req.body.admitStatus,
            req.body.address,
            req.body.category_id
        ]

        con.query(sql,[...values, id], (err, result) =>{
            if(err) return res.json({Status: false, Error: "Query Error"+err})
            return res.json({Status: true, Result: result})
        })
})


router.delete('/delete_student/:id', (req,res) =>{
    const id = req.params.id;
    const sql = "delete from student where id = ?"

    con.query(sql,[id], (err, result) =>{
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})


router.get('/admin_count', (req,res) =>{
    const sql = "select count(id) as admin from admin";
    con.query(sql, (err, result) =>{
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/student_count', (req,res) =>{
    const sql = "select count(id) as student from student";
    con.query(sql, (err, result) =>{
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})


router.get('/admin_records', (req,res) => {
    const sql = "select * from admin";
    con.query(sql, (err, result) =>{
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})


router.get('/logout', (req,res) =>{
    res.clearCookie('token');
    return res.json({Status: true});
});

export {router as adminRouter};