const express = require('express')
const app = express()
const port = 3000
const MongoClient = require('mongodb').MongoClient;
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

app.use(session({ secret: '비밀코드', resave: true, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: true }))

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
app.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureMessage: true }), (req, res) => {
    res.render('index.ejs')
})
app.get('/join', (req, res) => {
    res.render('join.ejs')
})
app.post('/join', (req, res) => {
    db.collection('member').insertOne({ id: req.body.id, pw: req.body.pw, gender: req.body.gender, age: req.body.age })
    res.redirect('/')
})
passport.use(new LocalStrategy({
    usernameField: 'id',
    passwordField: 'pw',
    session: true,
    passReqToCallback: false,
}, function (입력한아이디, 입력한비번, done) {
    //console.log(입력한아이디, 입력한비번);
    db.collection('member').findOne({ id: 입력한아이디 }, function (에러, 결과) {
        if (에러) return done(에러)

        if (!결과) return done(null, false, { message: '존재하지않는 아이디요' })
        if (입력한비번 == 결과.pw) {
            return done(null, 결과)
        } else {
            return done(null, false, { message: '비번틀렸어요' })
        }
    })
}));

passport.serializeUser(function (user, done) {
    done(null, user.id)
});

passport.deserializeUser(function (아이디, done) {
    db.collection('member').findOne({ id: 아이디 }, function (에러, 결과) {
        done(null, 결과)
    })
}); 