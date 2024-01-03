/** Command-line tool to generate Markov text. */
const fs = require('fs')
const process = require('process');
const markov = require('./markov');
const axios = require('axios');

// make markov machine to generate text from
function generateText(text){
    let mm = new markov.MarkovMachine(text);
    console.log(mm.makeText());
}

// read file and generate text from it
function makeTextFile(path){
    fs.readFile(path, 'utf8', (err, data) => {
        if(err){
            console.log(`Error reading ${path}: ${err}`);
            process.exit(1);
        }
        else{
            generateText(data);
        }
    });
}

// read URL and make text from it

async function makeTextUrl(url){
    try{
        let resp = await axios.get(url);
        generateText(resp.data);
    }
    catch(err){
        console.log(`Error fetching ${url}: ${err}`);
        process.exit(1);
    }
}

let method = process.argv[2];
let path = process.argv[3];

if (method === "file") {
    makeTextFile(path);
}
else if (method === "url"){
    makeTextUrl(path);
}
else{
    console.log(`Unknown method" ${method}`);
    process.exit(1);
}