const models = require('../../db/models');

module.exports.update = (req, res) => {
  const profileBody = {
    photo_src_large: req.body.photo_src_large,
    photo_src_small: req.body.photo_src_small,
  };

  // update the user profile table with new photo
  models.Profile.where({ id: req.body.id }).fetch()
    .then((profile) => {
      if (!profile) {
        throw profile;
      }
      return profile.save(profileBody, { method: 'update' });
    })
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};
