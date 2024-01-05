const axios = require("axios");
const VerifyModel = require("../models/VerifyModel");

function generateOTP() {
  // Generate a random number between 1000 and 9999
  const otp = Math.floor(Math.random() * 9000) + 1000;
  return otp;
}

const msgFormat = (number, otp) => {
  const query = {
    user: "trickle",
    key: "e88ba9a618XX",
    accusage: "1",
    entityid: "1201159543060917386",
    mobile: number,
    senderid: "OTPSSS",
    tempid: "1207161729866691748",
    message: `Dear Customer, Your OTP is ${otp} .Please do not share this OTP. Regards`,
  };

  // Convert it to the query string
  const queryString = new URLSearchParams(query).toString();
  return queryString;
};

module.exports = async (req, res) => {
  try {
    const { number } = req.query;

    const otp = generateOTP();
    const generatedString = msgFormat(number, otp);

    const smsApiUrl = "http://sms.bulkssms.com/submitsms.jsp?";
    const response = await axios.get(smsApiUrl + generatedString);

    if (response.status === 200) {
      const isReqStored = await new VerifyModel({
        otp: otp,
        otpid: response.data,
        otpExpireTime: Date.now() + 40000,
      }).save();
      if (!isReqStored) {
        return res
          .status(400)
          .json({ error: true, message: "Failed to send OTP" });
      }
      res
        .status(200)
        .json({
          error: false,
          message: "OTP sent successfully",
          data: isReqStored.otpid,
        });
    } else {
      res
        .status(response.status)
        .json({ error: true, message: "Failed to send OTP" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: true, message: "Internal server error" });
  }
};
