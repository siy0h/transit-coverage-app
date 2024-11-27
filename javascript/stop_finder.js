import { createReadStream } from 'fs';
import csvParser from 'csv-parser';  
import * as d3 from 'd3';            


async function processCSV(filePath) {
    return new Promise((resolve, reject) => {
        const stopsAndCoords = [];
        createReadStream(filePath)
            .pipe(csvParser())
            .on('data', (row) => {
                stopsAndCoords.push(row);
            })
            .on('end', () => {
                console.log('CSV file successfully processed');
                resolve(stopsAndCoords);
            })
            .on('error', (error) => {
                reject(error);
            });
    });
}
  
const stopsAndCoords = await processCSV('stops.csv');
console.log(stopsAndCoords.at(3)); 