var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  swig.renderFile('./template.html', {}, function (err, output) {
    if (err) {
      throw err;
    }
    console.log(output);
  });
});

module.exports = router;
