const workoutTypeSelect = document.querySelector("#type");
const cardioForm = document.querySelector(".cardio-form");
const resistanceForm = document.querySelector(".resistance-form");
const cardioNameInput = document.querySelector("#cardio-name");
const nameInput = document.querySelector("#name");
const weightInput = document.querySelector("#weight");
const setsInput = document.querySelector("#sets");
const repsInput = document.querySelector("#reps");
const durationInput = document.querySelector("#duration");
const resistanceDurationInput = document.querySelector("#resistance-duration");
const distanceInput = document.querySelector("#distance");
const completeButton = document.querySelector("button.complete");
const addButton = document.querySelector("button.add-another");
const toast = document.querySelector("#toast");
const newWorkout = document.querySelector(".new-workout");

let workoutType = null;
let shouldNavigateAway = false;

//This is a function that initialis the page with exercise information
async function initExercise() {
//an empty variable workout is being declared
  let workout;

  // this if statement is running a search for anything after the ? in the url that navigates to this page.
  //If nothing is found (no workout is being continued) then run the code within this if statement.
  if (location.search.split("=")[1] === undefined) {
    //runs the code createWorkout() function from API.js
    workout = await API.createWorkout()
  }
  //This code will run if a workout id is delivered in the url.  So user chooses to continue a workout
  //NOTE: this front end is using location.search instead of delivering id as a req.parameter
  if (workout) {
    console.log('workout exists');
    location.search = "?id=" + workout._id;
  }

};

//The above initExercise function is being called
initExercise();

//The below function creates the functionality for the user to change the workout-type of a workout
//The d-none class is removed from the desired workout Type class and added to the workout type that is not desired
function handleWorkoutTypeChange(event) {
  workoutType = event.target.value;

  if (workoutType === "cardio") {
    cardioForm.classList.remove("d-none");
    resistanceForm.classList.add("d-none");
  } else if (workoutType === "resistance") {
    resistanceForm.classList.remove("d-none");
    cardioForm.classList.add("d-none");
  } else {
    cardioForm.classList.add("d-none");
    resistanceForm.classList.add("d-none");
  }

//Once the d-none class is added to the proper divs the validate input function is called
  validateInputs();
}

//This function is making the proper inputs show up for the user based on the workoutType they select
//variable isValid is declared as true or false for each input type.  Then based on the that value 
//The classes proper classes to dislay are either removed or added. 
function validateInputs() {
  let isValid = true;

  if (workoutType === "resistance") {
    if (nameInput.value.trim() === "") {
      isValid = false;
    }

    if (weightInput.value.trim() === "") {
      isValid = false;
    }

    if (setsInput.value.trim() === "") {
      isValid = false;
    }

    if (repsInput.value.trim() === "") {
      isValid = false;
    }

    if (resistanceDurationInput.value.trim() === "") {
      isValid = false;
    }
  } else if (workoutType === "cardio") {
    if (cardioNameInput.value.trim() === "") {
      isValid = false;
    }

    if (durationInput.value.trim() === "") {
      isValid = false;
    }

    if (distanceInput.value.trim() === "") {
      isValid = false;
    }
  }

  if (isValid) {
    completeButton.removeAttribute("disabled");
    addButton.removeAttribute("disabled");
  } else {
    completeButton.setAttribute("disabled", true);
    addButton.setAttribute("disabled", true);
  }
}


//This function determines what data is submitted to the the databased. 
async function handleFormSubmit(event) {
  event.preventDefault();
  console.log(event);
  let workoutData = {};
//If the workout type of cardio is chosen the key-value pairs withi this if statement will be placed into workoutData
//Note: workoutData.type = "cardio" will create the key of type in workoutData and then set the value for that key equal to "cardio"
  if (workoutType === "cardio") {
    workoutData.type = "cardio";
    workoutData.name = cardioNameInput.value.trim();
    workoutData.distance = Number(distanceInput.value.trim());
    workoutData.duration = Number(durationInput.value.trim());
    //If the workout type of resistance is chosen the key-value pairs within this if statement will be placed into workoutData
  } else if (workoutType === "resistance") {
    workoutData.type = "resistance";
    workoutData.name = nameInput.value.trim();
    workoutData.weight = Number(weightInput.value.trim());
    workoutData.sets = Number(setsInput.value.trim());
    workoutData.reps = Number(repsInput.value.trim());
    workoutData.duration = Number(resistanceDurationInput.value.trim());
  }

  //This line calls the addExercise function within the api.js file delivering workoutData as a parameter
  //This will save the exercise in the databased under the correct workout
  await API.addExercise(workoutData);
  clearInputs();

  //This finds the div with id of toast and adds the success class (makes its color green). 
  toast.classList.add("success");
};

//This function is used to handle the toast animation when leaving the page
function handleToastAnimationEnd() {
  toast.removeAttribute("class");
  if (shouldNavigateAway) {
    location.href = "/";
  }
};

//This function clears the input values
function clearInputs() {
  cardioNameInput.value = "";
  nameInput.value = "";
  setsInput.value = "";
  distanceInput.value = "";
  durationInput.value = "";
  repsInput.value = "";
  resistanceDurationInput.value = "";
  weightInput.value = "";
};

if (workoutTypeSelect) {
  //this line of code uses the addEventListener method to add a specific event listener to the div declared by workoutTypeSelect
  //when the div is changed the handleWorkoutTypeChange function is called
  workoutTypeSelect.addEventListener("change", handleWorkoutTypeChange);
}
if (completeButton) {
  //the completeButton is clicked the handleFormSubmit function is called
  completeButton.addEventListener("click", function (event) {
    shouldNavigateAway = true;
    handleFormSubmit(event);
  });
}
if (addButton) {
  //If the addbutton is clicked the handleFormsubmit function is called
  addButton.addEventListener("click", handleFormSubmit);
}
//If the animation is ended on the toast Div the handleToastAnimationEnd function is called
toast.addEventListener("animationend", handleToastAnimationEnd);

//This line of code utilizies chaining
//It finds all the input divs and then runs an event listener on those inputs.
//If a value is input into them the validateInputs function is called
document
  .querySelectorAll("input")
  .forEach(element => element.addEventListener("input", validateInputs));
