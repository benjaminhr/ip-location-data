const request = require('request-promise')
const colours = require('colors');
const listOfCountries = require('./names.json');
const locations = require('weather-js');
const blessed = require('blessed');
const contrib = require('blessed-contrib');

    var screen = blessed.screen();

    var ip = process.argv.slice(2);
    var url = 'http://ipinfo.io/' + ip;

    request(url)
        .then((response) => {
            var data = JSON.parse(response);
            var ip = data.ip;
            var city = data.city;
            var country = listOfCountries[data.country];

            locations.find({search: `${city}`, degreeType:'C'}, (err, result) => {
                if (err) throw err;
                var lat = result[0].location.lat;
                var long = result[0].location.long;

                var map = contrib.map({ label: `IP Location is ${city}` })
                screen.append(map);
                map.addMarker({ 
                    "lon": long, 
                    "lat": lat, 
                    color: "red", 
                    char: "X" 
                })

                screen.key(['escape', 'q', 'C-c'], function (ch, key) {
                    return process.exit(0);
                });

                screen.render()
            })
        })
        .catch(err => console.log(err))

