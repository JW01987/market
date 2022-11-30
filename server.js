const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.use('/public', express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
