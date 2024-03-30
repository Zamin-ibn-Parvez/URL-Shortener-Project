const shortid = require("shortid");

const URL = require("../models/url")  //Importing Database

async function handleGenerateNewShortURL( req, res)
{
    const body = req.body;

    if(!body.url) return res.status(400).json( {error : "URL is required"})
    const shortID = shortid();

    //creating a new URL in database
    await URL.create({

        shortId : shortID,
        redirectURL : body.url,
        visitHistory: [],
    });

    return res.render("home" ,{
        id : shortID
    })
};

async function handlGetAnalytics(req,res) {

    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId})
    return res.json({totalclicks : result.visitHistory.length , Analytics : result.visitHistory})
}
module.exports = {
    handleGenerateNewShortURL,
    handlGetAnalytics
};