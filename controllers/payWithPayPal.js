const db = require('../models/index');
const paypal = require('paypal-rest-sdk');

const Patient = db.Patient;

const ErrorResponse = require('../utils/errorResponse');

//get client id and secret

const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID,
    PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET,
    PAYPAL_MODE = process.env.PAYPAL_MODE;

//configure paypal
paypal.configure({
    'mode': PAYPAL_MODE, //sandbox or live if on production environment
    'client_id': PAYPAL_CLIENT_ID,
    'client_secret': PAYPAL_CLIENT_SECRET
});

exports.requestPayment = (req, res) =>{
    //payment request body
    var paymentRequest = JSON.stringify({
        "intent":"sale",
        "redirect_urls":{
            "return_url": req.body.return_url, //the url to redirect to on successful request
            "cancel_url": req.body.cancel_url //the url to redirect to on request failure
        },
        "payer":{
            "payment_method": "paypal"
        },
        "transactions":[{
            "item_list":{
                "items":req.body.items || []
            },
            "amount": {
                "total": req.body.amount, //amount to be deducted,
                "currency": req.body.currency_type || 'USD'
            },
            "description": req.body.description //reason for deduction of the amount
        }]
    });
    paypal.payment.create(paymentRequest, (err, payment) =>{
        if(err){
            let ERR = new ErrorResponse("Error creating paypal payment request. Error:"+err.message, 500);
            res.send(ERR);
        } else {
            //capture HATEOAS links
            var links = [];
            payment.links.forEach( (linkObj) =>{
                links[linkObj.rel] = {
                    "href":linkObj.href,
                    "method":linkObj.method
                };
            })
            //redirect user
            if(links.hasOwnProperty('approval_url')){
                res.redirect(links['approval_url'].href);
            } else {
                let ERR = new ErrorResponse("No redirect url found", 500);
                res.send(ERR);
            }
        }

    });
}

//processing the payment
exports.processPayment = (req, res) =>{
    var paymentId = req.query.paymentId;
    var payerId = {
        "payer_id": req.query.payerId
    }
    paypal.payment.execute( paymentId, payerId, (err, payment) =>{
        if(err){
            let ERR = new ErrorResponse("Error processing paypal payment request. Error:"+err.message, 500);
            res.send(ERR);
        } else {
            if(payment.state == 'approved'){
                res.send({
                    "success": true,
                    "message": "Paypal payment was successful",
                    "payment": payment
                });
            } else {
                res.send({
                    "success": false,
                    "message": "Paypal payment failed.Error: " + err.message
                });
            }
        }
    })
}

//cancelling the payment
exports.cancelPayment = (req, res) =>{
    res.send("Paypal payment request cancelled");
}
