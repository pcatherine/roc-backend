module.exports = (sequelize, DataType) => {
  const Genre = sequelize.define("Genre", {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  }, {
    timestamps: true
  }
  );

  return Genre;
};