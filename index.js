
import express from 'express' ;

import mongoose, { Mongoose } from 'mongoose';

/**
 * Create express application 
 */
const app = express();

/**
 * Registering default json handling for request bodies
 */
app.use(express.json());


const m = mongoose.connect('mongodb://localhost/questionaries');

const Questionary = mongoose.model('Questionary', {
    surname: String, 
    name: String, 
    patronymic: String,  
    birthday: String, 
    gender: String,
    passportSeries: String,
    passportNumber: String,
    passportIssuer: String,
    passportDate: String,
    ipn: String,
    isIpn: Boolean,
    regAddress: String,
    localAddress: String,
    isLiveRegAddress: Boolean
})


/**
 * Registering  get request for endpoint /hello
 */
app.get('/hello', 
/**
 * Express calls 
 * 
 * @param req Express request
 * @param res express response
 */
(req, res) => {
     res.json({message: `Hello ${req.query.name}`});
}

);




/**
 * Registering save functionality
 */
app.post('/save', 
    (req, res) => {

        console.log(`request body = ${JSON.stringify(req.body)}`);
        const q = new Questionary(req.body);
        console.log(`Storing questionary instance ${JSON.stringify(q)}`);
        q.save().then((data) =>  res.json(data));
    }
)



/**
 * Registering list functionality
 */
app.get('/', 

(req, res) => {
    Questionary.find({}, 'surname name').then(
        (data) => {
             res.json(data);
        }
    )
}
)


/**
 * Registering get functionality
 */


 app.get('/:id', 
 
 
 (req, res) => {
    Questionary.findOne({_id: req.params.id})
    .then(
        (data) => {
            res.json(data);
        }
    )
 })

app.listen((5000), () => {
    console.log(`Server started on 5000`);
});



