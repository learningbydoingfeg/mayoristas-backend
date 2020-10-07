require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const db = require('./src/db');

const userRouter = require('./src/routes/user');
const adminRouter = require('./src/routes/admin');
const clientRouter = require('./src/routes/client');

const { authadmin } = require('./src/utils/midlewares');


const port = process.env.PORT || 8000;

const app = express();

db();


app.use(express.json());
app.use(cors());
app.use(morgan('dev')); 


// app.use('/users', userRouter);
app.use('/admins', adminRouter);
app.use('/clients', clientRouter, userRouter);

app.get('/admin', authadmin,  (req, res) => {
  // console.log(req.admin)
  // console.log(Admin.findById(req.admin))
  res.status(200).send('auth admin sistems working')
})



app.listen(port, () => 
  console.log(`server listening on http://localhost:${port}`)
) 