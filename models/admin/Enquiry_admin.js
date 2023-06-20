 const mongoose = require("mongoose");
const Enquiry_adminSchema = new mongoose.Schema({
     
    name: {
        type: String,
       // required: true,
      },
      fname: {
        type: String,
        //   required: true,
      },
    
      address: {
        type: String,
          // required: true,
      },
      dob: {
        type: String,
         //  required: true,
      },
      epx_join: {
        type: String,
         //  required: true,
      },
    
      course: {
        type: String,
        //   required: true,
      },
      contact: {
        type: Number,
         //  required:true
      },
      email: {
        type: String,
         //  required:true
      },
      ref_by: {
        type: String,
        //   required:true
      },
      gender: {
        type: String,
         //  required:true
      },
      counseller: {
        type: String,
         //  required:true
      },
      note: {
        type: String,
         //  required:true
      },
    
}); 
module.exports = mongoose.model('Enquiry_admin',Enquiry_adminSchema);
 