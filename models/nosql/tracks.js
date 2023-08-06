const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const TracksScheme = new mongoose.Schema(
  {
    name: { type: String },
    album: { type: String },
    cover: {
      type: String,
      validate: {
        validator: (req) => {
          return true;
        },
      },
      message: "ERROR_URL",
    },
    artist: {
      name: { type: String },
      nickname: { type: String },
      nationality: { type: String },
    },
    duration: {
      start: { type: Number },
      end: { type: Number },
    },
    mediaId: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

/**
 * Gets all the data where storages._id = tracks.mediaId - NOT WORKING (for some strange reason)
 * from: The target collection.
 * localField: The local join field.
 * foreignField: The target join field.
 * as: The name for the results.
 * @returns
 */
TracksScheme.statics.findAllData = function() {
  const joinnedData = this.aggregate([
    {
      $lookup: {
        from: "storages",
        localField: "mediaId",
        foreignField: "_id",
        as: "audio",
      },
    },
    // {
    //   $unwind: "$audio",
    // },
  ]);
  return joinnedData;
};

/**
 * Gets all the data where storage._id = id (parameter). NOT WORKING (for some strange reason)
 * @param {*} id
 * @returns
 */
TracksScheme.statics.findOneData = function (id) {
  const joinnedData = this.aggregate([
    {
      $lookup: {
        from: "storages",
        localField: "mediaId",
        foreignField: "_id",
        as: "audio",
      },
    },
    {
      $unwind: "$audio",
    },
    {
      $match: {
        _id: new mongoose.Types.ObjectId(id),
      },
    },
  ]);
  return joinnedData;
};

TracksScheme.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("tracks", TracksScheme);
