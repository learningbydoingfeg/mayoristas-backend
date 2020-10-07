const Admin = require('../models/admin.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

module.exports = {
  
  async signup(req,res){

    try{
      const { fname, lname, password, email } = req.body
      const encryptedPassword = await bcrypt.hash(password, 8)
      const admin = await Admin.create( {fname, lname, email, password: encryptedPassword} )
      
      const token = jwt.sign(
        { id: admin._id },
        process.env.SECRET,
        { expiresIn: 60 * 60 * 24 * 365 }
      )

      res.status(200).json({ token }) 
    }
    catch(err){
      res.status(400).json(err)
    }

  },

  
  async signin(req,res){
    try{
      const { email, password } = req.body
      const admin = await Admin.findOne({ email })

      if(!admin){
        throw Error('Admin does not exist')
      }

      const isValid = await bcrypt.compare(password, admin.password)

      if(!isValid){
        throw Error('User/Password invalid!')
      }

      const token = jwt.sign(
        { id: admin._id },
        process.env.SECRET,
        {expiresIn: 60 * 60 * 24 * 365 }
      )

      res.status(200).json({token})

    } 
    catch(err){
      res.status(401).json({message: err.message})
    }
  }
  

};