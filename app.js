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
    res.write(`Operating System: ${os.type()} ${os.release()}\n`);

    // exec('openssl version', (err, stdout, stderr) => {
    //     if (err) {
    //         res.write(`Error getting OpenSSL version: ${err.message}\n`);
    //         res.end();
    //         return;
    //     }

    //     res.write(`OpenSSL Version: ${stdout.trim()}\n`);
    //     res.end();
    // });

    exec('lsb_release -a', (err, stdout, stderr) => {
        if (err) {
            console.error(`Error getting Ubuntu version: ${err}`);
            return;
        }

        const lines = stdout.split('\n');
        const descriptionLine = lines.find(line => line.startsWith('Description:'));
        const versionLine = lines.find(line => line.startsWith('Release:'));

        if (descriptionLine && versionLine) {
            const description = descriptionLine.split(':')[1].trim();
            const version = versionLine.split(':')[1].trim();

            console.log(`Ubuntu Version: ${description} ${version}`);
        } else {
            console.error('Unable to determine Ubuntu version');
        }
    });
});

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
