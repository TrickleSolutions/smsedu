const express = require("express");
const Router = express.Router();
const assignment_upload = require("../../multer/teachers/assignment_upload");
const coursecontentvideo_upload = require("../../multer/teachers/CourseContentVideo");
const CourseContentDoc_upload = require("../../multer/teachers/coursecontentdoc");
const events_upload = require("../../multer/teachers/evets");
const {
  getAssignment,
  createAssignment,
  putAssignment,
  delAssignment,
  createAddFee,
  getsingleFee,
  putAddFee,
  delAddFee,
  getAllAddFee,
  gettotalpaidFee,
  loginInstructor,
  getAllResult,
  getsingleResult,
  delResult,
  putResult,
  createResult,
  createScheduleClass,
  putScheduleClass,
  delScheduleClass,
  getAllScheduleClass,
  createEvent,
  getEvent,
  getSingleEvent,
  deleteEvent,
  putEvent,
  createQuery,
  getQuery,
  getSingleQuery,
  deleteQuery,
  putQuery,
  getFee,
  createAcademic,
  getAcademic,
  getSingleAcademic,
  deleteAcademic,
  putAcademic,
  createContentLink,
  getContentLink,
  getSingleContentLink,
  deleteContentLink,
  putContentLink,
  createContentDoc,
  getContentDoc,
  getSingleContentDoc,
  deleteContentDoc,
  putContentDoc,
  createContentVideo,
  getContentVideo,
  getSingleContentVideo,
  deleteContentVideo,
  putContentVideo,
  putStStatusReq,
  deleteStStatusReq,
  getSingleStStatusReq,
  getStStatusReq,
  createStStatusReq,
} = require("../../controllers/teachers/TeacherController");
/**fee */

Router.route("/reqststatus/:_id").put(putStStatusReq);
Router.route("/reqststatus/:_id").delete(deleteStStatusReq);
Router.route("/reqststatus/:_id").get(getSingleStStatusReq);
Router.route("/reqststatus").post(createStStatusReq);
Router.route("/reqststatus").get(getStStatusReq);

Router.route("/videocontent/:_id").put(
  coursecontentvideo_upload.single("video"),
  putContentVideo
);
Router.route("/videocontent/:_id").delete(deleteContentVideo);
Router.route("/videocontent/:_id").get(getSingleContentVideo);
Router.route("/videocontent").post(
  coursecontentvideo_upload.single("video"),
  createContentVideo
);
Router.get("/videocontent", getContentVideo);

Router.route("/linkcontent/:_id").put(putContentLink);
Router.route("/linkcontent/:_id").delete(deleteContentLink);
Router.route("/linkcontent/:_id").get(getSingleContentLink);
Router.route("/linkcontent").post(createContentLink);
Router.get("/linkcontent", getContentLink);

Router.route("/docxconent/:_id").put(
  CourseContentDoc_upload.single("doc"),
  putContentDoc
);
Router.route("/docxconent/:_id").delete(deleteContentDoc);
Router.route("/docxconent/:_id").get(getSingleContentDoc);
Router.route("/docxconent").post(
  CourseContentDoc_upload.single("doc"),
  createContentDoc
);
//Router.route('/docxconent').post(createContentDoc);
Router.get("/docxconent", getContentDoc);

// Router.route('/academic/:regno').put(putAcademic);
// Router.route('/academic/:regno').delete(deleteAcademic);
// Router.route('/academic/:regno').get(getSingleAcademic);
// Router.route('/academic').post( createAcademic);
// Router.get('/academic',getAcademic)

Router.route("/academic/:_id").put(putAcademic);
Router.route("/academic/:_id").delete(deleteAcademic);
Router.route("/academic/:_id").get(getSingleAcademic);
Router.route("/academic").post(createAcademic);
Router.get("/academic", getAcademic);

Router.route("/queries/:_id").put(putQuery);
Router.route("/queries/:_id").delete(deleteQuery);
Router.route("/queries/:regno").get(getSingleQuery);
Router.route("/queries").post(createQuery);
Router.get("/queries", getQuery);

Router.route("/event/:_id").put(events_upload.single("img"), putEvent);
Router.route("/event/:_id").delete(deleteEvent);
Router.route("/event/:_id").get(getSingleEvent);
Router.route("/event").post(events_upload.single("img"), createEvent);
Router.get("/event", getEvent);

Router.route("/fee/:regno").put(putAddFee);
Router.route("/fee").post(createAddFee);
Router.route("/fee").get(getFee);
Router.route("/fee/:regno").delete(delAddFee);
Router.route("/fee/:regno").get(getsingleFee);
Router.route("/totalpaidfee").get(gettotalpaidFee);
/*  Instructor Login */
Router.route("/instructorlogin").get(loginInstructor);
/*  Class ROUTER */
Router.route("/class").post(createScheduleClass);
Router.route("/class/:contact_instructor").put(putScheduleClass);
Router.route("/class/:contact_instructor").delete(delScheduleClass);
Router.route("/class").get(getAllScheduleClass);

/**Result wala*/

Router.route("/marks").post(createResult);
Router.get("/marks", getAllResult);

Router.route("/marks/:regno").put(putResult);
Router.route("/marks/:regno").delete(delResult);
Router.route("/marks/:regno").get(getsingleResult);

/**ADD ASSignmenyt */

//  Router.route('/assign').post(assignment_upload.single('upload',{name:"upload"}),createAssignment);
Router.post(
  "/assign",
  assignment_upload.single("upload", { name: "upload" }),
  createAssignment
);
Router.route("/assign/:contact_instructor").put(
  assignment_upload.single("upload"),
  putAssignment
);
Router.route("/assign/:contact_instructor").delete(delAssignment);
Router.route("/assign").get(getAssignment);
module.exports = Router;
