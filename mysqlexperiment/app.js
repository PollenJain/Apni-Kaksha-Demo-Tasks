const mysql = require('mysql');
const bodyParser = require('body-parser');
const express = require("express");
var jwt = require('jsonwebtoken');
const app = express();
// parse application/json
app.use(bodyParser.json());
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'doctor'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL Server!');
});

app.get("/api/doctor_details",(req,res) => {
    connection.query('SELECT * from login', (err, rows) => {
        if(err) throw err;
        console.log('The data from users table are: \n', rows);
        res.send(JSON.stringify({"status": 200, "error": null, "response": rows}))
    });
});

app.post("/api/signUp",(req,res)=>{
    email = (req.body.email)
    uname = (req.body.uname)
    /* Assume password is encrypted before storing to db */
    password = (req.body.password)
    role = (req.body.role)
    console.log(req.body)
    sqlQuery = "INSERT INTO `register` (`email`, `uname`, `password`, `role`) VALUES ('"+email+"','"+uname+"','"+password+"','"+role+"')";
    connection.query(sqlQuery, function (error, results) {
        if (error) throw error;
        console.log("User successfully logged in");
        var data = JSON.stringify(results);
        var secret = 'TOPSECRETTTTT';
        var now = Math.floor(Date.now() / 1000),
            iat = (now - 10),
            expiresIn = 3600,
            expr = (now + expiresIn),
            notBefore = (now - 10),
            jwtId = Math.random().toString(36).substring(7);
        var payload = {
            iat: iat,
            jwtid : jwtId,
            audience : 'TEST',
            data : data
        };	
        
     
        jwt.sign(payload, secret, { algorithm: 'HS256', expiresIn : expiresIn}, function(err, token) 
        {
            
            if(err)
            {
                console.log('Error occurred while generating token');
                console.log(err);
                return false;
            }
            else
            {
                if(token != false)
                {
                    //res.send(token);
                    res.header();
                    res.json({
                        "results":{"status": "true"},
                        "token" : token,
                        "message" : "User Sucessfully logged in"         
                    });
                    res.end();
                }
                else
                {
                    res.send("Could not create token");
                    res.end();
                }
            
            }
        });     
        
      });
});

app.post("/api/login", (req,res)=>{
    email = req.body.email
    password = req.body.password
    sqlQuery = "SELECT `email`, `password` FROM `register` WHERE email = '"+email+"' AND password = '"+password+"'";
    connection.query(sqlQuery, function(err, results){
        if(results.length)
        {
            console.log("User successfully logged in");
            var data = JSON.stringify(results);
            var secret = 'TOPSECRETTTTT';
            var now = Math.floor(Date.now() / 1000),
                iat = (now - 10),
                expiresIn = 3600,
                expr = (now + expiresIn),
                notBefore = (now - 10),
                jwtId = Math.random().toString(36).substring(7);
            var payload = {
                iat: iat,
                jwtid : jwtId,
                audience : 'TEST',
                data : data
            };	
            
         
            jwt.sign(payload, secret, { algorithm: 'HS256', expiresIn : expiresIn}, function(err, token) 
            {
                
                if(err)
                {
                    console.log('Error occurred while generating token');
                    console.log(err);
                    return false;
                }
                else
                {
                    if(token != false)
                    {
                        //res.send(token);
                        res.header();
                        res.json({
                            "results":{"status": "true"},
                            "token" : token,
                            "message" : "User Sucessfully logged in"         
                        });
                        res.end();
                    }
                    else
                    {
                        res.send("Could not create token");
                        res.end();
                    }
                
                }
            });            
        }
        else
        {
            console.log("Invalid credentials");
            res.end(JSON.stringify("Invalid credentials"));
        }
    })
});

/* For POSTMAN Body :
{"appointmentDate":"12th April, 2021", "appointmentTime":"10:30 am", "doctorEmail": "parags@gmail.com"}
*/
app.post("/api/requestAppointment/:id", (req,res)=>{
    patientEmail = req.params.id;
    appointmentDate = req.body.appointmentDate;
    appointmentTime = req.body.appointmentTime;
    doctorEmail = req.body.doctorEmail;
    requestStatus = "Pending";
    /* Assuming that patient is registered. Explicit validation needs to be performed if not logged in. Doctor Email id also needs to validated. */
    sqlQuery = "INSERT INTO `appointmentRequests` (`patientEmail`, `appointmentDate`, `appointmentTime`, `doctorEmail`, `requestStatus`) VALUES ('"+patientEmail+"','"+appointmentDate+"','"+appointmentTime+"','"+doctorEmail+"','"+requestStatus+"')";
    connection.query(sqlQuery, function (error, results) {
        if (error) throw error;
        console.log("Appointment request registered with "+JSON.stringify(doctorEmail)+" for "+JSON.stringify(appointmentTime)+" on "+JSON.stringify(appointmentDate));
        res.end(JSON.stringify("Appointment request successfully registered with "+JSON.stringify(doctorEmail)+" for "+JSON.stringify(appointmentTime)+" on "+JSON.stringify(appointmentDate)));
    });
});

app.post("/api/acceptAppointment/:id", (req,res)=>{
    doctorEmail = req.params.id;
    patientEmail = req.body.patientEmail;
    sqlQuery = 'UPDATE `appointmentRequests` SET `requestStatus` = "Accepted" WHERE `patientEmail` = "'+patientEmail+'" AND `doctorEmail` = "'+doctorEmail+'"';
    connection.query(sqlQuery, function (error, results) {
        if (error) throw error;
        console.log(results.affectedRows +" appointments made by "+patientEmail+" has been accepted by "+doctorEmail);
        res.end(JSON.stringify(results.affectedRows+" appointments made by "+patientEmail+" has been accepted by "+doctorEmail));
    });

});

/* Show all the appointments made by a particular patient in case of patients, made to a particular doctor in case of doctors */
app.get("/api/requestedAppointments", (req,res)=>{
    role=req.body.role;
    email=req.body.email;
    roleType="doctorEmail";
    if (role === "patient")
    {
        console.log("Request from patient received");
        roleType="patientEmail"
    }
    else
    {
        console.log("Request from doctor received");
    }
    sqlQuery = 'SELECT * from `appointmentRequests` WHERE `'+roleType+'` = "'+email+'"';
    connection.query(sqlQuery, (err, rows) => {
        if(err) throw err;
        console.log('The data from users table are: \n', rows);
        res.send(JSON.stringify({"status": 200, "error": null, "response": rows}))
    });

});

app.get("/api/myAppointments", (req,res)=>{
    role=req.body.role;
    email=req.body.email;
    roleType="doctorEmail";
    sqlQuery = "";
    if (role === "patient")
    {
        console.log("Request from patient received");
        roleType="patientEmail"
        sqlQuery = 'SELECT * from `appointmentRequests` WHERE `'+roleType+'` = "'+email+'" AND `requestStatus` = "Accepted"';
    }
    else
    {
        console.log("Request from doctor received");
        /* Same query made for doctor as in case of /api/requestedAppointments */
        sqlQuery = 'SELECT * from `appointmentRequests` WHERE `'+roleType+'` = "'+email+'"';
    }
    connection.query(sqlQuery, (err, rows) => {
        if(err) throw err;
        console.log('The data from users table are: \n', rows);
        res.send(JSON.stringify({"status": 200, "error": null, "response": rows}))
    });


});

app.listen(3000, () => {
    console.log('Server is running at port 3000');
});
