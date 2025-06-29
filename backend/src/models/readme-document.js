const mongoose = require("mongoose");

const readmeDocumentSchema = new Schema({
  user_id: { type: Types.ObjectId, ref: "User", required: true },
  repo_id: { type: String, required: true },
  markdown: { type: String, required: true },
});

module.exports = mongoose.model("ReadmeDocument", readmeDocumentSchema);
