const express = require("express");
const Router = express.Router();
const {
  createCategory,
  putCategory,
  getCategory,
  getSingleCategory,
  deleteCategory,
  createInstructor,
  putInstructor,
  getInstructor,
  getCourse,
  createCourse,
  putCourse,
  createAdmin,
  loginAdmin,
  putAdmin,
  getAdmin,
  deleteAdmin,
  getSingleInstructor,
  deleteCourse,
  deleteInstructor,
  createEnquiry,
  getEnquiry,
  deleteEnquiry,
  createExpense,
  handleEnquiryStatus,
  getExpense,
  deleteExpense,
  putExpense,
  putEnquiry,
  getSingleCourse,
  createStOfMonth,
  getStOfMonth,
  putStOfMonth,
  delStOfMonth,
  createincome,
  getincome,
  getSingleincome,
  deleteincome,
  putincome,
  getSingleExpense,
  createLibrary,
  getLibrary,
  getSingleLibrary,
  deleteLibrary,
  putLibrary,
  getSingleAdmin,
  getSingleinstructorofmonth,
  getinstructorOfMonth,
  putinstructorOfMonth,
  delinstructorOfMonth,
  createinstructorOfMonth,

  ///aprove St Status
  putApproveStStatus,

  createAppointment,
  putAppointment,
  getAppointment,
  getSingleAppointment,
  deleteAppointment,

  createrolepermission,
  getrolepermission,
  getSinglerolepermission,
  deleterolepermission,
  putrolepermission,
  createContact,
  getContact,
  getSingleContact,
  deleteContact,
  putContact,
  SearchCourses,
  createJoinAsInstructor,
  getJoinAsInstructor,
  getSingleJoinAsInstructor,
  putJoinAsInstructor,
  delJoinAsInstructor,
  GetAllInstructorStudent,
  UpdateInstructorData,
  GetAllInstructorWithCourse,
  // Batches
  CreateBatch,
  UpdateBatches,
  GetAllBatches,
  DeleteBatches,
  // certificates
  GenerateCertificates,
  UpdateCertificate,
  DeleteCertificate,
  GetAllCertificates,
  GenerateSerialNumber,
  // ---------cetrificates end --------------
} = require("../../controllers/admin/AdminController");
const course_upload = require("../../multer/admin/course_upload");
const studentofmonth_upload = require("../../multer/admin/StudentOfMonth");
const instructorofmonth_upload = require("../../multer/admin/Instructorofmonth");
const instructorProfile = require("../../multer/admin/InsructorProfile");
const Admin_upload = require("../../multer/admin/Amin_upload");
const joininstructor_upload = require("../../multer/admin/joininstructor_upload");

Router.route("/joininstructor").post(
  joininstructor_upload.single("cv"),
  createJoinAsInstructor
);
Router.route("/joininstructor").get(getJoinAsInstructor);
Router.route("/joininstructor/:_id").get(getSingleJoinAsInstructor);
Router.route("/joininstructor/:_id").delete(delJoinAsInstructor);
Router.route("/joininstructor/:_id").put(
  joininstructor_upload.single("cv"),
  putJoinAsInstructor
);

///role permission section
Router.route("/permission/:_id").put(putrolepermission);
Router.route("/permission/:_id").delete(deleterolepermission);
Router.route("/permission/:id").get(getSinglerolepermission);
Router.route("/permission").post(createrolepermission);
Router.route("/permission").get(getrolepermission);
///appointment
Router.route("/appoint/:_id").put(putAppointment);
Router.route("/appoint/:_id").delete(deleteAppointment);
Router.route("/appoint/:_id").get(getSingleAppointment);
Router.route("/appoint").post(createAppointment);
Router.route("/appoint").get(getAppointment);

//contact form
Router.route("/contact/:_id").put(putContact);
Router.route("/contact/:_id").delete(deleteContact);
Router.route("/contact/:_id").get(getSingleContact);
Router.route("/contact").post(createContact);
Router.route("/contact").get(getContact);
//Admin
Router.route("/admin").post(createAdmin);
Router.route("/adminlogin").post(loginAdmin);
Router.route("/admin").get(getAdmin);
Router.route("/admin/:_id").get(getSingleAdmin);
Router.route("/admin/:_id").delete(deleteAdmin);
Router.route("/admin/:_id").put(Admin_upload.single("profilePic"), putAdmin);

///Student Status Request api.........
Router.route("/approvestatus/:regno").put(putApproveStStatus);

//Category
Router.route("/category/:_id").put(putCategory);
Router.route("/category/:_id").delete(deleteCategory);
Router.route("/category/:_id").get(getSingleCategory);
Router.route("/category").post(createCategory);
Router.route("/category").get(getCategory);

Router.route("/library/:book_no").put(putLibrary);
Router.route("/library/:book_no").delete(deleteLibrary);
Router.route("/library/:book_no").get(getSingleLibrary);
Router.route("/library").post(createLibrary);
Router.get("/library", getLibrary);

Router.route("/income").post(createincome);
Router.route("/income").get(getincome);
Router.route("/income/:_id").delete(deleteincome);
Router.route("/income/:_id").get(getSingleincome);
Router.route("/income/:_id").put(putincome);

Router.route("/instructor").post(createInstructor);
Router.route("/instructor").get(getInstructor);
Router.route("/instructor/:_id").delete(deleteInstructor);
Router.route("/instructor/:_id").put(
  instructorProfile.single("profilePic"),
  putInstructor
);
Router.route("/instructor/:_id").patch(UpdateInstructorData);
Router.route("/instructor/:_id").get(getSingleInstructor);

Router.route("/course").post(course_upload.single("img"), createCourse);
Router.route("/course").get(getCourse);
Router.route("/course/:_id").get(getSingleCourse);
Router.route("/course/students/:instructor").get(GetAllInstructorStudent);
Router.route("/search-course").get(SearchCourses);
Router.route("/course/:_id").delete(deleteCourse);
Router.route("/course/:_id").put(course_upload.single("img"), putCourse);
Router.route("/enquiry").post(createEnquiry);
Router.route("/enquiry").get(getEnquiry);
Router.route("/enquiry/:contact").delete(deleteEnquiry);
Router.route("/enquiry/:contact").put(putEnquiry);
// change enquiry enroll status
Router.route("/enquiry/:id").get(handleEnquiryStatus);

Router.route("/expense").post(createExpense);
Router.route("/expense/:_id").put(putExpense);
Router.route("/expense").get(getExpense);
Router.route("/expense/:_id").get(getSingleExpense);
Router.route("/expense/:_id").delete(deleteExpense);

Router.route("/studentofmonth").post(
  studentofmonth_upload.single("img"),
  createStOfMonth
);
Router.route("/studentofmonth").get(getStOfMonth);
Router.route("/studentofmonth/:regno").delete(delStOfMonth);
Router.route("/studentofmonth/:regno").put(
  studentofmonth_upload.single("img"),
  putStOfMonth
);

Router.route("/instructorofmonth").post(
  instructorofmonth_upload.single("img"),
  createinstructorOfMonth
);
Router.route("/instructorofmonth").get(getinstructorOfMonth);
Router.route("/instructorofmonth/:_id").delete(delinstructorOfMonth);
Router.route("/instructorofmonth/:_id").put(
  instructorofmonth_upload.single("img"),
  putinstructorOfMonth
);
Router.route("/instructorofmonth/:_id").get(getSingleinstructorofmonth);

// Batches
Router.route("/batch/create").post(CreateBatch);
Router.route("/batch/update/:id").patch(UpdateBatches);
Router.route("/batch/get").get(GetAllBatches);
Router.route("/batch/delete/:id").delete(DeleteBatches);

// certificates
Router.route("/certificate/generate").post(GenerateCertificates);
Router.route("/certificate/get").get(GetAllCertificates);
Router.route("/certificate/update/:id").patch(UpdateCertificate);
Router.route("/certificate/delete/:id").delete(DeleteCertificate);
Router.route("/certificate/generate/number").get(GenerateSerialNumber);

// certificates
// GenerateCertificates,
// UpdateCertificate,
// DeleteCertificate,
// GetAllCertificates,
// ---------cetrificates end --------------

module.exports = Router;
