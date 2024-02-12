const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const CryptoJS = require("crypto-js");

app.use(bodyParser.json());

const users = {
  john: { 
    username: 'user',
    passwordHash: CryptoJS.SHA512('1234').toString()  
  }
};

app.post("/login", (req, res) => {

  const {username, password} = req.body; 
  const user = users[username];

  if (!user) {
    return res.sendStatus(400);
  }

  const passwordHash = CryptoJS.SHA512(password).toString();  

  if(passwordHash === user.passwordHash) {
    return res.sendStatus(200); 
  } else {
    return res.sendStatus(400);
  }

});

app.listen(3000);
