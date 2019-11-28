module.exports = (sequelize, DataType) => {
  const TVShow = sequelize.define("TVShow", {
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
    },
    year: {
      type: DataType.INTEGER,
    },
    isFinished: {
      type: DataType.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
  }, {
      timestamps: true
    }
  );

  return TVShow;
};