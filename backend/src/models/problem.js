const { default: mongoose } = require("mongoose");
const mongoos = require("mongoose");
const { Schema } = mongoos;

const problemSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    enum: ["esay", "medium", "hard"],
    required: true,
  },
  tags: {
    type: String,
    enum: ["array", "linkedList", "graph", "dp"],
    required: true,
  },
  visibleTastCases: [
    {
      input: {
        type: String,
        required: true,
      },
      output: {
        type: String,
        required: true,
      },
      explantion: {
        type: String,
        required: true,
      },
    },
  ],
  hiddenTastCases: [
    {
      input: {
        type: String,
        required: true,
      },
      output: {
        type: String,
        required: true,
      },
    },
  ],
  startCode: [
    {
      language: {
        type: String,
        required: true,
      },
      initialCode: {
        type: String,
        required: true,
      },
    },
  ],
  referenceSolution: [
    {
      language: {
        type: String,
        required: true,
      },
      completeCode: {
        type: String,
        required: true,
      },
    },
  ],

  problemCreator: {
    type: Schema.Types.ObjectId,
    //reference to user.js me user ka
    ref: "user",
    required: true,
  },
});

const Problem = mongoose.model("problem", problemSchema);
module.exports = Problem;
