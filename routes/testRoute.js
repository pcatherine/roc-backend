const { body, param, validationResult } = require("express-validator");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const Moment = require("moment");

module.exports = app => {

  const Test = app.db.models.Test;

  // TASK DOC
  // 200 OK
  // 201 Created
  // 409 Confict
  // 422 Unprocessable Entity
  // 500 Internal Server Error

  /**
   * Insert a new item in test
   */
  app.route("/tests")
    .post([
      body("description").isString(),
      body("local").isString(),
      body("ip").isIP(),
      body("type").isIn(["entrance", "exit"]),

      body("currentSystemUser").isString(),

    ], async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      Test.create({
        description: req.body.description,
        local: req.body.local,
        ip: req.body.ip,
        type: req.body.type,
        createdBy: req.body.currentSystemUser,
        updatedBy: req.body.currentSystemUser,

      }).then(result => {
        return res.status(201).json(result);

      }).catch(Sequelize.BaseError, seqError => {
        console.error(seqError);
        return res.status(409).json({ errors: seqError.errors });

      }).catch(error => {
        console.error(error);
        return res.status(500).json({ errors: "Test: Unexpected error to insert" });
      });
    });

  /**
   * Show all itens of test
   */
  app.route("/tests")
    .get(async (req, res) => {

      Test.findAll({
        where: {
          isActive: true,
        },
        order: [
          ["description"]
        ],
      }).then(results => {
        return res.status(200).json(results);

      }).catch(error => {
        console.error(error);
        return res.status(500).json({ errors: "Test: Unexpected error to show all" });

      });
    });

  /**
   * Show an item of test by id
   */
  app.route("/tests/:id")
    .get([
      param("id").isInt(),

    ], async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      Test.findOne({
        where: {
          id: req.params.id,
          isActive: true,
        },

      }).then(result => {
        return res.status(200).json(result);

      }).catch(error => {
        console.error(error);
        return res.status(500).json({ errors: "Test: Unexpected error to show" });

      });
    });

  /**
    * Show all images by test 
    */
  app.route("/tests/:id/history")
    .get([
      param("id").isInt(),

    ], async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      const setting = await Setting.findOne({
        where: {
          id: 1
        }
      });
      const dateLimit = Moment().set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).subtract(setting.storageTime, "d")

      ImagePlate.findAll({
        attributes: ["id", "confidence", "updatedBy"],
        include: [{
          model: Image,
          attributes: ["img", "imgType", "date"],
          include: [{
            model: Test,
            where: {
              isActive: true,
            }
          }],
          where: {
            date: {
              [Op.gte]: dateLimit
            },
            id_test: req.params.id,
            isActive: true,
          },
        }, {
          model: Plate,
          attributes: ["id", "plate"],
          where: {
            isActive: true
          }
        }],
        where: {
          isActive: true,
        },
        order: [
          [Image, "date", "DESC"]
        ],
        limit: 50,
      }).then(async results => {
        let tmpData = [];
        let tmpPlates = [];
        let tmpTest = {};

        for (let index = 0; index < results.length; index++) {
          const element = results[index];

          const platelist = await PlateList.findOne({
            attributes: ["type"],
            where: {
              id_plate: element.Plate.id,
              isActive: true,
            }
          });

          tmpPlates.push({
            id: element.Plate.id,
            confidence: element.confidence,
            plate: element.Plate.plate,
            hasChanged: element.updatedBy === "SYSTEM" ? false : true,
            type: platelist ? platelist.type : "",
            Image: {
              date: element.Image.date,
              img: element.Image.img,
              imgType: element.Image.imgType,
            },
          });

          tmpTest = {
            local: element.Image.Test.local,
            description: element.Image.Test.description,
          };
        }

        tmpData = {
          Test: tmpTest,
          plates: tmpPlates,
        }

        return res.status(200).json(tmpData);

      }).catch(error => {
        console.error(error);
        return res.status(500).json({ errors: "Test: Unexpected error to show" });

      });
    });

  /**
   * Update an item of test by id
   */
  app.route("/tests/:id")
    .put([
      param("id").isInt(),

      body("description").isString(),
      body("local").isString(),
      body("ip").isIP(),
      body("type").isIn(["entrance", "exit"]),

      body("currentSystemUser").isString(),
    ], async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      Test.update({
        local: req.body.local,
        description: req.body.description,
        ip: req.body.ip,
        type: req.body.type,
        updatedBy: req.body.currentSystemUser,
        isActive: true
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
          return res.status(500).json({ errors: "Test: Unexpected error to update" });

        });
    });

  /**
   * Delete an item of test by id
   */
  app.route("/tests/:id")
    .delete([
      param("id").isInt(),

    ], async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      Test.update({
        isActive: false
      }, {
          where: {
            id: req.params.id,
          }
        }).then(result => {
          return res.status(200).json(result);

        }).catch(error => {
          console.error(error);
          return res.status(500).json({ errors: "Test: Unexpected error to delete" });

        });
    });
}