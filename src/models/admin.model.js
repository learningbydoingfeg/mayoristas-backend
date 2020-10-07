const { Schema, model, models } = require('mongoose');

const emailRegExp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

const uniqueEmail = {
  
        validator(email){
          return models.Admin.findOne({email: email})
          .then(admin => !admin)
          .catch(() => false); 
        },

        message: 'el email ya existe',
}

const adminSchema = new Schema({
  fname: {
    type: String,
    required: [ true, 'El campo nombre es requerido' ] 
  },

  lname: {
    type: String,
    required: [ true, 'El campo apellido es requerido' ] 
  },

  email: {
    type: String,
    required: [ true, 'El campo email es requerido' ],
    match: [ emailRegExp, 'El email es inválido' ],
    validate: [ uniqueEmail ]

  },

  password:{
    type: String,
    required: [ true, 'la contraseña no puede ir vacia']
  },
  // password: String,
  // changePassword: Boolean,

},{
  timestamps: true,
});

const Admin = model( 'Admin', adminSchema );

module.exports = Admin;