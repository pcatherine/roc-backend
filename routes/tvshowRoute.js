const { body, param, validationResult } = require("express-validator");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = app => {

  const TVShow = app.db.models.TVShow;
  const TVShowGenre = app.db.models.TVShowGenre;
  const Genre = app.db.models.Genre;

  // TASK DOC
  // 200 OK
  // 201 Created
  // 409 Confict
  // 422 Unprocessable Entity
  // 500 Internal Server Error

  /**
   * Insert a new item in test
   */
  app.route("/tvshows")
    .post([
      body("name").isString(),
      body("year").isInt(),
      body("isFinished").isBoolean(),

    ], async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      TVShow.create({
        name: req.body.name,
        year: req.body.year,
        isFinished: req.body.isFinished,

      }).then(result => {
        return res.status(201).json(result);

      }).catch(Sequelize.BaseError, seqError => {
        console.error(seqError);
        return res.status(409).json({ errors: seqError.errors });

      }).catch(error => {
        console.error(error);
        return res.status(500).json({ errors: "TVShow: Unexpected error to insert" });
      })
    })

    /**
     * Show all itens of test
     */
    .get(async (req, res) => {

      TVShowGenre.findAll({
        include: [{
          model: TVShow,
        }, {
          model: Genre,
        }],
        order: [
          [TVShow, "name"]
        ],
      }).then(results => {
        return res.status(200).json(results);

      }).catch(error => {
        console.error(error);
        return res.status(500).json({ errors: "TVShow: Unexpected error to show all" });

      });
    });

  /**
   * Show an item of test by id
   */
  app.route("/tvshows/:id")
    .get([
      param("id").isInt(),

    ], async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      TVShow.findOne({
        include: [{
          model: TVShowGenre,
          include: [{
            model: Genre
          }]
        }],
        where: {
          id: req.params.id,
        },

      }).then(result => {
        return res.status(200).json(result);

      }).catch(error => {
        console.error(error);
        return res.status(500).json({ errors: "TVShow: Unexpected error to show" });

      });
    })


    /**
     * Update an item of test by id
     */
    .put([
      param("id").isInt(),

      body("name").isString(),
      body("year").isString(),
      body("isFinished").isBoolean(),
    ], async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      TVShow.update({
        name: req.body.name,
        year: req.body.year,
        isFinished: req.body.isFinished,
      }, {
        where: {
          id: req.params.id,
        }
      }).then(result => {
        return res.status(200).json(result);

      }).catch(Sequelize.BaseError, seqError => {
        console.error(seqError);
        return res.status(409).json({ errors: seqError.errors });

      }).catch(error => {
        console.error(error);
        return res.status(500).json({ errors: "TVShow: Unexpected error to update" });

      });
    })

    /**
     * Delete an item of test by id
     */
    .delete([
      param("id").isInt(),

    ], async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      TVShow.update({
        where: {
          id: req.params.id,
        }
      }).then(result => {
        return res.status(200).json(result);

      }).catch(error => {
        console.error(error);
        return res.status(500).json({ errors: "TVShow: Unexpected error to delete" });

      });
    });
}