const CertificateNumber = require("../models/certificateNumber");

const GenerateCertificatesNumber = async () => {
  let SeqData;
  SeqData = await CertificateNumber.findOneAndUpdate(
    {},
    { $inc: { seq: 1 } },
    { new: true }
  );

  if (!SeqData) {
    SeqData = await new CertificateNumber({
      id: "SMS",
      seq: 0,
    }).save();
  }
  SeqData.seq++;
  return `SMS${SeqData.seq.toString().padStart(7, "0")}`;
};

module.exports = GenerateCertificatesNumber;
