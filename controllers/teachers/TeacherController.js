const InstructorRegisterSchema = require('../../models/admin/InstructorModel')
const resultSchema = require('../../models/Teacher/ResultST')
const Sheduleclass_Schema = require('../../models/Teacher/Schedule_Class')
const assignment_Schema = require('../../models/Teacher/Add_Assignment')
const AddFeeSchema = require('../../models/Teacher/Add_fee')
const crypto = require('crypto');
const Functions = require('../../library/functions');
const nodemailer = require("nodemailer");
const EventsSchema = require('../../models/Teacher/Events')
const QueriesSchema = require('../../models/students/Queries')
const AcademicSchema = require('../../models/students/Academicjs')
const stStatusReqSchema = require('../../models/Teacher/Student_status_req')
const COurseContentLinkSchema = require('../../models/Teacher/CourseContentLink')
const COurseContentDocxSchema = require('../../models/Teacher/CourseContentdoc')
const COurseContentVedioSchema = require('../../models/Teacher/CourseConent_vadio')
const VerifyModel = require('../../models/VerifyModel')
// const loginInstructor=async(req,resp,next)=>{
//     try { 
//       const email = req.body.email;
//       const password = req.body.password;
//       const usermail = await InstructorRegisterSchema.findOne({
//         email: email,
//         password: password,
//       });
//       if (usermail) {
//         resp.status(200).json({
//           code: 200,
//           message: "user Login successfully",
//           data: {
//             _id: usermail._id,
//             name: usermail.name,
//             email: usermail.email,
//             contact: usermail.contact,
//           },
//           error: false,
//           status: true,
//         });
//         console.log(usermail._id);
//       } else {
//         resp.status(404).json({
//           code: 404,
//           message: "Invalid User details, Try Again.  ",
//           data: [],
//           error: false,
//           status: false,
//         });
//       }
//       } catch (err) {
//         console.log(err);
//       }
// }  
const loginInstructor = async (req, res) => {

  const { contact, otp, otpid } = req.query;

  try {
    if (!contact || !otp || !otpid) return res.status(400).json({ error: true, message: "invalid credentials" })

    // find the user 
    const isUser = await InstructorRegisterSchema.findOne({ contact: contact })
    if (!isUser) return res.status(404).json({ error: true, message: "No user found" })
    // Verify the OTP 
    const verifiedOtp = await VerifyModel.findOne({
      otp: otp,
      otpid: otpid,
      otpExpireTime: { $gt: Date.now() },
    });

    if (!verifiedOtp) {
      return res.status(404).json({ error: true, message: "Invalid OTP or OTP expired" });
    }


    res.status(200).json({
      code: 200,
      message: "user Login successfully",
      data: {
        _id: isUser._id,
        name: isUser.name,
        email: isUser.email,
        contact: isUser.contact,
      },
      error: false,
      status: true,
    });
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Error during login:", error);
    res.status(500).json({ error: true, message: error.message });
  }

  // try {

  //   const email = req.body.email;
  //   const password = req.body.password;
  //   const usermail = await InstructorRegisterSchema.findOne({
  //     email: email,
  //     password: password,
  //   });
  //   if (usermail) {
  //     resp.status(200).json({
  //       code: 200,
  //       message: "user Login successfully",
  //       data: {
  //         _id: usermail._id,
  //         name: usermail.name,
  //         email: usermail.email,
  //         contact: usermail.contact,
  //       },
  //       error: false,
  //       status: true,
  //     });
  //     console.log(usermail._id);
  //   } else {
  //     resp.status(404).json({
  //       code: 404,
  //       message: "Invalid User details, Try Again.  ",
  //       data: [],
  //       error: false,
  //       status: false,
  //     });
  //   }
  // } catch (err) {
  //   console.log(err);
  // }
}


const createAddFee = async (req, res) => {
  const { regno, name, amount, mode, transId, paid, date, course } = req.body
  let data = new AddFeeSchema({ regno, name, amount, mode, transId, paid, date, course });

  let result = await data.save();
  res.status(200).json({
    code: 200,
    message: "  Result Created successfully",
    error: false,
    status: true,
  });

}

const putAddFee = async (req, res) => {
  try {

    const { regno, name, amount, mode, transId, paid, date, course } = req.body

    let data = await AddFeeSchema.updateOne(
      { regno: req.params.regno },
      {
        $set: { regno, name, amount, mode, transId, paid, date, course }
      }
    );
    res.send(data);

  } catch (err) {
    console.log(err)
  }

}
const delAddFee = async (req, res) => {
  try {
    console.log(req.params)
    let data = await AddFeeSchema.deleteOne({ regno: req.params.regno });
    res.send(data);
  } catch (err) {
    console.log(err)

  }

}
const getAllAddFee = async (req, res) => {
  let data = await AddFeeSchema.find();
  res.send(data)
}
const getsingleFee = async (req, res) => {
  let data = await AddFeeSchema.find({ regno: req.params.regno });
  res.send(data)
}
const getFee = async (req, res) => {
  let data = await AddFeeSchema.find();
  res.send(data)
}
const gettotalpaidFee = async (req, res) => {
  //let r=await AddFeeSchema.find({regno:req.params.regno});
  // res.send(data)
  let regno = req.params.regno;
  let data = await AddFeeSchema.aggregate([

    {
      $group: { _id: "$regno", totalpaid: { $sum: "$paid" } }
    }
  ])
  res.send(data)
}
{/*  RESULT SECTION */ }
const createResult = async (req, res) => {
  const { name, regno, course, topic, total_marks, obtain_marks } = req.body
  let data = new resultSchema({ name, regno, course, topic, total_marks, obtain_marks });

  let result = await data.save();
  res.status(200).json({
    code: 200,
    message: "  Result Created successfully",
    error: false,
    status: true,
  });

}

const putResult = async (req, res) => {
  try {

    const { name, regno, course, topic, total_marks, obtain_marks } = req.body

    let data = await resultSchema.updateOne(
      { regno: req.params.regno },
      {
        $set: {
          name, regno, course, topic, total_marks, obtain_marks
        }
      }
    );
    res.send(data);

  } catch (err) {
    console.log(err)
  }

}
const delResult = async (req, res) => {
  try {
    console.log(req.params)
    let data = await resultSchema.deleteOne({ regno: req.params.regno });
    res.send(data);
  } catch (err) {
    console.log(err)

  }

}
const getAllResult = async (req, res) => {
  let data = await resultSchema.find();
  res.send(data)
}
const getsingleResult = async (req, res) => {
  let data = await resultSchema.find({ regno: req.params.regno });
  res.send(data)
}

{/*     ScheduleClas */ }
const getAllScheduleClass = async (req, res) => {
  let data = await Sheduleclass_Schema.find();
  res.send(data)
}
const createScheduleClass = async (req, res) => {
  const { topic, course, time, date, contact_instructor, link } = req.body
  let data = new Sheduleclass_Schema({ topic, course, time, date, contact_instructor, link });

  await data.save();
  res.status(200).json({
    code: 200,
    message: "  Class Scheduled successfully",
    error: false,
    status: true,
  });

}

const putScheduleClass = async (req, res) => {
  try {

    const { topic, course, time, date, contact_instructor, link } = req.body

    let data = await Sheduleclass_Schema.updateOne(
      { contact_instructor: req.params.contact_instructor },
      {
        $set: { topic, course, time, date, contact_instructor, link }
      }
    );
    res.send(data);

  } catch (err) {
    console.log(err)
  }

}
const delScheduleClass = async (req, res) => {
  try {
    console.log(req.params)
    let data = await Sheduleclass_Schema.deleteOne({ contact_instructor: req.params.contact_instructor });
    res.send(data);
  } catch (err) {
    console.log(err)

  }

}

{/*     ADD ASSGINMENT */ }
const getAssignment = async (req, res) => {
  let data = await assignment_Schema.find();
  res.send(data)
}
const createAssignment = async (req, res) => {

  const { title, instructions, due_date, contact_instructor } = req.body;
  let upload = req.file.filename
  console.log(upload)
  let data = new assignment_Schema({ title, instructions, due_date, upload, contact_instructor });

  await data.save();
  res.status(200).json({
    code: 200,
    message: "  Assignment created successfully",
    error: false,
    status: true,
  });


}

const putAssignment = async (req, res) => {
  try {

    let upload = req.file.filename
    const { title, instructions, due_date, contact_instructor } = req.body


    let data = await assignment_Schema.updateOne(
      { contact_instructor: req.params.contact_instructor },
      {
        $set: { title, instructions, due_date, upload, contact_instructor }
      }
    );
    res.send(data);

  } catch (err) {
    console.log(err)
  }

}
const delAssignment = async (req, res) => {
  try {

    let data = await assignment_Schema.deleteOne({ contact_instructor: req.params.contact_instructor });
    res.send(data);
  } catch (err) {
    console.log(err)

  }

}
const createEvent = async (req, resp) => {
  try {

    const img = req.file.filename;

    const { event, desc, from, to } = req.body
    let data = new EventsSchema({ event, desc, from, to, img });
    let result = await data.save();
    resp.send(result)
  } catch (err) {
    console.log(err);
  }
}

const getEvent = async (req, res) => {

  let data = await EventsSchema.find();
  res.send(data);
}
const getSingleEvent = async (req, res) => {

  let data = await EventsSchema.find({ _id: req.params._id });

  res.send(data);
}

const deleteEvent = async (req, resp) => {
  try {
    console.log(req.params);
    let data = await EventsSchema.deleteOne({ _id: req.params._id });
    resp.send(data);
  } catch (err) {
    console.log(err);
  }
}
const putEvent = async (req, res) => {
  try {
    const img = req.file.filename;

    const { event, desc, from, to } = req.body
    let data = await EventsSchema.updateOne(
      { _id: req.params._id },
      { $set: { event, desc, from, to, img } }
    );
    res.send(data);

  } catch (err) {
    console.log(err)
  }

}

const createQuery = async (req, resp) => {
  try {

    const { regno, name, query, date, status, response } = req.body
    let data = new QueriesSchema({ regno, name, query, date, status, response });
    let result = await data.save();
    resp.send(result)
  } catch (err) {
    console.log(err);
  }
}

const getQuery = async (req, res) => {

  let data = await QueriesSchema.find();
  res.send(data);
}
const getSingleQuery = async (req, res) => {

  let data = await QueriesSchema.find({ regno: req.params.regno });

  res.send(data);
}

const deleteQuery = async (req, resp) => {
  try {
    console.log(req.params);
    let data = await QueriesSchema.deleteOne({ _id: req.params._id });
    resp.send(data);
  } catch (err) {
    console.log(err);
  }
}
const putQuery = async (req, res) => {
  try {

    const { regno, name, query, date, status, response } = req.body
    let data = await QueriesSchema.updateOne(
      { _id: req.params._id },
      { $set: { regno, name, query, date, status, response } }
    );
    res.send(data);

  } catch (err) {
    console.log(err)
  }

}
const createAcademic = async (req, resp) => {
  try {

    const { student, course } = req.body
    let data = new AcademicSchema({ student, course });
    let result = await data.save();
    resp.send(result)
  } catch (err) {
    console.log(err);
  }
}

const getAcademic = async (req, res) => {

  let data = await AcademicSchema.find();
  res.send(data);
}
const getSingleAcademic = async (req, res) => {

  let data = await AcademicSchema.find({ _id: req.params._id });

  res.send(data);
}

const deleteAcademic = async (req, resp) => {
  try {
    console.log(req.params);
    let data = await AcademicSchema.deleteOne({ _id: req.params._id });
    resp.send(data);
  } catch (err) {
    console.log(err);
  }
}
const putAcademic = async (req, res) => {
  try {

    const { student, course } = req.body
    let data = await AcademicSchema.updateOne(
      { _id: req.params._id },
      { $set: { student, course } }
    );
    res.send(data);

  } catch (err) {
    console.log(err)
  }

}


const createContentVideo = async (req, resp) => {
  try {
    const video = req.file.filename;
    const { name, duration, course, desc } = req.body
    let data = new COurseContentVedioSchema({ name, duration, video, course, desc });
    let result = await data.save();
    resp.send(result)
  } catch (err) {
    console.log(err);
  }
}

const getContentVideo = async (req, res) => {

  let data = await COurseContentVedioSchema.find();
  res.send(data);
}
const getSingleContentVideo = async (req, res) => {

  let data = await COurseContentVedioSchema.find({ _id: req.params._id });

  res.send(data);
}

const deleteContentVideo = async (req, resp) => {
  try {
    console.log(req.params);
    let data = await COurseContentVedioSchema.deleteOne({ _id: req.params._id });
    resp.send(data);
  } catch (err) {
    console.log(err);
  }
}
const putContentVideo = async (req, res) => {
  try {
    const video = req.file.filename;
    const { name, duration, course, desc } = req.body
    let data = await COurseContentVedioSchema.updateOne(
      { _id: req.params._id },
      { $set: { name, duration, video, course, desc } }
    );
    res.send(data);

  } catch (err) {
    console.log(err)
  }

}


const createContentDoc = async (req, resp) => {
  try {
    const doc = req.file.filename
    const { name, course } = req.body
    let data = new COurseContentDocxSchema({ name, doc, course });
    let result = await data.save();
    resp.send(result)
  } catch (err) {
    console.log(err);
  }
}

const getContentDoc = async (req, res) => {

  let data = await COurseContentDocxSchema.find();
  res.send(data);
}
const getSingleContentDoc = async (req, res) => {

  let data = await COurseContentDocxSchema.find({ _id: req.params._id });

  res.send(data);
}

const deleteContentDoc = async (req, resp) => {
  try {
    console.log(req.params);
    let data = await COurseContentDocxSchema.deleteOne({ _id: req.params._id });
    resp.send(data);
  } catch (err) {
    console.log(err);
  }
}
const putContentDoc = async (req, res) => {
  try {
    const doc = req.file.filename
    const { name, course } = req.body
    let data = await COurseContentDocxSchema.updateOne(
      { _id: req.params._id },
      { $set: { name, doc, course } }
    );
    res.send(data);

  } catch (err) {
    console.log(err)
  }

}

const createContentLink = async (req, resp) => {
  try {

    const { name, link, course } = req.body
    let data = new COurseContentLinkSchema({ name, link, course });
    let result = await data.save();
    resp.send(result)
  } catch (err) {
    console.log(err);
  }
}

const getContentLink = async (req, res) => {

  let data = await COurseContentLinkSchema.find();
  res.send(data);
}
const getSingleContentLink = async (req, res) => {

  let data = await COurseContentLinkSchema.find({ _id: req.params._id });

  res.send(data);
}

const deleteContentLink = async (req, resp) => {
  try {
    console.log(req.params);
    let data = await COurseContentLinkSchema.deleteOne({ _id: req.params._id });
    resp.send(data);
  } catch (err) {
    console.log(err);
  }
}
const putContentLink = async (req, res) => {
  try {

    const { name, link, course } = req.body
    let data = await COurseContentLinkSchema.updateOne(
      { _id: req.params._id },
      { $set: { name, link, course } }
    );
    res.send(data);

  } catch (err) {
    console.log(err)
  }

}
const createStStatusReq = async (req, resp) => {
  try {

    const { regno, name, status } = req.body
    let data = new stStatusReqSchema({ regno, name, status });
    let result = await data.save();
    resp.send(result)
  } catch (err) {
    console.log(err);
  }
}

const getStStatusReq = async (req, res) => {

  let data = await stStatusReqSchema.find();
  res.send(data);
}
const getSingleStStatusReq = async (req, res) => {

  let data = await stStatusReqSchema.find({ _id: req.params._id });

  res.send(data);
}

const deleteStStatusReq = async (req, resp) => {
  try {
    console.log(req.params);
    let data = await stStatusReqSchema.deleteOne({ _id: req.params._id });
    resp.send(data);
  } catch (err) {
    console.log(err);
  }
}
const putStStatusReq = async (req, res) => {
  try {

    const { regno, name, status } = req.body
    let data = await stStatusReqSchema.updateOne(
      { _id: req.params._id },
      { $set: { regno, name, status } }
    );
    res.send(data);

  } catch (err) {
    console.log(err)
  }

}
module.exports = {
  createContentLink, getContentLink, getSingleContentLink, getSingleContentLink, deleteContentLink, putContentLink,
  createContentDoc, getContentDoc, getSingleContentDoc, deleteContentDoc, putContentDoc,
  createContentVideo, getContentVideo, getSingleContentVideo, deleteContentVideo, putContentVideo,
  createAcademic, getAcademic, getSingleAcademic, deleteAcademic, putAcademic, createEvent, getEvent, getSingleEvent, deleteEvent, putEvent, createQuery, getQuery, getSingleQuery, deleteQuery, putQuery,
  getAssignment, createAssignment, putAssignment, delAssignment, createAddFee, putAddFee, delAddFee, getAllAddFee, gettotalpaidFee, getsingleFee, getFee
  , loginInstructor, createScheduleClass, putScheduleClass, delScheduleClass, getAllScheduleClass, getAllResult, getsingleResult, delResult, putResult, createResult,
  putStStatusReq, deleteStStatusReq, getSingleStStatusReq, getStStatusReq, createStStatusReq
}
