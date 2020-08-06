const express = require("express");
const app = express();
const path = require("path");
const cors = require('cors')
const logger = require("morgan");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const config = require("./config/key");

// const mongoose = require("mongoose");
// mongoose
//   .connect(config.mongoURI, { useNewUrlParser: true })
//   .then(() => console.log("DB connected"))
//   .catch(err => console.error(err));

const mongoose = require("mongoose");
console.log(config.mongoURI, "hello mongo check")
const connect = mongoose.connect(config.mongoURI,
  {
    useNewUrlParser: true, useUnifiedTopology: true,
    useCreateIndex: true, useFindAndModify: false
  })
  .then(() => console.log('MongoDB Connected to Atlas...'))
  .catch(err => console.log(err));

app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:3000",
      "https://react-tv-digital.herokuapp.com"
    ], //Swap this with the client url - Change to netlify in future

    //remove array and set to true - Alternative
  })
)

//to not get any deprecation warning or error
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
//to get json data
// support parsing of application/json type post data
app.use(bodyParser.json());
app.use(cookieParser());
app.use(logger('dev'));

app.use(function(req, res, next) {
  // res.header("Access-Control-Allow-Origin", 'https://vigorous-carson-99c193.netlify.app');
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,X-HTTP-Method-Override,Content-Type,Accept');
  next();
});

// app.get('/', function(req, res, next) {
//   // Handle the get for this route
// });

// app.post('/api/favorite', function(req, res, next) {
//   res.send(
//     `I received your POST request. This is what you sent me: ${req.body.post}`,
//   );
// });

app.use('/api/users', require('./routes/users'));
app.use("/api/favorite", require("./routes/favorite"));

//use this to show the image you have in node js server to client (react js)
//https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client
app.use('/uploads', express.static('uploads'));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {

  // Set static folder   
  // All the javascript and css files will be read and served from this folder
  app.use(express.static("client/build"));

  // index.html for all page routes    html or routing and naviagtion
  // app.get('*', function (req, res) {
  //   const index = path.resolve(__dirname, 'build', 'index.html');
  //   res.sendFile(index);
  // });

  // app.get("*", (req, res) => {
  //   res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  // });

  app.get('*', function (req, res) {
    const index = path.join(__dirname, 'build', 'index.html');
    res.sendFile(index);
  });
}

const port = process.env.PORT || 5000

app.listen(process.env.PORT, () => {
  console.log(`Server Listening on ${port}`)
});