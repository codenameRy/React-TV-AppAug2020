const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = mongoose.Schema({
    userFrom: {
      type: Schema.Types.ObjectId,
      ref: "User"},
    tvShowID: { type: String },
    tvShowName: { type: String },
    tvShowImage: { type: String },
    tvShowHomepage: { type: String }
  });
  // { timestamps: true }


const Favorite = mongoose.model("Favorite", favoriteSchema);

module.exports = { Favorite };