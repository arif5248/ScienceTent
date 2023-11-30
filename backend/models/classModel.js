const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  batch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Batches",
  },
  subjectName: {
    type: String,
    required: [true, "Please Enter a Subject Name"],
  },
});

module.exports = mongoose.model("Classes", classSchema);
