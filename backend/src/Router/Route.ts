import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
var jwt = require('jsonwebtoken');

const sendMail = require('../../mailUtil/sendEmail');


export const Router = express.Router();

const SignUpSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('Authenticate', SignUpSchema);

Router.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      name: req.body.name,
      password: hashedPassword,
      email: req.body.email,
      username: req.body.username,
    });
    console.log(user);
    user.save((err, data) => {
      if (err) {
        console.log('Sign up Error In Insertion');
        console.log(err);
      } else {
        console.log('Data Inserted');
      }
    });
  } catch {
    console.log('post error');
  }
});

Router.post("/sendMail", (req, res)=>{
    const { name, surname, email } = req.body;

  const from = "vishalsolanki14002@gmail.com";
  const to = "hp996847@gmail.com";

  const subject = "New Contact Request";

  const output = `
    <p>You have a new Contact Request</p>
    <h3>Contact Details</h3>
    <ul>
      <li>Name: ${name}</li>
      <li>Surname: ${surname}</li>
      <li>Email: ${email}</li>
    </ul>
  `;

  sendMail(to, from, subject, output);
  res.send("Succes EMAIL");
})

Router.post('/login', async (req, res) => {
    const userDB = await User.findOne({username: req.body.username});
    console.log("Logged Data==> " + userDB);

    if(userDB!=null) {
        const password = userDB.password;
        const user = {name: userDB};
        const comparePass = await bcrypt.compare(req.body.password, password);
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
        if(comparePass) res.status(200).json({loggedin: "true", token: accessToken});
        else res.status(402).json({error: "Passwords dont match"});
    } else {
        res.status(402).json({error: "User is not registered"});
    }
});

Router.get('/feed', authenticateToken, (req, res)=>{
    console.log(Object.keys(req.body))
    res.send("Feed Page==>" + Object.keys(req.body
        ));
})

function authenticateToken(req: any, res: any, next: any) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token==null) return res.sendStatus(401)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err: any, user: any) => {
        if(err) return res.sendStatus(403);
        res.user = JSON.stringify(user);
        console.log(res.user);
        next();
    })
}
// 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