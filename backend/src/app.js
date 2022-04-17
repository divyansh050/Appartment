const express = require('express');

const connect = require("./configs/db");
const PORT = process.env.PORT || 80;

const { login, register, getAll } = require("./controllers/auth.controller");

const ResidentController = require("./controllers/resident.controller");

const ApartmentController = require("./controllers/apartment.controller");

const app = express();


app.use(express.json());

app.use("/login",login);

app.use("/register",register);

app.use("/getAll",getAll);

app.use("/resident",ResidentController);

app.use("/apartment",ApartmentController);



app.listen(80, async() => {
    try{
        await connect();
        console.log(`Server is running on port ${PORT}`);
    }catch(e){
        console.log(e);
    }
    
});
