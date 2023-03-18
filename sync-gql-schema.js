const token = process.argv[2];
if (!token) {
    console.error('Missing auth token argument');
    process.exit(1);
}

const https = require('follow-redirects').https;
const fs = require('fs');

const options = {
    method: 'GET',
    hostname: 'localhost:4000',
    path: '/api/graphql?sdl',
    headers: {
        Authorization: `Bearer ${token}`,
    },
};

const req = https.request(options, function (res) {
    const chunks = [];

    res.on('data', function (chunk) {
        chunks.push(chunk);
    });

    res.on('end', function (chunk) {
        const body = Buffer.concat(chunks);
        const content = body.toString();
        fs.writeFile('./schema.graphql', content, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            // file written successfully
        });
        console.log('✅ Graphql Schema Synced');
    });

    res.on('error', function (error) {
        console.error(error);
        process.exit(1);
    });
});

req.end();
