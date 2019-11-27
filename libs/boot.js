module.exports = app => {
  app.db.sequelize.sync().done((() => {
    app.listen(app.get('port'), () => {
      console.log('\n===========================================================')
      console.log(`===== Renew Or Cancel - port: ${app.get('port')} =====`)
      console.log('===========================================================\n')
    });
  }));
};