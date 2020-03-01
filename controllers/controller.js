//Imports express npm
const express = require('express');

//calls the express.router method
const router = express.Router();

//imports the burgers model to interact with burgers table in burger database
const db = require('../models');

//Requiring controller functions from controller-functions.js file
const custFunc = require('./controller-functions')

//This code creates an exercise in the api based on delivered data.  Then places that exercise in the schema of the workoutPlan collection field that has its id returned in the url
router.put("/api/workouts/:id", (req, res) => {
    const workoutID = req.params.id;
    //This line of code takes the exercise data that was input from the user on the front end, turns it into a string, and the places it in exercise collection under 'body' field
    db.Exercises.create(req.body)
        //This line of code takes the id from the returned exercise that was created.  A search is done for the current workout plan the user is in
        //Then using _id of newly created exercise.  We push that newly created exercise into the exercise area schema in the workoutPlan collection 
        .then((exercise) => db.WorkoutPlan.findByIdAndUpdate(workoutID, { $push: { exercises: exercise._id, totalDuration: req.body.duration, totalWeight: req.body.weight, totalDistance: req.body.distance } }, { new: true }))
        .then(updatedWorkout => {
            //send the updated workout back to front end
            res.json(updatedWorkout);
        })
        .catch(({ message }) => {
            console.log(message);
        });
});

//This route creates a new workout plan and sends it to the front end.  It is called when user clicks on the new workout button
router.post("/api/workouts", (req, res) => {
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

//This route finds all the workout plans in the database and fills those workouts with the exercise data using the populate method.
//The workout plan objects are reformatted with a function from controller-functions.js because my database layout does not exactly match what the front-end expected
router.get("/api/workouts", (req, res) => {
    console.log('in api/workouts');
    //This code finds all workout plans
    db.WorkoutPlan.find({}).populate({ path: 'exercises' })
        .then(dbWorkoutPlan => {

            //this code takes the workoutplan data pulled from the database and reformats it to match what the front-end was expecting.
            let dataToBeSentArr = custFunc.reformatObjectSummary(dbWorkoutPlan);
            //Send data back to client in json format
            res.json(dataToBeSentArr);
        })
        .catch(({ message }) => {
            console.log(message);
        });
});
//This route gets all the workouts from the database in the specific range.  In my case it is grabbing the last seven workouts from the data base and sorting them in descending order
router.get("/api/workouts/range", (req, res) => {
    console.log("in api/workouts/range");

    //This line of code finds the 7 most recent workouts with exercise data objects populated in them and sorts them in descending order
    db.WorkoutPlan.find({}).populate({ path: 'exercises', options: { limit: 7, sort: { day: -1 } } })
        .then(workoutData => {

            //The code  between "++++" is reformatting the data from the backend in a way that it is displayed properly to the dashboard. 
            //I believe the dashboard is looking for daily totals for the bar chart and line chart and then individual exercise names for the donut and pie chart
            //The only way I solved this was to put all the names of the exercises in a string for that day and then send it to front end
            //+++++++++++++++++++++++++++++++++++++++++++
            let workoutsArr = [];

            for (workout of workoutData) {
                const newObj = {
                    exercises: [{
                        duration: 0,
                        distance: 0,
                        reps: 0,
                        sets: 0,
                        weight: 0,
                        name: []
                    }]
                };

                let names = "";
                let totalDuration = 0;
                let totalDistance = 0;
                let totalReps = 0;
                let totalSets = 0;
                let totalWeight = 0;

                for (exercise of workout.exercises) {
                    console.log(exercise)
                    totalDuration = totalDuration + exercise.duration;
                    totalDistance = totalDistance + exercise.distance;
                    totalReps = totalReps + exercise.reps;
                    totalSets = totalSets + exercise.sets;
                    totalWeight = totalWeight + exercise.weight;
                    names = names + " " + exercise.name;

                }
                newObj.exercises[0].duration = totalDuration;
                newObj.exercises[0].distance = totalDistance;
                newObj.exercises[0].reps = totalReps;
                newObj.exercises[0].sets = totalSets;
                newObj.exercises[0].weight = totalWeight;
                newObj.exercises[0].name.push(names);
                workoutsArr.push(newObj);
            }
            //++++++++++++++++++++++++++++++++++++++++++=
            console.log(workoutsArr);
            res.json(workoutsArr);
        })
});


module.exports = router;