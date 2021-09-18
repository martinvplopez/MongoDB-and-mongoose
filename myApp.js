require('dotenv').config();
const { Schema, Number } = require('mongoose');
let mongoose=require("mongoose");
// Connecting to Mongo Atlas Cluster (DB server)
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Creating a "Schema" which is an entity with its attributes
let personSchema=new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods:[String]
}) ;

let Person=mongoose.model("Person", personSchema);
// Creating a new document instance and saving it.
const createAndSavePerson = (done) => {
  let martin= new Person({name:"Martín", age:20,favoriteFoods: ["pizza", "protein"]});
  martin.save((error,data)=>{
    if(error){
      console.log(error);
    }else{
      done(null,data);
    }
  });
};
// Creating new document instances in the same function and saving it in the DB
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err,data)=>{
    if(err) return console.log(err);
    done(null,data);
  });
}

const findPeopleByName = (personName, done) => {
  done(null /*, data*/);
};

const findOneByFood = (food, done) => {
  done(null /*, data*/);
};

const findPersonById = (personId, done) => {
  done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
