const express = require('express')
const bcrypt = require('bcrypt')
const {initializeApp} = require('firebase/app')
const {getFirestore} = require('firebase/firestore')
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

  const PORT = process.env.PORT || 17000

  //Ejecutamos el server 
  app.listen(PORT, () =>{
    console.log(`Escuchando en el puerto ${PORT}`)
  })
