const { body, param, validationResult } = require("express-validator");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = app => {

  const Prediction = app.db.models.Prediction;

  // TASK DOC
  // 200 OK
  // 201 Created
  // 409 Confict
  // 422 Unprocessable Entity
  // 500 Internal Server Error

  /**
   * Insert a new item in test
   */
  app.route("/predictions")
    .post([
      body("isRenew").isBoolean(),
      body("id_tvshow").isInt(),

    ], async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      Prediction.create({
        isRenew: req.body.isRenew,
        td_tvshow: req.body.td_tvshow,

      }).then(result => {
        return res.status(201).json(result);

      }).catch(Sequelize.BaseError, seqError => {
        console.error(seqError);
        return res.status(409).json({ errors: seqError.errors });

      }).catch(error => {
        console.error(error);
        return res.status(500).json({ errors: "Prediction: Unexpected error to insert" });
      })
    })

    /**
     * Show all itens of test
     */
    .get(async (req, res) => {

      Prediction.findAll({
        order: [
          ["updatedAt"]
        ],
      }).then(results => {
        return res.status(200).json(results);

      }).catch(error => {
        console.error(error);
        return res.status(500).json({ errors: "Prediction: Unexpected error to show all" });

      });
    });

  /**
   * Show an item of test by id
   */
  app.route("/predictions/:id")
    .get([
      param("id").isInt(),

    ], async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      Prediction.findOne({
        where: {
          id: req.params.id,
        },

      }).then(result => {
        return res.status(200).json(result);

      }).catch(error => {
        console.error(error);
        return res.status(500).json({ errors: "Prediction: Unexpected error to show" });

      });
    })


    /**
     * Update an item of test by id
     */
    .put([
      param("id").isInt(),

      body("id_tvshow").isString(),
      body("isRenew").isBoolean(),
    ], async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      Prediction.update({
        isRenew: req.body.isRenew,
        id_tvshow: req.body.id_tvshow,
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
        return res.status(500).json({ errors: "Prediction: Unexpected error to update" });

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

      Prediction.update({
        where: {
          id: req.params.id,
        }
      }).then(result => {
        return res.status(200).json(result);

      }).catch(error => {
        console.error(error);
        return res.status(500).json({ errors: "Prediction: Unexpected error to delete" });

      });
    });
}