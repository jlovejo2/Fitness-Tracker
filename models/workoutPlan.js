const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutPlanSchema = new Schema({
  exercises: [
    {
      type: Schema.Types.ObjectId,
      ref: "Exercises"
    }
  ]
});

const WorkoutPlan = mongoose.model("WorkoutPlan", WorkoutPlanSchema);

module.exports = WorkoutPlan;
