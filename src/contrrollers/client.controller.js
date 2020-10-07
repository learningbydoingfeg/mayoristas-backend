const Client = require('../models/client.model');


module.exports = {

  list (req, res) {
    
    Client
    .find()
    .populate('clients')
    .then(clients => res.status(200).json(clients));
  
  },
  
  create(req, res) {
    const data = req.body;

    Client
      .create(data)
      .then(client => res.status(200).json(client))
      .catch(err => res.status(400).json(err));

  },

  update (req, res) {

    const { id } = req.params;
    const data = req.body;

    const opt = {
      new: true,
      runValidators:true,
      useFindAndModify: false,
    }

    Client
      .findByIdAndUpdate(id, data, opt )
      .then(client => res.status(200).json(client))
      .catch(err => res.status(400).json(err));

  },
 

 };