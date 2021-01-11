const chalk = require('chalk');
const request = require('request'), 
    fs = require('fs'), 
    _cliProgress = require('cli-progress');
     os = require('os');
     path = require('path');


const download = (url, filename, callback) => {

    const downloadDIR = path.join(os.homedir(), "Downloads",'RadioJavan');
    const filenamePath = path.join(downloadDIR,filename);

    //Check Exist Folder 
    if (fs.existsSync(downloadDIR)) {
    } else {
        fs.mkdirSync(downloadDIR, 0744);
    }

    if (fs.existsSync(filenamePath)) {
        console.log(chalk.green(`File Exist in Downloads/RadioJavan`))
    } else {
        const progressBar = new _cliProgress.SingleBar({
            format: `${filename} {bar} {percentage}% || ETA: {eta}s`,
            barCompleteChar: '\u2588',
            barIncompleteChar: '\u2591',
            hideCursor: true
        }, _cliProgress.Presets.shades_classic);
        
        const file = fs.createWriteStream(filenamePath);
        let receivedBytes = 0
    
        request.get(url)
        .on('response', (response) => {
            if (response.statusCode !== 200) {
                return callback('Response status was ' + response.statusCode);
            }
    
            const totalBytes = response.headers['content-length'];
            progressBar.start(totalBytes, 0);
        })
        .on('data', (chunk) => {
            receivedBytes += chunk.length;
            progressBar.update(receivedBytes);
        })
        .pipe(file)
        .on('error', (err) => {
            fs.unlink(filename);
            progressBar.stop();
            return callback(err.message);
        });
    
        file.on('finish', () => {
            progressBar.stop();
            file.close(callback);
            console.log(chalk.green(`Downloaded ${filename} SaveAs Floder Downloads/RadioJavan`))
        });
    
        file.on('error', (err) => {
            fs.unlink(filename); 
            progressBar.stop();
            return callback(err.message);
        });
    }
    }
module.exports.download = download;