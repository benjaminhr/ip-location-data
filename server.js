const request = require('request-promise')
const colours = require('colors');
const listOfCountries = require('./names.json')

var ip = process.argv.slice(2);
var url = 'http://ipinfo.io/' + ip;

request(url)
    .then((response) => {
        var data = JSON.parse(response);
        var ip = data.ip;
        var city = data.city;
        var country = listOfCountries[data.country];

        console.log(`
        ----------------------------------
                IP: ${ip}
                City: ${city}
                Country: ${country}
        ----------------------------------
        `.green)
    })
    .catch(err => console.log(err))




