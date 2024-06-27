const nodemailer = require('nodemailer')
const MovieUserBase = require('./models/User')
const cron = require('node-cron')
require('dotenv').config();
const { spawn } = require('child_process');

const password = process.env.REACT_APP_PASSWORD;

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "movienetworkupdate@gmail.com",
    pass: password,
  },
});

const sendUpdate = async(user) => {
    console.log("environment variable check");
    console.log(process.env.REACT_APP_PASSWORD);
    console.log(user);
    var news = []
    const findNews = spawn('python', ['./searchWeb.py', JSON.stringify(user.preferredNews), JSON.stringify(user.favoriteGenres), 
      JSON.stringify(user.favoriteActors), JSON.stringify(user.preferredLanguage)]);
    findNews.stdout.on('data', function(data) { 
      console.log("find news output");
      console.log(news);
      news = JSON.parse(data.toString());
      var newsLength = news.length;
      var report = "Hello " + user.firstName + ",\n\n" + "Here are your weekly news highlights in the world of movies!\n\n";
      for(let i = 0; i < newsLength; i++) {
        report += (i + 1) + ". " + news[i][0] + "\n\n";
      }
      var htmlContent = report.replace(/\n/g, '<br>');
      report += "From,\nThe Movie Network Team";
      const mailOptions = {
        from: "movienetworkupdate@gmail.com",
        to: user.email,
        subject: "Weekly Highlights",
        html: `<p>${htmlContent}</p>`
      };
    transporter.sendMail(mailOptions, function(error, info){
      if(error) {
        console.log(error);
      }
      else{
        console.log("Email sent: " + info.response)
      }
    });
  });
};

emailUpdate = async() => {
  console.log("email update function");
  const cursor = MovieUserBase.find().cursor();
  for (let user = await cursor.next(); user != null; user = await cursor.next()) {
    sendUpdate(user);
  }
}

module.exports = emailUpdate;