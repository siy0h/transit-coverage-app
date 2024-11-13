const fs = require('fs');
fs.readFile('stops.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    const lines = data.split('\n');
    const headers = lines[0].split(',');
    const stopIDIndex = headers.indexOf('stop_id');
    const stopNameIndex = headers.indexOf('stop_name');
    const stopLatIndex = headers.indexOf('stop_lat');
    const stopLonIndex = headers.indexOf('stop_lon');

    const stops = [];

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line) { 
            const fields = line.split(',');
            const stopName = fields[stopNameIndex];
            const stopLat = fields[stopLatIndex];
            const stopLon = fields[stopLonIndex];
            const stopID = fields[stopIDIndex];

            if (stopName && stopLat && stopLon) {
                stops.push({
                    stop_id: parseFloat(stopID),
                    stop_name: stopName,
                    stop_lat: parseFloat(stopLat),
                    stop_lon: parseFloat(stopLon)
                });
            }
        }
    }

    const jsonContent = JSON.stringify(stops, null, 2);
    fs.writeFile('stops.json', jsonContent, 'utf8', (err) => {
    if (err) {
        console.error('Error writing to JSON file:', err);
    } else {
        console.log('Data successfully saved to stops.json');
    }
    });
});
