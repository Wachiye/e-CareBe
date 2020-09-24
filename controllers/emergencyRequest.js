const nodeGeocoder = require('node-geocoder');
const geolib = require('geolib');
const db = require('../models/index');

exports.emergencyRequest = async (req, res) => {
    // Fetching coordinates for all health care providers from database
    const healthCareProviders = await db.HealthCareProvider.findAll({attributes: ['lat', 'long']});

    const options = {
        provider: 'mapquest',
        apiKey: 'LmkRMyPcsVGO3h431mpe5ijFXijDshVT'
    };
    const geocoder = nodeGeocoder(options);

    // Extracting coordinates of emergency location from address of request
    let emergencyLoc = await geocoder.geocode(req.body.address);

    // Fetching the coordinate nearest to the emergency request 
    let locationOfNearestProvider = geolib.findNearest({ latitude: emergencyLoc[0].latitude, longitude: emergencyLoc[0].longitude }, healthCareProviders);
    
    // Matching the nearest coordinate with the corresponding health care provider
    let nearestProvider = db.HealthCareProvider.findAll({
        attributes: ['name'], 
        where: {lat: locationOfNearestProvider.lat, long: locationOfNearestProvider.long }});

    res.json({
        nearestProvider: nearestProvider
    });
};