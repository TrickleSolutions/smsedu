const mongoose = require("mongoose");
const GenerateRecieptId = require("../../funcs/RecieptNumbergenerater");
const AddFeeSchema = new mongoose.Schema(
  {
    regno: {
      type: Number,
      required: true,
    },
    recieptNo: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    courseFee: {
      type: Number,
      required: true,
    },
    pending: {
      type: Number,
      required: true,
    },
    mode: {
      type: String,
      required: true,
    },
    transId: {
      type: String,
      required: true,
    },
    paid: {
      type: Number,
      //required:true
    },
    date: {
      type: Date,
      //required:true
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "course_admins",
      //required:true
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "instructorregisters",
    },
    recievedBy: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("AddFee_tbl", AddFeeSchema);
