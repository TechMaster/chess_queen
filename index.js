const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const nunjucks = require('nunjucks');


app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/public', express.static('public'));

//Cấu hình nunjucks
nunjucks.configure('views', {
  autoescape: true,
  cache: false,
  express: app,
  watch: true
});
app.engine('html', nunjucks.render);
app.set('view engine', 'html');


require('./router')(app);

const server = app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Error: ' + err.message)
});








