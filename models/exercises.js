const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExercisesSchema = new Schema({
  type: {
    type: String
  },
  name: String,
  duration: {
    type: Number,
    default: 0,
  },
  weight: {
    type: Number,
    default: 0,
  },
  distance: {
    type: Number,
    default: 0
  },
  reps: {
    type: Number,
    default: 0,
  },
  sets: {
    type: Number,
    default: 0
  }
});

//This is a method that was writtent to find the type of a given exercise.  I used this for testing and exploring of possible options for awhile
ExercisesSchema.methods.findType = function findType() {
  return this.model('Exercises').find({ type: this.type });
};

//This code is important if you want virtuals to show up as objects to the client.  The default is for them to to be skipped
ExercisesSchema.set('toObject', { virtuals: true });
ExercisesSchema.set('toJSON', { virtuals: true });

const Exercises = mongoose.model("Exercises", ExercisesSchema);

module.exports = Exercises;
