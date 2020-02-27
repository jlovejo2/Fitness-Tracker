const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fitnessTrackerdb", { useNewUrlParser: true });


// "/"  navigates to the fitness tracker exercise.html
app.get("/", (req, res) => {
    res.send('./index.html');
})
// "/stats" navigates to the dashboard stats.html

//route "/exercise?" continue workout so will need to add in workout identifier  

//route "/exercise"  create new workout
app.get("/exercise", (req, res) => {
    res.redirect('./exercise.html');
});

//This code creates an exercise in the api based on delivered data.  Then places that exercise in the schema of the workoutPlan collection field that has its id returned in the url
app.put("/api/workouts/:id", (req ,res) => {
    const workoutID = req.params.id;    
    //This line of code takes the exercise data that was input from the user on the front end, turns it into a string, and the places it in exercise collection under 'body' field
    db.Exercises.create({ body: JSON.stringify(req.body) } )
        //This line of code takes the id from the returned exercise that was created.  A search is done for the current workout plan the user is in
        //Then using _id of newly created exercise.  We push that newly created exercise into the exercise area schema in the workoutPlan collection 
        .then(({ _id }) => db.WorkoutPlan.findByIdAndUpdate(workoutID, { $push: {exercises: _id } }, {new : true}) )
        .then( () => db.WorkoutPlan.findByIdAndUpdate(workoutID, { $push: {totalDuration: req.body.duration} }, {new: true}))
        .then(updatedWorkout => {   //send the updated workout back to front end
            res.json(updatedWorkout);
        })
        .catch(({ message }) => {
            console.log(message);
        });
});

app.post("/api/workouts", (req,res) => {
    //This code creates a new workout plan
    db.WorkoutPlan.create({})
        .then(dbWorkoutPlan => {
            //send the newly created workoutPlan back to front end
            res.json(dbWorkoutPlan);
        })
        .catch(({ message }) => {
            console.log(message);
        });
});

app.get("/api/workouts", (req,res) => {
    //This code finds all workout plans
    db.WorkoutPlan.find({})
        .then(dbWorkoutPlan => {
            //send the newly workoutPlans to front end
            res.json(dbWorkoutPlan);
        })
        .catch(({ message }) => {
            console.log(message);
        });
});



// Start the server
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });