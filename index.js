const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors');

const PORT = process.env.PORT || 8000;
const adminRouter = require('./Routers/admin/adminRouter')
const StudentRoute = require('./Routers/students/StudentRoute');
const TeacherRoute = require('./Routers/teachers/TeacherRoute');


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001'); // Replace with your front-end URL
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(bodyParser.json());
app.use(express.json({ limit: '30mb' }));
app.use(cors({
    origin: ["https://www.smseducations.com", "http://localhost:3000", 'http://localhost:3001', 'https://smseducations.com']
}));
require('./config/config');
app.use("/api", adminRouter);
app.use('/api', StudentRoute);
app.use('/api', TeacherRoute);
const oneYearInSeconds = 365 * 24 * 60 * 60;
const maxAge = oneYearInSeconds * 1000;

app.use("/api/coursepic", express.static("./assets/admin/course_upload", { maxAge }));
app.use("/api/assignmentpic", express.static("./assets/teachers/assignment_upload", { maxAge }));
app.use("/api/eventpic", express.static("./assets/teachers/events_upload", { maxAge }));
app.use("/api/incomepic", express.static("./assets/teachers/incomr_upload", { maxAge }));
app.use("/api/stprofilepic", express.static("./assets/students/stprofilepic", { maxAge }));
app.use("/api/videocontent", express.static("./assets/teachers/CourseContent", { maxAge }));
app.use("/api/docxcontent", express.static("./assets/teachers/CourseContent", { maxAge }));
app.use("/api/teacherpic", express.static("./assets/admin/instructorProfile", { maxAge }));
app.use("/api/adminpic", express.static("./assets/admin/anminprofile", { maxAge }));
app.use("/api/studentofmonth", express.static("./assets/admin/studentofmonth", { maxAge }));
app.use("/api/instructorofmonths", express.static("./assets/admin/instructorofmonth", { maxAge }));
app.use("/api/showcontactcv", express.static("./assets/admin/joinasinstructor", { maxAge }));



app.listen(PORT, () => {
    console.log("Hi Amit your server is running at  this :" + PORT)
})







