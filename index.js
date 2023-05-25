import express from 'express'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

mongoose.connect(`mongodb+srv://${process.env.DB_LOGIN}:${process.env.DB_PASS}@cluster0.n3ogmpw.mongodb.net/?retryWrites=true&w=majority`)
.then(() => console.log('БД успешно подключена'))
.catch((err) => console.log('Не успешное подключение к БД', err))

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello1')
})

app.post('/auth/login', (req, res) => {
    console.log(req.body);
    const token = jwt.sign({
        email: req.body.email,
        fullName: 'Tim Lead'
    }, 'secret')
    res.json({
        status: true,
        token
    })
})

app.listen(4444, (err) => {
    if (err) {
        return console.log(err)
    }

    console.log('Server started')
})
