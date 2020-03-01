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
  totalWeight: [
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

//This is a method for the workout plan schema to deliver all the distances for the exercises associated with it
//This is used in a controller-function
WorkoutPlanSchema.methods.findAllDistances = function findAllDistances() {
  return this.model('WorkoutPlan').find({ exercises: this.exercises }).populate({ path: 'exercises', select: 'distance' });
};

//This is a method for the workout plan schema to deliver all the reps for the exercises associated with it
//This is a used in a controller function
WorkoutPlanSchema.methods.findAllReps = function findAllReps() {
  return this.model('WorkoutPlan').find({ exercises: this.exercises }).populate({ path: 'exercises', select: 'reps' });
};

//This is a method for the workout plan schema to deliver all the sets for the exercises associated with it
//This is a used in a controller function
WorkoutPlanSchema.methods.findAllSets = function findAllSets() {
  return this.model('WorkoutPlan').find({ exercises: this.exercises }).populate({ path: 'exercises', select: 'sets' });
};

//This makes virtuals visible to the client
WorkoutPlanSchema.set('toObject', { virtuals: true });
WorkoutPlanSchema.set('toJSON', { virtuals: true });


const WorkoutPlan = mongoose.model("WorkoutPlan", WorkoutPlanSchema);

module.exports = WorkoutPlan;
