const express = require('express')
const bcrypt = require('bcrypt')
const {initializeApp} = require('firebase/app')
const {getFirestore, collection, getDoc, doc, setDoc, getDocs} = require('firebase/firestore')
require ('dotenv/config')

//Configuracion de FireBase
const firebaseConfig = {
    apiKey: "AIzaSyCMwRDkAO0GC7g7shM-0WeDnGbXZS-vAP4",
    authDomain: "backfirebase-uwu.firebaseapp.com",
    projectId: "backfirebase-uwu",
    storageBucket: "backfirebase-uwu.appspot.com",
    messagingSenderId: "775293389742",
    appId: "1:775293389742:web:a8725ae58ec75427e3d63f"
  };

  // Inicializar la base de datos
  const firebase = initializeApp(firebaseConfig)
  const db = getFirestore()

  //Inicializar servidor 
  const app = express()

  app.use(express.json())

  //Rutas para las peticiones 
  app.post('/registro', (req, res) => {
    const {name, lastname, email, password, number } = req.body



    //validaciones 
    if(name.length < 3) {
      res.json({'alert': 'nombre requiere minimo 3 caracters'})
    } else if (lastname.length <3){
      res.json({'alert': 'nombre requiere minimo 3 caracters'})
    } else if (!email.length) {
      res.json({'alert': 'debes escribir tu correo electronico'})
    } else if (password.length < 8) {
      res.json({'alert': 'password requiere minimo 8 caracters'})
    } else if (!Number(number) || number.length < 10) {
      res.json({'alert': 'introduce un numero telefonico correcto'})
    } else {
      const users = collection(db, 'users')

      //verificar que el correo no exista en la coleccion
      getDoc(doc(users, email)).then(user => {
        if(user.exists()) {
          res.json({
            'alert': 'el correo ya existe en la BD'
          })
        } else {
          bcrypt.genSalt(10, (error, salt) => {
            bcrypt.hash(password, salt, (error, hash) =>{
              req.body.password = hash

              //Guardar en la base de datos
              setDoc(doc(users, email), req.body).then(reg =>{
                res.json({
                  'alert': 'success',
                  'data': reg
                })
              })
            })
          })
        }
      })
    }
  })

  app.get('/usuarios', async (req,res) =>{
    const colRef = await collection(db, 'users')
    const docsSnap = await getDocs(colRef)
    let data = [] 
    docsSnap.forEach(doc => {
      data.push(doc.data())
    })
    res.json({
      'alert': 'success',
      data
    })
  })

  app.post('/login', (req, res)=> {
    let {email, password} = req.body
    if (!email.length || !password.length) {
      return res.json({
        'alert': 'no se ha recibido los datos correctamente'
      })
    }

    const users = collection(db, 'users')
    getDoc(doc(users, email))
    .then(user => {
      if(!user.exists()){
        return res.json({
          'alert': 'Correo no registrado en la base de datos'
        })
      }else{
bcrypt.compare(password, user.data().password, (error, result) => {
        if (result) {
          let data = user.data()
          res.json ({
            'alert': 'Success',
            name: data.name,
            email: data.email
          })
        }else {
          return res.json ({
            'alert': 'Password incorrecto'
            })
          }
        })
      }
    })
  })

  app.get('/usuarios', (req, res)=> {
    const users = collection(db, 'users')
    console.log('usuarios', users)

    res.json({
      'alert': 'succes',
      users
    })
  })

  const PORT = process.env.PORT || 17000

  //Ejecutamos el server 
  app.listen(PORT, () =>{
    console.log(`Escuchando en el puerto ${PORT}`)
  })
