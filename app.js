const express = require('express');
const nunjucks = require('nunjucks');

const app = express();

const ds = require('./data.json');

let PATH_TO_TEMPLATES = './dist' ;
nunjucks.configure(PATH_TO_TEMPLATES, {
   autoescape: true,
   express: app
});


app.get( '/', function( req, res ) {
  var data = ds;
  return res.render( 'index.html', data );
});
app.use(express.static('dist'));

app.listen(3000);