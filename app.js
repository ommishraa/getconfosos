const http = require('http');
const os = require('os');
const { exec } = require('child_process');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('Server Configuration:\n');
    res.write(`Node.js Version: ${process.version}\n`);
    res.write(`Platform: ${process.platform}\n`);
    res.write(`Architecture: ${process.arch}\n`);
    res.write(`Server Address: ${server.address().address}\n`);
    res.write(`Server Port: ${server.address().port}\n`);

    exec('openssl version', (err, stdout, stderr) => {
        if (err) {
            res.write(`Error getting OpenSSL version: ${err.message}\n`);
            res.end();
            return;
        }

        res.write(`OpenSSL Version: ${stdout.trim()}\n`);
        res.end();
    });
});

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
