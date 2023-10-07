const InstructorRegisterSchema = require("../../models/admin/InstructorModel");
const AdminRegisterSchema = require("../../models/admin/Admin_reg");
const CourseSchema = require("../../models/admin/Add_Course");
const Enquiry_adminSchema = require("../../models/admin/Enquiry_admin");
const ExpenseSchema = require("../../models/admin/Expense_admin");
const StudentOfMonthSchema = require("../../models/admin/StudentOfMonth");
const IncomeSchema = require("../../models/admin/income");
const LibrarySchema = require("../../models/admin/Library");
const CategorySchema = require("../../models/admin/category");
const InstructorOfMonthSchema = require("../../models/admin/instructorofmonth");
const Student_RegisterSchema = require("../../models/students/StudentModel");
const AppointmentSchema = require("../../models/admin/Appointment");
const rolesPermissionSchema = require("../../models/admin/permission");
const ContactSchema = require("../../models/admin/contactform");
const JoinInstructorSchema = require("../../models/admin/joinasinstructor");
const generateEnquiryNo = require("../../funcs/enquiry");

function checkEmailOrMobile(inputString) {
  // Regular expression for matching email addresses
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Regular expression for matching mobile phone numbers (assuming US format)
  const mobilePattern = /^\d{10}$/; // Match exactly 10 digits

  if (emailPattern.test(inputString)) {
    return "email";
  } else if (mobilePattern.test(inputString)) {
    return "contact";
  } else {
    return "Neither";
  }
}

const createAdmin = async (req, resp) => {
  try {
    const {
      name,
      address,
      contact,
      email,
      gender,
      dob,
      qualification,
      degree,
      exp,
      password,
      role,
      status,
    } = req.body;

    const usermail = await AdminRegisterSchema.findOne({ email: email });
    console.log(usermail);
    if (usermail) {
      resp.status(404).json({
        code: 404,
        message: "user aleready exist....  ",
        data: [],
        error: false,
        status: false,
      });
    } else {
      let data = new AdminRegisterSchema({
        name,
        address,
        contact,
        email,
        gender,
        dob,
        qualification,
        degree,
        exp,
        password,
        role,
        status,
      });
      await data.save();
      resp.status(200).json({
        code: 200,
        message: "user  Register successfully",
        error: false,
        status: true,
      });
    }
  } catch (err) {
    console.log(err);
  }
};
const loginAdmin = async (req, resp, next) => {
  try {
    const inputType = checkEmailOrMobile(req.body.email);
    const email = req.body.email;
    const password = req.body.password;
    const usermail = await AdminRegisterSchema.findOne({
      [inputType]: email,
      password: password,
    });
    if (usermail) {
      resp.status(200).json({
        code: 200,
        message: "user Login successfully",
        data: {
          _id: usermail._id,
          name: usermail.name,
          email: usermail.email,
          contact: usermail.contact,
          role: usermail.role,
        },
        error: false,
        status: true,
      });
      console.log(usermail._id);
    } else {
      resp.status(404).json({
        code: 404,
        message: "Invalid User details, Try Again.  ",
        data: [],
        error: false,
        status: false,
      });
    }
  } catch (err) {
    console.log(err);
  }
};
const putAdmin = async (req, res) => {
  try {
    const profilePic = req.file.filename;
    const {
      name,
      address,
      contact,
      email,
      gender,
      dob,
      qualification,
      degree,
      exp,
      password,
      role,
      status,
    } = req.body;
    let data = await AdminRegisterSchema.updateOne(
      { _id: req.params._id },
      {
        $set: {
          name,
          address,
          contact,
          email,
          gender,
          dob,
          qualification,
          degree,
          exp,
          password,
          profilePic,
          role,
          status,
        },
      }
    );
    res.send(data);
  } catch (err) {
    console.log(err);
  }
};
const getSingleAdmin = async (req, res, next) => {
  try {
    const usermail = await AdminRegisterSchema.find({ _id: req.params._id });
    res.send(usermail);
  } catch (err) {
    console.log(err);
  }
};

const getAdmin = async (req, res, next) => {
  try {
    const usermail = await AdminRegisterSchema.find();
    res.send(usermail);
  } catch (err) {
    console.log(err);
  }
};

const deleteAdmin = async (req, resp) => {
  try {
    // console.log(req.params.contact);
    let data = await AdminRegisterSchema.deleteOne({ _id: req.params._id });
    resp.send(data);
  } catch (err) {
    console.log(err);
  }
};

const createInstructor = async (req, resp) => {
  try {
    const name = req.body.name;
    const profilePic = req.file.filename;
    const address = req.body.address;
    const contact = req.body.contact;
    const email = req.body.email;
    const gender = req.body.gender;
    const dob = req.body.dob;
    const qualification = req.body.qualification;
    const degree = req.body.degree;
    const salary = req.body.salary;
    const exp = req.body.exp;
    const password = req.body.password;
    const status = req.body.status;

    const usermail = await InstructorRegisterSchema.findOne({ email: email });
    console.log(usermail);
    if (usermail) {
      resp.status(404).json({
        code: 404,
        message: "user aleready exist....  ",
        data: [],
        error: false,
        status: false,
      });
    } else {
      let data = new InstructorRegisterSchema({
        name,
        address,
        profilePic,
        contact,
        email,
        gender,
        dob,
        qualification,
        degree,
        salary,
        exp,
        password,
        status,
      });

      let result = await data.save();

      resp.status(200).json({
        code: 200,
        message: "user  Register successfully",
        data: result,
        error: false,
        status: true,
      });
    }
  } catch (err) {
    console.log(err);
  }
};
const putInstructor = async (req, res) => {
  try {
    const name = req.body.name;
    const address = req.body.address;
    const contact = req.body.contact;
    const email = req.body.email;
    const gender = req.body.gender;
    const dob = req.body.dob;
    const qualification = req.body.qualification;
    const degree = req.body.degree;
    const exp = req.body.exp;
    const password = req.body.password;
    const profilePic = req.file.filename;
    const status = req.body.status;

    let data = await InstructorRegisterSchema.updateOne(
      { _id: req.params._id },
      {
        $set: {
          name,
          address,
          contact,
          email,
          gender,
          dob,
          qualification,
          degree,
          exp,
          password,
          profilePic,
          status,
        },
      }
    );
    res.send(data);
  } catch (err) {
    console.log(err);
  }
};

const getInstructor = async (req, res) => {
  let data = await InstructorRegisterSchema.find();

  res.send(data);
};
const getSingleInstructor = async (req, res) => {
  let data = await InstructorRegisterSchema.find({ _id: req.params._id });

  res.send(data);
};
const deleteInstructor = async (req, resp) => {
  try {
    //console.log(req.params.contact);
    let data = await InstructorRegisterSchema.deleteOne({
      _id: req.params._id,
    });
    resp.send(data);
  } catch (err) {
    console.log(err);
  }
};
const createCourse = async (req, resp) => {
  try {
    let img = req.file.filename;
    let title = req.body.title;
    let desc = req.body.desc;
    let level = req.body.level;
    let lessons = req.body.lessons;
    let duration = req.body.duration;
    let price = req.body.price;
    let rating = req.body.rating;
    let category = req.body.category;
    let instructor = req.body.instructor;
    let status = req.body.status;

    const usermail = await CourseSchema.findOne({ title: title });
    console.log(usermail);
    if (usermail) {
      resp.status(404).json({
        code: 404,
        message: "Course aleready exist....  ",
        data: [],
        error: false,
        status: false,
      });
    } else {
      let data = new CourseSchema({
        img,
        title,
        desc,
        level,
        lessons,
        duration,
        price,
        rating,
        category,
        instructor,
        status,
      });

      let result = await data.save();

      resp.status(200).json({
        code: 200,
        message: "Course  Register successfully",

        error: false,
        status: true,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const putCourse = async (req, res) => {
  try {
    let img = req.file.filename;
    let title = req.body.title;
    let desc = req.body.desc;
    let level = req.body.level;
    let lessons = req.body.lessons;
    let duration = req.body.duration;
    let price = req.body.price;
    let rating = req.body.rating;
    let category = req.body.category;
    let instructor = req.body.instructor;
    let status = req.body.status;
    let data = await CourseSchema.updateOne(
      { _id: req.params._id },
      {
        $set: {
          img,
          title,
          desc,
          level,
          lessons,
          duration,
          price,
          rating,
          category,
          instructor,
          status,
        },
      }
    );
    res.send(data);
  } catch (err) {
    console.log(err);
  }
};
const getCourse = async (req, res) => {
  let data = await CourseSchema.find();

  res.send(data);
};
const getSingleCourse = async (req, res) => {
  let data = await CourseSchema.find({ _id: req.params._id });

  res.send(data);
};

const deleteCourse = async (req, resp) => {
  try {
    console.log(req.params);
    let data = await CourseSchema.deleteOne({ _id: req.params._id });
    resp.send(data);
  } catch (err) {
    console.log(err);
  }
};

const createEnquiry = async (req, resp) => {
  try {
    // const {
    //   name,
    //   fname,
    //   address,
    //   dob,
    //   course,
    //   contact,
    //   email,
    //   gender,
    //   counseller,
    //   note,
    // } = req.body;
    const formData = req.body;

    const usermail = await Enquiry_adminSchema.findOne({
      contact: formData.contact,
    });
    console.log(usermail);
    if (usermail) {
      resp.status(404).json({
        code: 404,
        message: "user aleready exist....  ",
        data: [],
        error: false,
        status: false,
      });
    } else {
      // generate the enquiry id
      const EnquiryId = await generateEnquiryNo();
      let data = new Enquiry_adminSchema({
        enquiryNo: EnquiryId,
        ...formData,
      });

      await data.save();

      resp.status(200).json({
        code: 200,
        message: "Enquiry created successfully",

        error: false,
        status: true,
      });
    }
  } catch (err) {
    console.log(err);
  }
};
const putEnquiry = async (req, res) => {
  try {
    // const {
    //   name,
    //   fname,
    //   address,
    //   dob,
    //   epx_join,
    //   course,
    //   contact,
    //   email,
    //   gender,
    //   counseller,
    //   note,
    // } = req.body;
    const formData = req.body;

    let data = await Enquiry_adminSchema.updateOne(
      { contact: req.params.contact },
      {
        $set: formData,
      }
    );
    res.send(data);
  } catch (err) {
    console.log(err);
  }
};
const getEnquiry = async (req, res) => {
  let data = await Enquiry_adminSchema.find();

  res.send(data);
};
const deleteEnquiry = async (req, resp) => {
  try {
    console.log(req.params);
    let data = await Enquiry_adminSchema.deleteOne({
      contact: req.params.contact,
    });
    resp.send(data);
  } catch (err) {
    console.log(err);
  }
};

// Change the status of the enquiry
const handleEnquiryStatus = async (req, res) => {
  const { status } = req.query;
  const { id } = req.params;
  console.log(id, status);

  try {
    // find the enquiry
    const isEnquiry = await Enquiry_adminSchema.findByIdAndUpdate(
      id,
      {
        status: status,
      },
      { new: true }
    );
    if (!isEnquiry)
      return res.status(404).json({ error: true, message: "no enquiry found" });

    res.status(200).json({ error: false, message: "success", data: isEnquiry });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
};

const createExpense = async (req, resp) => {
  try {
    const { time, date, amount, desc } = req.body;

    let data = new ExpenseSchema({ time, date, amount, desc });

    let result = await data.save();

    resp.send(result);
  } catch (err) {
    console.log(err);
  }
};

const getExpense = async (req, res) => {
  let data = await ExpenseSchema.find();

  res.send(data);
};
const getSingleExpense = async (req, res) => {
  let data = await ExpenseSchema.find({ _id: req.params._id });

  res.send(data);
};

const deleteExpense = async (req, resp) => {
  try {
    console.log(req.params);
    let data = await ExpenseSchema.deleteOne({ _id: req.params._id });
    resp.send(data);
  } catch (err) {
    console.log(err);
  }
};
const putExpense = async (req, res) => {
  try {
    const { time, date, amount, desc } = req.body;

    let data = await ExpenseSchema.updateOne(
      { _id: req.params._id },
      { $set: { time, date, amount, desc } }
    );
    res.send(data);
  } catch (err) {
    console.log(err);
  }
};
const createStOfMonth = async (req, res) => {
  const { regno, name, course } = req.body;
  const img = req.file.filename;
  let data = new StudentOfMonthSchema({ img, regno, name, course });
  let result = await data.save();
  res.status(200).json({
    code: 200,
    message: "  Student of month is Created successfully",
    error: false,
    status: true,
  });
};
const getStOfMonth = async (req, res) => {
  let data = await StudentOfMonthSchema.find();

  res.send(data);
};

const putStOfMonth = async (req, res) => {
  try {
    const img = req.file.filename;
    const { regno, name, course } = req.body;
    let data = await StudentOfMonthSchema.updateOne(
      { regno: req.params.regno },
      {
        $set: {
          img,
          regno,
          name,
          course,
        },
      }
    );
    res.send(data);
  } catch (err) {
    console.log(err);
  }
};
const delStOfMonth = async (req, res) => {
  try {
    console.log(req.params);
    let data = await StudentOfMonthSchema.deleteOne({
      regno: req.params.regno,
    });
    res.send(data);
  } catch (err) {
    console.log(err);
  }
};

const createincome = async (req, resp) => {
  try {
    const { time, date, amount, desc } = req.body;
    let data = new IncomeSchema({
      time,
      date,
      amount,
      desc,
    });

    let result = await data.save();

    resp.send(result);
  } catch (err) {
    console.log(err);
  }
};

const getincome = async (req, res) => {
  let data = await IncomeSchema.find();

  res.send(data);
};
const getSingleincome = async (req, res) => {
  let data = await IncomeSchema.find({ _id: req.params._id });

  res.send(data);
};
const deleteincome = async (req, resp) => {
  try {
    console.log(req.params);
    let data = await IncomeSchema.deleteOne({ _id: req.params._id });
    resp.send(data);
  } catch (err) {
    console.log(err);
  }
};
const putincome = async (req, res) => {
  try {
    const { time, date, amount, desc } = req.body;
    let data = await IncomeSchema.updateOne(
      { _id: req.params._id },
      {
        $set: {
          time,
          date,
          amount,
          desc,
        },
      }
    );
    res.send(data);
  } catch (err) {
    console.log(err);
  }
};

const createLibrary = async (req, resp) => {
  try {
    const {
      des,
      title,
      book_no,
      isbn_no,
      publisher,
      author,
      rack_no,
      qty,
      available,
      date,
    } = req.body;

    let data = new LibrarySchema({
      des,
      title,
      book_no,
      isbn_no,
      publisher,
      author,
      rack_no,
      qty,
      available,
      date,
    });

    let result = await data.save();

    resp.send(result);
  } catch (err) {
    console.log(err);
  }
};

const getLibrary = async (req, res) => {
  let data = await LibrarySchema.find();

  res.status(200).json({});
};
const getSingleLibrary = async (req, res) => {
  let data = await LibrarySchema.find({ book_no: req.params.book_no });

  res.send(data);
};
const deleteLibrary = async (req, resp) => {
  try {
    console.log(req.params);
    let data = await LibrarySchema.deleteOne({ book_no: req.params.book_no });
    resp.send(data);
  } catch (err) {
    console.log(err);
  }
};
const putLibrary = async (req, res) => {
  try {
    const {
      des,
      title,
      book_no,
      isbn_no,
      publisher,
      author,
      rack_no,
      qty,
      available,
      date,
    } = req.body;
    let data = await LibrarySchema.updateOne(
      { book_no: req.params.book_no },
      {
        $set: {
          des,
          title,
          book_no,
          isbn_no,
          publisher,
          author,
          rack_no,
          qty,
          available,
          date,
        },
      }
    );
    res.send(data);
  } catch (err) {
    console.log(err);
  }
};

const createCategory = async (req, resp) => {
  try {
    let { name, desc } = req.body;
    const usermail = await CategorySchema.findOne({ name: name });
    console.log(usermail);
    if (usermail) {
      resp.status(404).json({
        code: 404,
        message: "Category aleready exist....  ",
        data: [],
        error: false,
        status: false,
      });
    } else {
      let data = new CategorySchema({ name, desc });

      await data.save();

      resp.status(200).json({
        code: 200,
        message: "category successfully",

        error: false,
        status: true,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const putCategory = async (req, res) => {
  try {
    let { name, desc } = req.body;

    let data = await CategorySchema.updateOne(
      { _id: req.params._id },
      { $set: { name, desc } }
    );
    res.send(data);
  } catch (err) {
    console.log(err);
  }
};
const getCategory = async (req, res) => {
  let data = await CategorySchema.find();

  res.send(data);
};

const getSingleCategory = async (req, res) => {
  let data = await CategorySchema.find({ _id: req.params._id });

  res.send(data);
};

const deleteCategory = async (req, resp) => {
  try {
    console.log(req.params);
    let data = await CategorySchema.deleteOne({ _id: req.params._id });
    resp.send(data);
  } catch (err) {
    console.log(err);
  }
};

const createinstructorOfMonth = async (req, res) => {
  const { name, course, desc } = req.body;
  const img = req.file.filename;
  let data = new InstructorOfMonthSchema({ img, name, course, desc });
  let result = await data.save();
  res.status(200).json({
    code: 200,
    message: "  Instructor of month is Created successfully",
    error: false,
    status: true,
  });
};
const getinstructorOfMonth = async (req, res) => {
  let data = await InstructorOfMonthSchema.find();
  res.send(data);
};
const getSingleinstructorofmonth = async (req, res) => {
  let data = await InstructorOfMonthSchema.find({ _id: req.params._id });
  res.send(data);
};

const putinstructorOfMonth = async (req, res) => {
  try {
    const img = req.file.filename;
    const { name, course, desc } = req.body;
    let data = await InstructorOfMonthSchema.updateOne(
      { _id: req.params._id },
      {
        $set: {
          img,
          name,
          course,
          desc,
        },
      }
    );
    res.send(data);
  } catch (err) {
    console.log(err);
  }
};
const delinstructorOfMonth = async (req, res) => {
  try {
    console.log(req.params);
    let data = await InstructorOfMonthSchema.deleteOne({ _id: req.params._id });
    res.send(data);
  } catch (err) {
    console.log(err);
  }
};

const putApproveStStatus = async (req, res) => {
  try {
    const status = req.query.status;
    // console.log(status,req.params.regno)
    let data = await Student_RegisterSchema.updateOne(
      { regno: req.params.regno },
      {
        $set: {
          status: req.query.status,
        },
      }
    );
    res.send(data);
  } catch (err) {
    console.log(err);
  }
};

const createAppointment = async (req, resp) => {
  try {
    let { name, mobile, msg } = req.body;
    const usermail = await AppointmentSchema.findOne({ mobile: mobile });
    console.log(usermail);
    if (usermail) {
      resp.status(404).json({
        code: 404,
        message: "Mobile aleready exist....  ",
        data: [],
        error: false,
        status: false,
      });
    } else {
      let data = new AppointmentSchema({ name, mobile, msg });

      await data.save();

      resp.status(200).json({
        code: 200,
        message: "Appointment applied  successfully",

        error: false,
        status: true,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const putAppointment = async (req, res) => {
  try {
    let { name, mobile, msg } = req.body;

    let data = await AppointmentSchema.updateOne(
      { _id: req.params._id },
      { $set: { name, mobile, msg } }
    );
    res.send(data);
  } catch (err) {
    console.log(err);
  }
};
const getAppointment = async (req, res) => {
  let data = await AppointmentSchema.find();

  res.send(data);
};

const getSingleAppointment = async (req, res) => {
  let data = await AppointmentSchema.find({ _id: req.params._id });

  res.send(data);
};

const deleteAppointment = async (req, resp) => {
  try {
    console.log(req.params);
    let data = await AppointmentSchema.deleteOne({ _id: req.params._id });
    resp.send(data);
  } catch (err) {
    console.log(err);
  }
};
const createrolepermission = async (req, resp) => {
  try {
    const {
      id,
      enquiries,
      courseList,
      categories,
      studentList,
      instructorList,
      cashLedger,
      fees,
      scheduleClasses,
      events,
      manageStudent,
      scheduleBatches,
      monthlyAchievers,
      rolesPermission,
      joinInstructor,
      contact,
    } = req.body;
    //  let data = new rolesPermissionSchema({ id,enquiries,courseList,categories,studentList,instructorList,cashLedger,fees,scheduleClasses,events,manageStudent,scheduleBatches,monthlyAchievers,rolesPermission });
    //   let result=  await data.save();
    //   resp.send(result)
    const usermail = await rolesPermissionSchema.findOne({ id: id });
    console.log(usermail);
    if (usermail) {
      resp.status(404).json({
        code: 404,
        message: "Permission  aleready exist....  ",
        data: [],
        error: false,
        status: false,
      });
    } else {
      let data = new rolesPermissionSchema({
        id,
        enquiries,
        courseList,
        categories,
        studentList,
        instructorList,
        cashLedger,
        fees,
        scheduleClasses,
        events,
        manageStudent,
        scheduleBatches,
        monthlyAchievers,
        rolesPermission,
        joinInstructor,
        contact,
      });
      await data.save();
      resp.status(200).json({
        code: 200,
        message: "Permission allotted successfully",
        error: false,
        status: true,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const getrolepermission = async (req, res) => {
  let data = await rolesPermissionSchema.find();

  res.send(data);
};
const getSinglerolepermission = async (req, res) => {
  let data = await rolesPermissionSchema.find({ id: req.params.id });

  res.send(data);
};
const deleterolepermission = async (req, resp) => {
  try {
    console.log(req.params);
    let data = await rolesPermissionSchema.deleteOne({ _id: req.params._id });
    resp.send(data);
  } catch (err) {
    console.log(err);
  }
};
const putrolepermission = async (req, res) => {
  try {
    const {
      id,
      enquiries,
      courseList,
      categories,
      studentList,
      instructorList,
      cashLedger,
      fees,
      scheduleClasses,
      events,
      manageStudent,
      scheduleBatches,
      monthlyAchievers,
      rolesPermission,
      joinInstructor,
      contact,
    } = req.body;
    let data = await rolesPermissionSchema.updateOne(
      { _id: req.params._id },
      {
        $set: {
          id,
          enquiries,
          courseList,
          categories,
          studentList,
          instructorList,
          cashLedger,
          fees,
          scheduleClasses,
          events,
          manageStudent,
          scheduleBatches,
          monthlyAchievers,
          rolesPermission,
          joinInstructor,
          contact,
        },
      }
    );
    res.send(data);
  } catch (err) {
    console.log(err);
  }
};
const createContact = async (req, resp) => {
  try {
    const { name, email, contact, subject, desc } = req.body;
    let data = new ContactSchema({ name, email, contact, subject, desc });
    await data.save();
    resp.status(200).json({
      code: 200,
      message: "Register Contact form successfully",
      error: false,
      status: true,
    });
  } catch (err) {
    console.log(err);
  }
};

const getContact = async (req, res) => {
  let data = await ContactSchema.find();

  res.send(data);
};
const getSingleContact = async (req, res) => {
  let data = await ContactSchema.find({ id: req.params.id });

  res.send(data);
};
const deleteContact = async (req, resp) => {
  try {
    console.log(req.params);
    let data = await ContactSchema.deleteOne({ _id: req.params._id });
    resp.send(data);
  } catch (err) {
    console.log(err);
  }
};
const putContact = async (req, res) => {
  try {
    const { name, email, contact, subject, desc } = req.body;
    let data = await ContactSchema.updateOne(
      { _id: req.params._id },
      { $set: { name, email, contact, subject, desc } }
    );
    res.send(data);
  } catch (err) {
    console.log(err);
  }
};

const createJoinAsInstructor = async (req, res) => {
  const { name, email, contact, qualification, exp } = req.body;
  const cv = req.file.filename;
  let data = new JoinInstructorSchema({
    name,
    email,
    contact,
    qualification,
    exp,
    cv,
  });
  let result = await data.save();
  res.status(200).json({
    code: 200,
    message: " Request Generated successfully",
    error: false,
    status: true,
  });
};
const getJoinAsInstructor = async (req, res) => {
  let data = await JoinInstructorSchema.find();
  res.send(data);
};
const getSingleJoinAsInstructor = async (req, res) => {
  let data = await JoinInstructorSchema.find({ _id: req.params._id });
  res.send(data);
};

const putJoinAsInstructor = async (req, res) => {
  try {
    const cv = req.file.filename;
    const { name, email, contact, qualification, exp } = req.body;
    let data = await JoinInstructorSchema.updateOne(
      { _id: req.params._id },
      { $set: { name, email, contact, qualification, exp, cv } }
    );
    res.send(data);
  } catch (err) {
    console.log(err);
  }
};
const delJoinAsInstructor = async (req, res) => {
  try {
    console.log(req.params);
    let data = await JoinInstructorSchema.deleteOne({ _id: req.params._id });
    res.send(data);
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  createJoinAsInstructor,
  getJoinAsInstructor,
  getSingleJoinAsInstructor,
  putJoinAsInstructor,
  delJoinAsInstructor,
  createContact,
  getContact,
  getSingleContact,
  deleteContact,
  putContact,

  createrolepermission,
  getrolepermission,
  getSinglerolepermission,
  deleterolepermission,
  putrolepermission,

  createAppointment,
  putAppointment,
  getAppointment,
  getSingleAppointment,
  deleteAppointment,

  putApproveStStatus,

  getSingleinstructorofmonth, //all the instructor Off Months
  createinstructorOfMonth,
  getinstructorOfMonth,
  putinstructorOfMonth,
  delinstructorOfMonth,

  createCategory,
  putCategory,
  getCategory,
  deleteCategory,
  getSingleCourse,
  getSingleCategory,
  createLibrary,
  getLibrary,
  getSingleLibrary,
  deleteLibrary,
  putLibrary,
  createincome,
  getincome,
  getSingleincome,
  deleteincome,
  putincome,
  createInstructor,
  putInstructor,
  getInstructor,
  createCourse,
  getCourse,
  putCourse,
  putExpense,
  createStOfMonth,
  getStOfMonth,
  putStOfMonth,
  delStOfMonth,
  deleteCourse,
  deleteInstructor,
  createEnquiry,
  getEnquiry,
  deleteEnquiry,
  handleEnquiryStatus,
  createAdmin,
  loginAdmin,
  putAdmin,
  getAdmin,
  deleteAdmin,
  createExpense,
  getExpense,
  deleteExpense,
  putEnquiry,
  getSingleInstructor,
  getSingleExpense,
  getSingleAdmin,
};
