const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutPlanSchema = new Schema({
  day: {
    type: Date,
    default: Date.now()
  },
  totalDuration: [
    {
      type: Schema.Types.Number,
      ref: "Exercises"
    }
  ],
  exercises: [
    {
      type: Schema.Types.ObjectId,
      ref: "Exercises"
    }
  ]
});


const WorkoutPlan = mongoose.model("WorkoutPlan", WorkoutPlanSchema);

module.exports = WorkoutPlan;
