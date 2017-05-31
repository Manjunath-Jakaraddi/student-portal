var mongoose = require("mongoose");
var schema = mongoose.Schema;

var subSchema = new schema({
    subName: {
        type: String,
        required: true,
        default: null
    },
    subCode: {
        type: String,
        required: true,
        default: null
    },
    
    mark: {
        type: Number,
        required: true,
        max: 65,
        default: -5
    },
    attendance: {
        type: Number,
        required: true,
        max: 25,
        min: 0,
        default: 0
    }
},
    {
    timeStamp: true
});

var studSchema = new schema({
    name: {
        type: String,
        required: true,
        default: null,
    },
    usn: {
        type: String,
        required: true,
        default: null,
    },
    subject: [subSchema]
},
    {
    timeStamp: true
}   
);

var student = mongoose.model('student', studSchema);

module.exports = student;