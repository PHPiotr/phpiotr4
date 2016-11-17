var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {title: 'PHPiotr 4.0'});
});
router.post('/', function(req, res, next) {
    console.log(req.params);
    res.render('index', {title: 'PHPiotr 4.0'});
});

module.exports = router;
