const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const Client = require('../models/client.model')

 const { use } = require('../routes/user');


module.exports = {

  async signup(req,res){

    try{
      const { fname, lname, role, password, email } = req.body
      console.log(req.body)
      const { clientId } = req.params
      
      const encryptedPassword = await bcrypt.hash(password, 8)
      const client = await Client.findById(clientId)
      const user = await User.create( {fname, lname, role, email, client, password: encryptedPassword} )
      
      console.log(client)
      console.log(client.users.push(user))

      
      res.status(200).json(user) 
    }
    catch(err){
      res.status(400).json(err)
    }

  },

 async signin(req,res){

 },
  
  // create(req, res) {
  //   const data = req.body;
  //   const { clientId } = req.params
    

  //   User
  //     .create({ ...data, client: clientId })
  //     .then(user => res.status(200).json(user))
  //     .catch(err => res.status(400).json(err));

  // },

  update (req, res) {
    const { id } = req.params;
    const data = req.body;

    const opt = {
      new: true,
      runValidators:true,
      useFindAndModify: false,
    }

    User
      .findByIdAndUpdate(id, data, opt )
      .then(user => res.status(200).json(user))
      .catch(err => res.status(400).json(err));

    },

}







// const User = require('../models/user.model');



// module.exports = {

//   create(req, res) {
//     const data = req.body;

//     User
//       .create(data)
//       .then( user => res.status(200).json(user));
//       .catch( err => res.status(400).json(err));
//   }, 

//   // async signup(req,res){
//   //   const { email, password } = req.body;
//   //   const encryptedPassword = await bcrypt.hash(password, 8);

//   //   console.log(encryptedPassword);

//   // },


//   // async signin(req,res){}
// }
