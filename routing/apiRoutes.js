// Your `apiRoutes.js` file should contain two routes:

// * A GET route with the url `/api/friends`. This will be used to display a JSON of all possible friends.
// * A POST routes `/api/friends`. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic. 

// linbking this routes to the data sources
var friendsData = require("../app/data/friends");

module.exports = function (app) {

    app.get("/api/friends", function (req, res) {
        res.json(friendsData);
    });

    app.post("/api/friends", function (req, res) {

        console.log('data' + req.body);

        // assigning variables for users results
        var userData = req.body;
        var totalDifference = 0;
        var allDifferences = [];

        // math.abs will give a value of the difference in numbers
        for (var i = 0; i < friendsData.length; i++) {
            for (var j = 0; j < friendsData[i].score.length; j++) {
                totalDifference += Math.abs(
                    friendsData[i].score[j] - userData.scores[j]
                );
                console.log(totalDifference)
            }
            allDifferences.push(totalDifference);

            // totalDifference = 0;
        }

        var closestMatch = friendsData[
            allDifferences.indexOf(Math.min.apply(null, allDifferences))
        ];
        console.log(closestMatch + "this is working")
        res.json(closestMatch);
    });

};