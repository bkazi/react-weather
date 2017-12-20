const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const Fuse = require('fuse.js');

const PORT = 8080;
const CITY_FILE_NAME = path.join(__dirname, './city.list.json');

const cityList = JSON.parse(fs.readFileSync(CITY_FILE_NAME, 'utf8'));

const fuseOptions = {
    shouldSort: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 2,
    keys: [
        "name"
    ]
};
const fuse = new Fuse(cityList, fuseOptions);

function handler(req, res) {
    const parsedUrl = url.parse(req.url, true);
    const queryParams = parsedUrl.query;
    const searchString = queryParams.q;
    const limit = queryParams.lim || 20;
    const result = fuse.search(searchString);
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify(result.slice(0, limit)));
    res.end();
}

const server = http.createServer(handler);

server.listen(PORT, (err) => {
    if (err)
        console.error(err);
    else
        console.log('Server is running');
});
