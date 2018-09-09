// Your `apiRoutes.js` file should contain two routes:

// * A GET route with the url `/api/friends`. This will be used to display a JSON of all possible friends.
// * A POST routes `/api/friends`. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic. 

// linbking this routes to the data sources
const friends = require("../app/data/friends");

module.exports = function (app) {

    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function (req, res) {
        // assigning variables for users results
        const userData = req.body;
        const totalDifference = 0;
        const allDifferences = [];

        // math.abs will give a value of the difference in numbers
        for (var i = 0; i < friends.length - 1; i++) {
            for (var j = 0; j < 6; j++) {
                totalDifference += Math.abs(
                    friends[i].scores[j] - userData.scores[j]
                );
            }
            allDifferences.push(totalDifference);
            totalDifference = 0;
        }

        const closesMatch = friends[
            allDifferences.indexOf(Math.min.apply(null, allDifferences))
        ];
        res.send(closesMatch);
    });

};