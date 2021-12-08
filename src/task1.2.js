import csv from 'csvtojson'
import { createReadStream, createWriteStream } from 'fs'

const csvFilePath='./resources/books.csv'
const jsonFilePath='./resources/books.json.txt'

const readStream = createReadStream(csvFilePath);
const writeStream = createWriteStream(jsonFilePath);

csv()
    .fromStream(readStream)
    .subscribe( json => {
        writeStream.write(JSON.stringify(json) + '\n', "utf8", error => {
            if (error) {
                console.error("Error occured on line " + json)
                console.error(error)
            }
        })
    }, error => {
        console.error("Error occured!!")
        console.error(error)
    }, () => {
        writeStream.end();
        console.log("conversion completed")
    })