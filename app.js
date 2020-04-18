const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const PollController = require('./controllers/PollController')

const app = express()

app.set('view engine', 'ejs')


app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', PollController.index)
app.get('/create', PollController.createPoll)
app.post('/store', PollController.storePoll )
app.get('/polls/:id',PollController.show );
app.post('/polls/:id', PollController.storeOpinion);

mongoose
  .connect("mongodb://localhost:27017/mydb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {})
  .catch((e) => {
    console.log(e);
  });

app.listen(3000, () => console.log('Listening on 3000'));
