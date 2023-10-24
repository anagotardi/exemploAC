//criar branch de teste;

//mudar para a branch de teste;

//no terminal, iniciar o projeto (npm i -y);

//no terminal, digitar: npm i express mongoose body-parser cors nodemon;

//no package.json, colocar uma vírgula depois de "test", e na linha de baixo, escrever: "start": "nodemon ./server.js localhost:3000"


const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors")

//configuração básica
const router = require('express').Router();
const app = express();
app.use(bodyParser.json()); //para ler o corpo da requisição no formato json

//conexão do banco de dados

mongoose.connect("mongodb://127.0.0.1:27017/rev", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 20000
});

//criação de model

const UserSchema = new mongoose.Schema({
    name: {type: String },
    email: {type: String, required: true},
    password: {type: String, required: true}
})

const User = mongoose.model('User',UserSchema);



//criação de rota teste
app.post("/cadastro", async (req, res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

/*  && -> e
    || -> ou
    ! -> não
*/

    if(name = null || email == password == null){
        return res.status(400).json({error: "Digite os campos!!!"});
    }

    const user = new User({
        name: name,
        email: email,
        password: password
    })

    try{
        const newUser = await User.save();
        res.json({error: null, msg: "Cadastro ok!!!", userId: newUser.id}) 
    }
    catch(error){
        res.status(400).json({error});
    }
});

//criando uma rota de get
app.get("/", (req, res)=>{
    res.sendFile(__dirname + '/index.html');
})

//faz a leitura de portas
app.listen(3000, ()=>{
    console.log("Rodando na porta 3000")
})

