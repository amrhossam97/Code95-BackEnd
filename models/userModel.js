let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;
let User = new Schema(
    {
      user_id: {
        type: ObjectId
      },
      first_name: {
        type: String
      },
      last_name: {
        type: String
      },
      full_name: {
        type: String
      },
      gender: {
        type: String
      },
      number_of_messages: { 
        type: Number
       },
      age: {
        type : Number
      },
      creation_date: {
        type : Date
      },
    },
    { collection: "Users" }
  );
  
  let Users = mongoose.model("Users", User);
  
  module.exports = Users;