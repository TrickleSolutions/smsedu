const express=require('express'); 
const app=express();
const bodyParser=require("body-parser");
const cors=require('cors');
const geoip = require('geoip-lite');
const ip = require('ip').address();
const PORT=process.env.PORT || 8000;
const   adminRouter=require('./Routers/admin/adminRouter')
const  StudentRoute=require('./Routers/students/StudentRoute');
const  TeacherRoute=require('./Routers/teachers/TeacherRoute');
app.use(bodyParser.json()); 
app.use(express.json());
app.use(cors()
        ) ;
require('./config/config'); 
app.use("/api",adminRouter);    
app.use('/api',StudentRoute);
app.use('/api',TeacherRoute);


app.use("/api/coursepic", express.static("./assets/admin/course_upload"));
app.use("/api/assignmentpic", express.static("./assets/teachers/assignment_upload"));
app.use("/api/eventpic", express.static("./assets/teachers/events_upload"));
app.use("/api/incomepic", express.static("./assets/teachers/incomr_upload"));
app.use("/api/stprofilepic", express.static("./assets/students/stprofilepic"));
app.use("/api/videocontent", express.static("./assets/teachers/CourseContent"));
app.use("/api/docxcontent", express.static("./assets/teachers/CourseContent"));
app.use("/api/teacherpic", express.static("./assets/admin/instructorProfile"));
app.use("/api/adminpic", express.static("./assets/admin/anminprofile"));
app.use("/api/studentofmonth", express.static("./assets/admin/studentofmonth"));
app.use("/api/instructorofmonth", express.static("./assets/admin/instructorofmonth"));


app.get('/ip', (req, res) => {
    const geo = geoip.lookup(ip);
            
    // res.json({
    //     Country: geo.country,
    //     Region: geo.region,
    //     City:geo.city,
         
    //   });
    res.send(geo.region)

//     console.log(`Country: ${geo.country}`);
// console.log(`Region: ${geo.region}`);
// console.log(`City: ${geo.city}`);
    
  });


app.listen(PORT, () => {
    console.log("Hi Amit your server is running at  this :" + PORT)
})







