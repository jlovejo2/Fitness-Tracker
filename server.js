const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

// below comment line is for connecting to local mongoD
// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fitnessTrackerdb", { useNewUrlParser: true });

//Added to connect to mongoose and heroku

const routes = require('./controllers/controller.js');

app.use(routes);

// Set up promises with mongoose
// mongoose.Promise = global.Promise;

mongoose.connect(
    process.env.MONGODB_URI || 
    "mongodb://jlovejo2:Frisbee2010@ds259528.mlab.com:59528/heroku_wffjjmzd",
         {
            useNewUrlParser: true
         }
         );


// "/"  navigates to the fitness tracker exercise.html
app.get("/", (req, res) => {
            res.sendFile(__dirname + '/public/index.html');
    })
    // "/stats" navigates to the dashboard stats.html
app.get("/stats", (req, res) => {
            res.sendFile(__dirname + '/public/stats.html');
    });
    
    //route "/exercise"  create new workout or update the last workout used
app.get("/exercise", (req, res) => {
            res.sendFile(__dirname + '/public/exercise.html');
    });
    
    // Start the server
app.listen(PORT, () => {
            console.log(`App running on port ${PORT}!`);
});