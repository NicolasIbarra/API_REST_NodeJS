const { sequelize } = require("../../config/mysql");
const { DataTypes } = require("sequelize");
const Storage = require("./storage");

const Tracks = sequelize.define(
  "tracks",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    album: {
      type: DataTypes.STRING,
    },
    cover: {
      type: DataTypes.STRING,
    },
    artist_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    artist_nickname: {
      type: DataTypes.STRING,
    },
    artist_nationality: {
      type: DataTypes.STRING,
    },
    duration_start: {
      type: DataTypes.INTEGER,
    },
    duration_end: {
      type: DataTypes.INTEGER,
    },
    mediaId: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Finds all the records in Storage model using mediaId field as FK,
 * findAllData -> The name of the function. It matches the personalized NoSQL function so the controller can get both.
 * belongsTo -> Establishes the relation between Tracks and Storage.
 * findAll -> Searches the records in the DB using the declared criteria.
 * @returns
 */
Tracks.findAllData = function () {
  Tracks.belongsTo(Storage, {
    foreignKey: "mediaId",
    as: "audio",
  });

  return Tracks.findAll({ include: "audio" });
};

/**
 * Finds the track in Storage model using the Track's id.
 * findOne -> Searches the records in the DB using the declared criteria.
 * @param {*} id - Track's id
 * @returns 
 */
Tracks.findOneData = function (id) {
  Tracks.belongsTo(Storage, {
    foreignKey: "mediaId",
    as: "audio",
  });

  return Tracks.findOne({ where: { id }, include: "audio" });
};

module.exports = Tracks;
