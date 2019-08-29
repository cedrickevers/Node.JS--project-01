#!/usr/bin/env node

const clear = require("clear");
const chalk = require("chalk");
const axios = require("axios");
const prompt = require("prompt");
const country = require("country-list");
const uri = "https://date.nager.at/api/v2/publicholidays/";

//msg
const countryErr = "Sorry this country is in another castle"

let holiday = async function () {
    let countryQuery = process.argv[2]
    let dateQuery = new Date().getFullYear();
    let countryCode = country.getCode(countryQuery);

    console.log(chalk.green(`Country : ${countryQuery} , Country Code : ${countryCode}, Year : ${dateQuery}.`));

    try {
        const response = await axios.get(`${uri}${dateQuery}/${countryCode}`);
        let holidays = Array.from(response.data);

        holidays.forEach(el => {
            console.log(chalk.blue(`Date : ${el.date}, Holiday : ${el.name}.`));
        })
    }
    catch (err) {
        console.log(chalk.bgRed(countryErr));
        process.exit();
    }
}

clear();
holiday();