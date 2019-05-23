var mongoose  = require('mongoose');
//schema
mongoose.connect("mongodb://localhost:27017/smartBrain",{useNewUrlParser:true});
var mongooseSchema = mongoose.Schema({
    fullName:String,
    Email:String,
    Password:String,
    Entries:Number
});
var user =  mongoose.model("user",mongooseSchema);
module.exports = user;