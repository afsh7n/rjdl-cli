#!/usr/bin/env node
const {Music,Video,Podcast} = require('./rjdl/rjdl');
const chalk = require('chalk');
const figlet = require('figlet');
const handleMedia=(url)=>{
    return url.split('/')[4];
}
const handleFilename=(url)=>{
    return url.split('/')[5].split('?')[0];
}

const handleDownload=(url,type,fun,quality)=>{
    const media = handleMedia(url);
    const filename = handleFilename(url);
    if(media==type){
        fun(filename,quality)
    }else{
        console.log(chalk.red(`Please Enter Link ${type}`))
    }
}
const url = process.argv[2];

console.log(chalk.red( figlet.textSync('RadioJavan Downloader')))
console.log(url)
switch (handleMedia(url)) {
    case 'podcast':
        handleDownload(url,'podcast',Podcast)
        break;
    case 'mp3':
        handleDownload(url,'mp3',Music)
        break;
    case 'mp3':
        handleDownload(url,'video',Video,quality)
        break;
    default:
        console.log("\nExample: rjdl https://www.radiojavan.com/podcasts/podcast/Playout-13"),console.log("\n--------------------------------------------------------------")
        break;
}