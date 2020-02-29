//Imports express npm
const express = require('express');

//calls the express.router method
const router = express.Router();

//imports the burgers model to interact with burgers table in burger database
const db = require('./models/index.js');

//This code creates an exercise in the api based on delivered data.  Then places that exercise in the schema of the workoutPlan collection field that has its id returned in the url
router.put("/api/workouts/:id", (req, res) => {
    const workoutID = req.params.id;
    //This line of code takes the exercise data that was input from the user on the front end, turns it into a string, and the places it in exercise collection under 'body' field
    db.Exercises.create({ body: JSON.stringify(req.body) })
        //This line of code takes the id from the returned exercise that was created.  A search is done for the current workout plan the user is in
        //Then using _id of newly created exercise.  We push that newly created exercise into the exercise area schema in the workoutPlan collection 
        .then(({ _id }) => db.WorkoutPlan.findByIdAndUpdate(workoutID, { $push: { exercises: _id } }, { new: true }))
        .then(() => db.WorkoutPlan.findByIdAndUpdate(workoutID, { $push: { totalDuration: req.body.duration } }, { new: true }))
        .then(updatedWorkout => {
            //send the updated workout back to front end
            res.json(updatedWorkout);
        })
        .catch(({ message }) => {
            console.log(message);
        });
});

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

router.get("/api/workouts", (req, res) => {
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

router.get("/api/workouts/range", (req, res) => {
    db.WorkoutPlan.find({}).populate({ path: 'exercises', options: { limit: 7, sort: { day: -1 } } })
        .then(workoutData => {
            // console.log(JSON.parse(exerciseData[0].exercises[0].body));
            console.log(workoutData[0]);
            let dataToBeSentArr = [];

            for (let workout of workoutData) {
                let objReformat = {};
                let exerciseArr = [];
                objReformat.day = workout.day;
                objReformat.duration = workout.totalDuration.reduce(function (timeA, timeB) {
                    return timeA + timeB;
                }, 0);;

                workout.exercises.forEach(exercise => {
                    exerciseArr.push(JSON.parse(exercise.body))

                })
                objReformat.exercises = exerciseArr
                dataToBeSentArr.push(objReformat);
            }
            console.log(dataToBeSentArr);
            res.json(dataToBeSentArr);
        });
});
