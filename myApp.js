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
// Adding a find query(will return every match)
const findPeopleByName = (personName, done) => {
  Person.find({"name":personName}, (err,person)=>{
    if(err) return console.log(err);
    console.log(person);
    done(null,person);
  });
  
};
// Adding a find query(will return only one match)
const findOneByFood = (food, done) => {
  Person.findOne({"favoriteFoods":food}, (err,person)=>{
    if(err) return console.log(err);
    console.log(person);
    done(null,person);
  })
};
// Finding by the _id (default alphanumeric key, unique)
const findPersonById = (personId, done) => {
  Person.findById(personId, (err,person)=>{
    if(err) return console.log(err);
    console.log(person);
    done(null,person);
  })
};
// Updating the old way: finding, editing and saving
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err,person)=>{
    if(err) return console.log(err);
    person.favoriteFoods.push(foodToAdd);
    person.save((error,data)=>{
      if(error) return console.log(error);
      done(null,data);
    });
  })
};
// Newer method to update
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({"name":personName}, {"age":ageToSet},{new:true},(err, person)=>{
    if(err) return console.log(err);
    done(null,person);
  });
};

// Removig a document. Model.deleteOne()
// Model.remove() doesn’t return the deleted document, but a JSON object containing the outcome of the operation, and the number of items affected
const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err,person)=>{
    if(err) return console.log(err);
    done(null,person);
  })
};

// Better to use Model.deleteMany().
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({"name": nameToRemove},(err,person)=>{
    if(err) return console.log(err);
    done(null,person);
  });

};
// Chaining query helpers
const queryChain = (done) => {
  const foodToSearch = "burrito";
  let querySaved= Person
  .find({"favoriteFoods":foodToSearch})
  .sort({name:1})
  .limit(2)
  .select({age:0});
  querySaved.exec((err,person)=>{
    if(err) return console.log(err);
    done(null,person);
  })

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
