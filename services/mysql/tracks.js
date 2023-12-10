const { tracksModel } = require("../../models");

const findAll = async () => {
  const response = await tracksModel.findAll();
  return response;
};

const findOneById = async (trackId) => {
  const response = await tracksModel.findAll({ where: { id: trackId } });
  return response;
};

const updateOneById = async (trackBody) => {
  const response = await tracksModel.update(
    {
      name: trackBody.name,
      album: trackBody.album,
      cover: trackBody.cover,
      artist_name: trackBody.artist.name,
      artist_nickname: trackBody.artist.nickname,
      artist_nationality: trackBody.artist.nationality,
      duration_start: trackBody.duration.start,
      duration_end: trackBody.duration.end,
      mediaId: trackBody.mediaId,
    },
    { where: { id: trackBody.id } }
  );
  return response;
};

const createTrack = async (trackBody) => {
  const response = await tracksModel.create({
    name: trackBody.name,
    album: trackBody.album,
    cover: trackBody.cover,
    artist_name: trackBody.artist.name,
    artist_nickname: trackBody.artist.nickname,
    artist_nationality: trackBody.artist.nationality,
    duration_start: trackBody.duration.start,
    duration_end: trackBody.duration.end,
    mediaId: trackBody.mediaId,
  });
  return response;
};

const deleteTrack = async (idTrack) => {
  const response = await tracksModel.destroy({ where: { id: idTrack } });
  return response;
}

module.exports = { findAll, findOneById, updateOneById, createTrack, deleteTrack };
