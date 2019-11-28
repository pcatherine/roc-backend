module.exports = (sequelize, DataType) => {
  const TVShowGenre = sequelize.define("TVShowGenre", {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  }, {
    timestamps: true
  });

  TVShowGenre.associate = models => {
    TVShowGenre.belongsTo(db.models.Genre, { foreignKey: 'id_genre', foreignKeyConstraint: true });
    TVShowGenre.belongsTo(db.models.TVShow, { foreignKey: 'id_tvshow', foreignKeyConstraint: true });
}
  return TVShowGenre;
};