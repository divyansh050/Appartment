const express = require('express');

const connect = require("./configs/db");
const PORT = process.env.PORT || 80;

const { login, register, getAll } = require("./controllers/auth.controller");

const ResidentController = require("./controllers/resident.controller");

const FlatController = require("./controllers/flat.controller");

const app = express();


app.use(express.json());

app.use("/login",login);

app.use("/register",register);

app.use("/getAll",getAll);

app.use("/resident",ResidentController);

app.use("/flat",FlatController);



app.listen(PORT, async() => {
    try{
        await connect();
        console.log(`Server is running on port ${PORT}`);
    }catch(e){
        console.log(e);
    }
    
});
