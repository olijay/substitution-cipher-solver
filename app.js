var express = require('express');
var bodyParser = require('body-parser')
var app = express();
app.use(express.static('public'));

app.use(bodyParser());

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.post('/solve', function(req, res){
  var alphabet = 'a b c d e f g h i j k l m n o p q r s t u v w x y z';
  var alphabetarr = alphabet.split(' ');
  var clue = req.body.clue,
      cipher = req.body.cipher;

  var subdiff = 0;
  if(clue.length == 4) {
    subdiff = clue.charCodeAt(3) - clue.charCodeAt(0);
    console.log(subdiff);
  }

  // shift array from front if subdiff is > 0, otherwise pop from end of array
    for (var i = 0; i<Math.abs(subdiff);i++) {
      if (subdiff > 0) {
        var shifted = alphabetarr.shift();
        alphabetarr.push(shifted);
      }
      else if (subdiff < 0) {
        var popped = alphabetarr.pop();
        alphabetarr.unshift(popped);
      }
  }


  console.log(alphabetarr);

  var ciphersolved = '';
  for (var i = 0; i<cipher.length - 1; i++){
    //console.log(cipher.charCodeAt(i));
    // only lowercase because lazy
    //console.log(alphabetarr[cipher.charCodeAt(i)-97]);
    if (cipher.charCodeAt(i) >= 97 && cipher.charCodeAt(i) <= 122) {
      // index into shifted alphabet array, concat that char, based on ASCII where lowercase a = 97, z = 122
      ciphersolved += alphabetarr[cipher.charCodeAt(i)-97];
    }
    else {
      // if the char isn't lowercase, just concat it directly
      ciphersolved += cipher.charAt(i);
    }

  }
  console.log(ciphersolved);
  res.send(ciphersolved);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
