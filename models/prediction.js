module.exports = (sequelize, DataType) => {
  const Prediction = sequelize.define("Prediction", {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    isRenew: {
      type: DataType.BOOLEAN,
    }
  }, {
    timestamps: true
  });

  Prediction.associate = models => {
    Prediction.belongsTo(db.models.TVShow, { foreignKey: 'id_tvshow', foreignKeyConstraint: true });
}
  return Prediction;
};