const { Schema, model, default: mongoose } = require("mongoose");

const schema = new Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "student_registers" },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "instructorregisters",
    },
    data: {
      type: Object,
      required: true,
    },
    certificate: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
