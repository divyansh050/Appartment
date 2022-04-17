const express = require("express");
const connect = require("./configs/db");

const PORT = process.env.PORT || 80;

const { login, register } = require("./controllers/auth.controller");

const app = express();

app.use(express.json());

app.use("/login",login);

app.use("/register",register);



app.listen((PORT, async() => {
    try{
        await connect(process.env.DB_CONNECTION);
        console.log(`Server is running on port ${PORT}`);
    }catch(e){
        console.log(e);
    }
    
}));
