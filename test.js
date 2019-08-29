const clear = require("clear");
const chalk = require("chalk");
const axios = require("axios");
const prompt = require("prompt");
const country = require("country-list");
const uri = "https://date.nager.at/api/v2/publicholidays/";

var holiday = () => {
    prompt.start();
    prompt.get(['Country', 'Year'], async function (err, result) {
        var countryQuery = result.Country;
        var dateQuery = result.Year;
        var countryCode = country.getCode(countryQuery);

        console.log(chalk.green(`Country : ${countryQuery} , Country Code : ${countryCode}, Year : ${dateQuery}.`));

        try {

            const response = await axios.get(`${uri}${dateQuery}/${countryCode}`);
            var holidays = Array.from(response.data);

            holidays.forEach(el => {
                console.log(chalk.blue(`Date : ${el.date}, Holiday : ${el.name}.`));
            });

        }
        catch (err) {
            console.log(chalk.bgRed("Sorry, the country you're looking for does not exist. Please try again : "));
            holiday();
        }
    });
};

clear();
holiday();