//in exercise.js have two options for exercise data submitted
workoutType === "cardio"
type, name, distance, duration

workoutType === "resistance"
type, name, weight, sets, reps, duration

//based on above workoutType the key-value pairs will be placed into
let workoutData = {};


// in the api.js file the addExercise() function
//the data parameter is the workout delivered by the user.  This object and its key-value pairs change based on what workout Type the user selects.
//The data from the parameter is stringified and saved as a variable body.
async addExercise(data) {
    const id = location.search.split("=")[1];

    const res = await fetch("/api/workouts/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const json = await res.json();

    return json;
}

//