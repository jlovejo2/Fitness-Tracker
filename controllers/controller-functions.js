//This calls the function I wrote that will sum all the elements of an array and skip the nulls
const sum = require('./functions');

module.exports = {

    //This function reformats the data from the database and delivers it in a way that will allow the workout.js to render that data into the last workout summary
    reformatObjectSummary(workoutData) {

        let dataToBeSentArr = [];

        for (let workout of workoutData) {
            let objReformat = {};
            objReformat.day = workout.day;
            objReformat.duration = sum(workout.totalDuration)
            objReformat.weight = sum(workout.totalWeight)
            objReformat.exercises = workout.exercises
            dataToBeSentArr.push(objReformat)
        };
        return dataToBeSentArr;
    },

    //This is function I did not end up using but it is delivered a workout and will find all the distances from the exercises in it and then total them up
    async findTotalDistanceOfWorkout(workout) {
        workout.findAllDistances().then(ans => {
            let total = 0;

            for (exercise of ans[0].exercises) {

                if (exercise.distance) {

                    total = total + exercise.distance

                } else {
                    console.log('no distance');
                }
            }
            console.log(total);
            return (total)
        });
    },

    //This is function I did not end up using but it is delivered a workout and will find all the reps from the exercises in it and then total them up
    async findTotalRepsOfWorkout(workout) {
        workout.findAllReps().then(ans => {
            let total = 0;

            for (exercise of ans[0].exercises) {

                if (exercise.reps) {

                    total = total + exercise.reps

                } else {
                    console.log('no reps');
                }
            }

            return (total)
        });
    },

    //This is function I did not end up using but it is delivered a workout and will find all the sets from the exercises in it and then total them up
    async findTotalSetsOfWorkout(workout) {
        workout.findAllSets().then(ans => {
            let total = 0;

            for (exercise of ans[0].exercises) {

                if (exercise.sets) {

                    total = total + exercise.sets

                } else {
                    console.log('no sets');
                }
            }
            return (total)
        });
    },
}




//_______________________
//_____Saved Code________
//______________________


// reformatObjectStats(workoutData) {

//     let obj = {};

//     for (let workout of workoutData) {

//         objReformat.exercise = workout.exercises
//         dataToBeSentArr.push(objReformat)

//     }

//     return dataToBeSentArr;
// },