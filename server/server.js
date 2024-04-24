const express = require("express")
const app = express();
const {MongoClient} = require("mongodb");
const cors = require('cors')
const { v4: uuidv4 } = require('uuid');

app.use(express.json()) // for parsing application/json
app.use(cors());

app.post("/userin", (req, res)=>{
    const client = new MongoClient('mongodb://localhost:27017')
    client.connect()
        .then(async () => {
            const db = client.db("DishTrace");

            const user = db.collection("UserDish");
            const userData = {
                userId: uuidv4(),
                userEmail: req.body,
            }
            
            console.log(userData);
            await user.insertOne(userData);
            res.status(200).json({status: "success", userId: userData.userId});
        })
        .catch(error => res.end({status: "fail"}));
})

app.listen(3000, ()=>{
    console.log("SERVER LISTENED ON 3000!");
})