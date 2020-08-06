const express = require('express');
const router = express.Router();
const { Favorite } = require("../models/Favorite");

const { auth } = require("../middleware/auth");

//=================================
//             Favorite
//=================================


router.post("/favoriteNumber", auth, (req, res) => {

    //Find Favorite Information from Favorite Collection by TV Show ID

    Favorite.find({"tvShowID": req.body.tvShowID})
    .exec(( err, favorite ) => {
        if(err) return res.status(400).send(err)
        res.status(200).json({ success: true, favoriteNumber: favorite.length })
    })

});


router.post("/favoriteSelect", auth, (req, res) => {

    //Find Favorite Information from Favorite Collection by TV Show ID, userFrom 
    Favorite.find({"tvShowID": req.body.tvShowID, "userFrom": req.body.userFrom})
    .exec(( err, favorite) => {
        if(err) return res.status(400).send(err)
        
    // Logic to detemine is we already select favorite TV Show 
    let result = false;
    if(favorite.length !== 0) {
        result = true
    }
    res.status(200).json({ success: true, favoriteSelect: result })

    })

});



router.post("/addToFavorite", auth, (req, res) => {

    //Save the information (TV Show name or UserID) from the collection
    

    const favorite =  new Favorite(req.body)
    favorite.save((err, doc) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({ success: true })

});
});

router.post("/removeFromFavorite", auth, (req, res) => {

    //Save favorite show and delete
    Favorite.findOneAndDelete({"tvShowID": req.body.tvShowID, "userFrom": req.body.userFrom})
    .exec((err, doc) => {
        if (err) return res.status(400).json({ success: false, err });
        res.status(200).json({ success: true, doc })
    })

});

router.post("/getFavoriteTVShow", auth, (req, res) => {

    //Find all the TV shows the login users saved as favorite
    Favorite.find({"userFrom": req.body.userFrom})
    .exec((err, favorites) => {
        if (err) return res.status(400).send(err);
        return res.status(200).json({ success: true, favorites })
    })

});

module.exports = router;
