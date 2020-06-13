var express = require('express');
var router = express.Router();

let count = 0;
let check = 0;
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function(req, res, next) {

  if (check > 0) {
    check -= 1;
    res.status(500).send(`${count}`);
  } else if (count % 10 === 0) {
    check = 2;
    res.status(200).send(`${count}`);
  } else {
    res.status(200).send(`${count}`);
  }
  count += 1;
});

module.exports = router;
