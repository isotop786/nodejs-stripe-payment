const express = require('express')
const bodyParser = require('body-parser')
const stripe = require('stripe')('sk_test_51L04iFCqX00FzFwQTK7PrsxLqw1FObBUQlR6elY3arnIiimeMhfwihpLFDmh19cyllZfbLsJ2s2mHL5YNNywmHgz00vsHopuO6')
const cors = require('cors');

const app = express()
const PORT = process.env.PORT || 5999

app.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}))
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/create-payment-intent', async (req, res) => {
    var amount = req.body.amount
    console.log(amount);
    try {
        
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 200.00,
            currency:'usd'
        })
        res.json({clientSecret: paymentIntent.client_secret})
    }
    catch (err) {
        console.log(err);
    }
    
})



app.listen(PORT, () => {
    console.log(`App running in port ${PORT}...`);
})