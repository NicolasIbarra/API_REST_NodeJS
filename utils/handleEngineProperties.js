const DB_ENGINE = process.env.DB_ENGINE;

/**
 * The "id" field is treated according to the DB type.
 * For Mongo is used "_id" field, but for MySQL "id" is used.
 * @returns 
 */
const getPropertiesKey = () => {
  const data = {
    nosql: {
      id: "_id",
    },
    mysql: {
      id: "id",
    },
  };
  return data[DB_ENGINE];
};

module.exports = getPropertiesKey;
