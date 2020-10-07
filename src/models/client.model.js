const { Schema, model, models } = require('mongoose');


const uniqueName = {
  
  validator(name){
    return models.Client.findOne({name: name})
    .then(name => !name)
    .catch(() => false); 
  },

  message: 'el cliente ya existe',
}


const clientSchema = new Schema({
  name: {
    type: String,
    required: [ true, 'El campo nombre es requerido' ],
    validate: [ uniqueName ]
  },

  picture: {
    type: String,
  },

  users:{
    type:  [{ type: Schema.Types.ObjectId, ref: 'User'}]
  }


},{
  timestamps: true,
});

const Client = model( 'Client', clientSchema );

module.exports = Client;