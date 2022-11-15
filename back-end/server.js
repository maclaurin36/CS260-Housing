const express = require('express');
const bodyParser = require("body-parser");
const mongo = require('mongodb');
var objectId = require('mongodb').ObjectId;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/homes', {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

const listingSchema = new mongoose.Schema({
    availabilityDate: Date,
    location: String,
    housingType: String,
    price: Number,
    numBedrooms: Number,
    numBathrooms: Number,
    hasParking: Boolean,
    photo: String,
    renterId: String
});

const renterProfileSchema = new mongoose.Schema({
    name: String,
    age: Number,
    isMarried: Boolean,
    lowerPriceRange: Number,
    upperPriceRange: Number,
    desiredMoveInDate: Date,
    photo: String,
    listingClaimedId: String
})

// create a virtual paramter that turns the default _id field into id
listingSchema.virtual('id')
    .get(function() {
        return this._id.toHexString();
    });

renterProfileSchema.virtual('id')
    .get(function() {
        return this._id.toHexString();
    });

// Ensure virtual fields are serialised when we turn this into a JSON object
listingSchema.set('toJSON', {
    virtuals: true
});

renterProfileSchema.set('toJSON', {
    virtuals: true
});

// Get a reference to the collections
const Listing = mongoose.model('Listing', listingSchema);
const Renter = mongoose.model('Renter', renterProfileSchema);

app.get('/api/listings', async (req, res) => {
    try {
        let listings = await Listing.find();
        res.send({
            listings: listings
        });
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.get('/api/renters', async (req, res) => {
    try {
        let renters = await Renter.find();
        res.send({
            renters: renters
        });
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.post('/api/listings', async (req, res) => {
    console.log('hello');
    const listing = new Listing({
        availabilityDate: req.body.availabilityDate,
        location: req.body.location,
        housingType: req.body.housingType,
        price: req.body.price,
        numBedrooms: req.body.numBedrooms,
        numBathrooms: req.body.numBathrooms,
        hasParking: req.body.hasParking,
        photo: req.body.photo,
        renterId: req.body.renterId
    });

    try {
        await listing.save();
        res.send({
            listing: listing
        });
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.post('/api/renters', async (req, res) => {
    const renter = new Renter({
        name: req.body.name,
        age: req.body.age,
        isMarried: req.body.isMarried,
        lowerPriceRange: req.body.lowerPriceRange,
        upperPriceRange: req.body.upperPriceRange,
        desiredMoveInDate: req.body.desiredMoveInDate,
        photo: req.body.photo,
        listingClaimedId: req.body.listingId
    });

    try {
        await renter.save();
        res.send({
            renter: renter
        });
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.delete('/api/listings/:id', async (req, res) => {
    try {
        await Listing.deleteOne({
            _id: req.params.id
        });
        res.sendStatus(200);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.delete('/api/renters/:id', async (req, res) => {
    try {
        await Renter.deleteOne({
            _id: req.params.id
        });
        res.sendStatus(200);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.put('/api/listings/:id', async (req, res) => {
    let id = req.params.id;
    Listing.findById(objectId(id))
        .then(async (document) => {
            console.log(document);
            document.availabilityDate = req.body.availabilityDate;
            document.location = req.body.location;
            document.housingType = req.body.housingType;
            document.price = req.body.price;
            document.numBedrooms = req.body.numBedrooms;
            document.numBathrooms = req.body.numBathrooms;
            document.hasParking = req.body.hasParking;
            document.photo = req.body.photo;
            document.renterId = req.body.renterId;
            await document.save();
            res.send({
                listing: document
            });
        })
        .catch((err) => {
            console.log(err);
        });
});

app.put('/api/renters/:id', async (req, res) => {
    let id = req.params.id;
    Renter.findById(objectId(id))
        .then(async (document) => {
            console.log(document);
            document.name = req.body.name;
            document.age = req.body.age;
            document.isMarried = req.body.isMarried;
            document.lowerPriceRange = req.body.lowerPriceRange;
            document.upperPriceRange = req.body.upperPriceRange;
            document.desiredMoveInDate = req.body.desiredMoveInDate;
            document.photo = req.body.photo;
            document.listingClaimedId = req.body.listingId;
            res.send({
                renter: document
            });
        })
        .catch((err) => {
            console.log(err);
        });
});

app.listen(3001, () => console.log('Server listening on port 3001!'));
