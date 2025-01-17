const express = require("express");

const path = require("path")

const urlRoute = require("./routes/url")

const staticRoute = require("./routes/staticRouter")

const URL = require("./models/url")

const {connectToMOngoDB} = require("./connect")

const app = express();
const PORT = 8001;

connectToMOngoDB("mongodb://127.0.0.1:27017/short-url")
.then(()=>console.log("Connected To MongoDb"))


//To add ejs engine for rendering
app .set("view engine", "ejs");
app.set('views' , path.resolve("./views"));


app.use(express.json());

app.use(express.urlencoded({extended:false}));

app.use("/url", urlRoute);

app.use("/", staticRoute);

//Get request to http server to redirect to the original url which was converted
app.get("/url/:shortId" , async (req,res)=>{

    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    }, 
    {
        $push: {
        visitHistory : {
            timestamp : Date.now()
        },
    }
    });

res.redirect(entry.redirectURL);

});

app .listen(PORT, ()=>console.log(`Server started at PORT : ${PORT}`));