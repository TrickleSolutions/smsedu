const mongoose = require("mongoose");
const result_Schema = new mongoose.Schema({
     
    name: {
        type: String,
       // required: true,
      },
      regno: {
        type: Number,
        //   required: true,
      },
    
     
      course: {
        type: String,
         //  required: true,
      },
      topic: {
        type: String,
         //  required: true,
      },
      total_marks: {
        type: Number,
          // required: true,
      },
      obtain_marks: {
        type: Number,
          // required: true,
      },
      date: {
		type: Date,
		default: Date.now 
	},
      
}); 
module.exports = mongoose.model('result_tbl',result_Schema);
 