const API = {

  //This function will go to the api and find the last workout
  //Basically it gets all the workouts from api and then finds the one that in the last position.
  async getLastWorkout() {
    let res;
    try {
      res = await fetch("/api/workouts");
    } catch (err) {
      console.log(err)
    }
    const json = await res.json();

    return json[json.length - 1];
  },

  //based on the workoutType that was chosen by user the data in the delivered parameter will vary
  //data is then converted into a string and delivered to the back-end
  async addExercise(data) {
    const id = location.search.split("=")[1];
    console.log(data);
    console.log(id);
    const res = await fetch("/api/workouts/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const json = await res.json();

    return json;
  },
  //
  async createWorkout(data = {}) {
    const res = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    });

    const json = await res.json();

    return json;
  },

  async getWorkoutsInRange() {
    const res = await fetch(`/api/workouts/range`);
    const json = await res.json();

    return json;
  },
};
