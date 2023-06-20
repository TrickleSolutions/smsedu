const mongoose = require("mongoose");
const  AddFeeSchema = new mongoose.Schema({
     
     
      regno: {
        type: Number,
        required: true,
      },
    
      name: {
        type: String,
        required: true,
      },
      amount: {
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
        type: String,
        //required:true
      },
      course: {
        type: String,
        //required:true
      },
    
    
}); 
module.exports = mongoose.model('AddFee_tbl',AddFeeSchema);
 