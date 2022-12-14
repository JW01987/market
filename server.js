const express = require('express')
const app = express()
const port = 3000
const MongoClient = require('mongodb').MongoClient;

var db;

MongoClient.connect('mongodb+srv://jean:jean1997!@cluster0.vy1cknt.mongodb.net/?retryWrites=true&w=majority', { useUnifiedTopology: true }, function (에러, client) {
    if (에러) return console.log(에러)
    db = client.db('market'); //market데베에 접속좀헤주세용

    // db.collection('member').insertOne({ 이름: 'jean', _id: 1 }, function (에러, 결과) {
    //     console.log('저장완료');
    // });

    app.listen(port, function () {
        console.log(`listening on ${port}`)
    })
})
app.set('view engine', 'ejs')
app.use('/public', express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('index.ejs')
})
app.get('/login', (req, res) => {
    res.render('login.ejs')
})
app.get('/join', (req, res) => {
    res.render('join.ejs')
})

