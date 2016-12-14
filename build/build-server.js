var express = require('express')
var config = require('../config')
var port = process.env.PORT || config.build.port
var app = express();
var mockData = require('../mock.json')
var sellerData = mockData.seller
var goodsData = mockData.goods
var ratingsData = mockData.ratings
var router = express.Router()
var apiRouter = express.Router()

router.get('/', function(req, res, next) {
    req.url = '/index.html';
    next();
});
app.use(router)

apiRouter.get('/seller',function(req,res){
    res.json({
        errno:0,
        data:sellerData
    })
})
apiRouter.get('/goods',function(req,res){
    res.json({
        errno:0,
        data:goodsData
    })
})
apiRouter.get('/ratings',function(req,res){
    res.json({
        errno:0,
        data:ratingsData
    })
})
app.use('/api',apiRouter)

app.use(express.static('./dist'));

module.exports = app.listen(port, function (err) {
    if (err) {
        console.log(err);
        return
    }
    var uri = 'http://localhost:' + port
    console.log('Listening at ' + uri + '\n')
});