import mysql from 'mysql'

const con = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "",
        database: "studentms"
    }
)

con.connect(function(err) {
    if (err) {
        console.error("Connection error:");
    } else {
        console.log("Connected");
    }
});


export default con;