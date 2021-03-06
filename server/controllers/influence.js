const models = require('../../db/models');

module.exports.saveOne = (req, res) => {
  models.Influence.where({ influence_name: req.body.name }).fetch()
    .catch(err => res.status(500).send(err))
    .then((influence) => {
      if (!influence) {
        throw influence;
      }
      models.Influence.where({ influence_name: req.body.name })
        .save({ influence_img: req.body.img }, { method: 'update' })
        .then(() => res.sendStatus(201));
    })
    .catch(() => {
      models.Influence.forge({
        influence_name: req.body.name,
        influence_img: req.body.img,
      }).save();
      res.sendStatus(201);
    });
};
