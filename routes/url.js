const express = require("express")

const {handleGenerateNewShortURL, handlGetAnalytics} = require("../controllers/url")

const router = express.Router();

router.post("/",handleGenerateNewShortURL);

router.post("/analytics/:shortId" , handlGetAnalytics)

module.exports = router;

