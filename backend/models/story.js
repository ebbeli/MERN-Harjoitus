const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const storySchema = new Schema({
  story: { type: String, required: true },
  date: { type: Date, default: Date.now(), required: true },
  city: { type: String, required: true },
  picurl: { type: String, required: false },
  user: {
    id: { type: mongoose.Types.ObjectId, required: true },
    name: { type: String, required: true },
  },
});

module.exports = mongoose.model("story", storySchema, "stories");
