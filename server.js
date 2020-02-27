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

app.put("/api/workouts/:id", (req ,res) => {
    const workoutID = req.params.id;
    console.log(req.params.id)
    db.Exercises.create({ body: JSON.stringify(req.body) } )
        .then(({ _id }) => db.WorkoutPlan.findByIdAndUpdate(workoutID, { $push: {exercises: _id } }, {new : true}) )
        .then(updatedWorkout => {
            console.log('updated workout');
            console.log(updatedWorkout);
            res.json(updatedWorkout);
        })
        .catch(({ message }) => {
            console.log(message);
        });
});

app.post("/api/workouts", (req,res) => {
    console.log(req.body);
    db.WorkoutPlan.create({})
        .then(dbWorkoutPlan => {
            console.log(dbWorkoutPlan)
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