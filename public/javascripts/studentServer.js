
var mongoose = require('mongoose');
var assert = require('assert');
var csv = require('csv-stream');
var fs = require('fs');

var options = {
	delimiter : ',', 
	endLine : '\n'  
}

var student = require('./models/studentSchema');

url = 'mongodb://localhost:27017/test';
mongoose.connect(url);
 
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

fs.createReadStream('C:/Users/sharath/student-portal/public/javascripts/test.csv')
	.pipe(csv.createStream(options))
	.on('data',function(data){
    
    
        db.once('open',function(){
            console.log('connection established');
            student.create({
                name: data.name,
                usn: data.usn,
                subject:[{
                    subName: 'Maths',
                    subCode: '12MA41',
                    mark: data.math,
                    attendance: data.math_at
                    },
                    {
                    subName: 'Biology',
                    subCode: '12EB42',
                    mark: data.bio,
                    attendance: data.bio_at,
                    },
                    {
                    subName: 'TOC',
                    subCode: '12CS43',
                    mark: data.toc,
                    attendance: data.toc_at,
                    },
                    {
                    subName: 'OS',
                    subCode: '12CS44',
                    mark: data.os,
                    attendance: data.os_at,
                    },
                    {
                    subName: 'DAA',
                    subCode: '12CS45',
                    mark: data.daa,
                    attendance: data.daa_at,
                    },
                    {
                    subName: 'OOPS',
                    subCode: '12CS46',
                    mark: data.oops,
                    attendance: data.oops_at,
                    }
                ]
            },function(err,stud){
                if(err)
                    console.log(err);
                else
                {
                    console.log('data inserted successfully');
                    console.log(stud);
                }
                db.close();
            });
        });
	})
	.on('end',function(){
		console.log('end!');
	})
	.on('close',function(){
		console.log('close!');
	})