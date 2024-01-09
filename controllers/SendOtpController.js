const { default: axios } = require("axios");
const VerifyModel = require("../models/VerifyModel");

function generateOTP() {
  // Generate a random number between 1000 and 9999
  const otp = Math.floor(Math.random() * 9000) + 1000;
  return otp;
}

const msgFormat = (number, otp) => {
  const query = {
    username: "demostew",
    apikey: "2B8F7-8B25D",
    apirequest: "Text",
    sender: "STEWIN",
    mobile: number,
    message: `Dear User Your One time password for Login is ${otp} Valid till 4 Minutes STEWINDIA `,
    route: "TRANS",
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

    const smsApiUrl =
      "http://sms.stewindia.com/sms-panel/api/http/sendsms.php?";
    const response = await axios.get(smsApiUrl + generatedString);
    // console.log(smsApiUrl + generatedString);

    if (response.status === 200) {
      const isReqStored = await new VerifyModel({
        otp: otp,
        otpid: `${response.data["message-id"]}`,
        otpExpireTime: Date.now() + 40000,
      }).save();
      console.log(isReqStored);
      if (!isReqStored) {
        return res
          .status(400)
          .json({ error: true, message: "Failed to send OTP" });
      }
      res.status(200).json({
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
