import mongoose, { mongo } from "mongoose";

//1 create a schema:
// a schema in a nosql db is the shape or structure of the data that we want to store in our database
//example a note will have a title and content, so we will create a schema for that
//every note should have a title and content, so we will make those fields required (there could be no note without a title or content)

//2 create model based off that schema
//once we have our schema we can build a model based off that schema, a model is a class that we can use to create and read documents from the database
//think of it like a blueprint for a house, the schema is the blueprint and the model is the actual house that we can build based off that blueprint

const noteSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },

  //this setting will automatically create a createdAt and updatedAt field for us
  { timestamps: true },
);

//create a model based off that schema
//what this line is saying is that we are creating a model called Note that will use the noteSchema to create and read documents from the database
const Note = mongoose.model("Note", noteSchema);

export default Note;
