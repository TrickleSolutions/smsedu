const { model, Schema } = require("mongoose");

const schema = new Schema(
  {
    type: {
      type: String,
      default: "Exam/Other Fee Reciepts",
    },
  },
  {
    timestamps: true,
  }
);
