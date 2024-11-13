const fs = require('fs');
const csv = require('csv-parser');

const results = [];
const ottawaPrefixes = new Set([
    "K2W", "K2K", "K2T", "K2L", "K2M", "K2V", "K2S", "K2R", "K2J", "K2H", "K2G",
    "K2B", "K4M", "K4P", "K1X", "K1G", "K1T", "K1V", "K2E", "K2C", "K2A", "K1Z",
    "K1Y", "K1H", "K1S", "K1R", "K2P", "K1P", "K1A", "K1N", "K1L", "K1M", "K1K",
    "K1J", "K1B", "K1C", "K1W", "K4B", "K4A", "K1E"
]);

fs.createReadStream('CanadianPostalCodes202403.csv') 
    .pipe(csv())
    .on('data', (row) => {
        const postalCodePrefix = row.POSTAL_CODE.slice(0, 3);
        if (ottawaPrefixes.has(postalCodePrefix)) {
            results.push({
                postal_code: row.POSTAL_CODE,
                latitude: parseFloat(row.LATITUDE),
                longitude: parseFloat(row.LONGITUDE)
            });
        }
    })
    .on('end', () => {
        console.log("Filtered Ottawa area postal codes with coordinates:", results);
    }
);