const express = require('express');
const router = express.Router();
const multer = require('multer');
const nodemailer = require("nodemailer");
const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');


router.get('/get', (req, res) => {
  res.send(
    "<h1 style='text-align: center'>Wellcome to FunOfHeuristic <br><br>😃👻😃👻😃👻😃👻😃</h1>"
  );
});

router.post('/send', (req, res) => {
  console.log("request came");
  let user = req.body;
  sendMail(user, info => {
    console.log(`The mail has been send and the id is ${info.messageId}`);
    res.send(info);
  });
});

async function sendMail(user, callback) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'cumarpun1234@gmail.com',
      pass: 'jimin@@1234'
    }
  });
    
  let mailOptions = {
    from: 'cumarpun1234@gmail.com',
    to: user.email,
    subject: "Test email ", // Subject line
    text: 'Hi You are receiving this message '+
            'please use this email : \n\n' + 
             user.email + '.\n\n',
            
  };
  
 // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions);

  callback(info);
}

var storage = multer.diskStorage({

    
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },

    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    },
    
})
var upload = multer({ storage: storage }).single('file');

router.post('/file' , (req, res) => {


    upload(req, res, function (err) {

      let user = req.body;

        if (err) {
            console.log(err);
        }
        res.json({
            success: true,
            message: 'File sent'
        })
    
        // console.log('The filename is ' + res.req.file.filename);
        // res.send(res.req.file.filename);  
    
        // create reusable transporter object using the default SMTP transport

        let transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: 'cumarpun1234@gmail.com',
            pass: 'jimin@@1234'
          }
        });
          
          let mailOptions = {
            from: 'cumarpun1234@gmail.com',
            to: user.email,
            subject: "Test email ", // Subject line
            text: 'Hi You are receiving this message '+
                    'please use this email : \n\n' + 
                      + '.\n\n',
                    
                  
          attachments: [
              {   
                filename : '',
                path : './uploads/' + res.req.file.filename ,
                contentType: 'application/pdf'
              }
          ]
                  
        };
        
       // send mail with defined transport object
      transporter.sendMail(mailOptions);

     })
           
      })

//       var uploadsDir = __dirname + '/uploads';

// fs.readdir(uploadsDir, function(err, files) {
  
//   files.forEach(function(file, index) {
//     fs.stat(path.join(uploadsDir, file), function(err, stat) {
//       var endTime, now;
//       if (err) {
//         return console.error(err);
//       }
//       now = new Date().getTime();
//       endTime = new Date(stat.ctime).getTime() + 36000;
//       if (now > endTime) {
//         return rimraf(path.join(uploadsDir, file), function(err) {
//           if (err) {
//             return console.error(err);
//           }
//           console.log('successfully deleted');
//         });
//       }
//     });
//   })
  
// });


module.exports = router;

//   let directory = "./uploads";
//   let dirBuf = Buffer.from(directory);

//   let files = fs.readdirSync(directory);
//   console.log(files);

// var files = fs.readdirSync('./uploads');

// for(var i in files) {
//    if(path.extname(files[i]) === ".pdf") {
//        //do something
//        console.log(files);
//    }
// }