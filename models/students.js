var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Float = require('mongoose-float').loadType(mongoose);



var Cie = new Schema({
  theory : {
      type : Float,
      max : 30,
      min : 0,
      default : 0
  },
  quiz : {
      type : Float,
      max : 15,
      min : 0,
      default : 0
  },
  total : {
      type : Float,
      max : 40,
      min : 0,
      default : 0
  },
  absent : {
      type: Boolean,
      default : false
  }
},
{
    timestamps: true
});

var MaxCie = new Schema({
  theory: {
      type: Number,
      max: 30,
      min: 0,
      required: true
  },
  quiz : {
      type:Number,
      default : 15,
      required: true
  },
  total : {
      type: Number,
      max : 45,
      min : 0,
      required: true
  }
});





var SubjectSchema = new Schema({
    Subname: {
        type : String,
        required : true
    },
    Subcode : {
        type : String,
        required : true
    },
    //Cie details schema
    CieMax : MaxCie,
    CieMarks : [Cie],
    CieLab : {
        Max : {
            type : Number,
            default : 50,
        },
        LabMarks : {
          type: Float,
          max:50,
          min:0,
          default:0,
          required: true
        },
        //Attendance to be maintained here
        absent : {
          type : Boolean,
          default : false
        }
    }
    //Teacher linking to be done here
},
{
  timestamps: true
});




var sem = new Schema({
  Subjects:[{
    type: Schema.Types.ObjectId, ref: 'Subject'
  }],
  SemNumber : {
      type: Number,
      min:1,
      max:8,
      unique:true,
      required:true
  },
  Sgpa : {
      type: Float
  }
},
{
  timestamps: true
});




var StudentProfileSchema = new Schema({
  Semesters : [sem],
  Cgpa : {
    type: Float
  },
  StudentCredentials: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
  //Total sem objects has to be created here
  //All the student profiles to be stored here
},
{
  timestamps: true
});





var Subject  = mongoose.model('Subject', SubjectSchema);
var StudentProfile  = mongoose.model('StudentProfile', StudentProfileSchema);

module.exports = {
  Subject:Subject,
  StudentProfile:StudentProfile
};
