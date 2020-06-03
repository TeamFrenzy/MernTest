require('dotenv').config()

const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

//Modelos
const RefreshToken = require('./models/RefreshToken');
const Usuario = require('./models/Usuario');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//DB
mongoose.connect(process.env.DB_LOCAL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});
mongoose.connection.on('connected', () => {
  console.log('Mongoose is connected!!!');
});


app.post('/refresh', async (req, res) => {

  const refreshToken = req.body.token
  if (refreshToken == null) return res.sendStatus(401)

  await RefreshToken.findOne({ token: refreshToken }).then((record) => {
    if (record) {
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        const accessToken = generateAccessToken({ name: user.name })
        res.json({ accessToken: accessToken })
      })
    } else {
      return res.sendStatus(403)
    }
  })
})


app.delete('/logout', (req, res) => {

  RefreshToken.findOneAndDelete({ token: req.body.token }, function (err, docs) {
    if (err) {
      return res.send(err)
    }
    else {
      return res.json({
        msg: 'Token deleted'
    });
    }
  });
})

//Nota: En un escenario real, se filtrarian datos de una base de datos hasta encontrar un usuario que coincida con los parametros dados en el request. Para simplificar la ejecucion de este programa, dejo un usuario hard-codeado con el cual logearse para adquirir el token a usar para obtener acceso a las funciones de la API.
app.post('/login', async (req, res) => {

  const username = req.body.nombre
  const user = { name: username }

  const password = req.body.password

  if(!((username==='Admin') && (password ==='Admin')))
    {
      return res.send('Wrong User!')
    } 

  //Ejemplo real usando base de datos MONGODB:
  /*
  await Usuario.findOne( {nombre: req.body.nombre}).then( (record) => {
    if(record)
    {
      console.log('Pas');
        pass = record.password;
        console.log('password assigned');

    } else {
        return res.send('Wrong User!')
    }

})
try{
    if(await bcrypt.compare(req.body.password, pass))
    {
       console.log('Success nege!');
    } else {
        return res.send('Failure!')
    }
} catch {
    return res.status(500).send()
}*/

  const accessToken = generateAccessToken(user)
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
  var pat = new RefreshToken({
      name: username,
      token: refreshToken
  })
  pat.save();
  res.json({ accessToken: accessToken, refreshToken: refreshToken })
})

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '600s' })
}

app.listen(4000, () => console.log('Authorization Server Started'));