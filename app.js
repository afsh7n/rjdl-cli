#!/usr/bin/env node
const {Music,Video,Podcast} = require('./rjdl/rjdl');
const yargs = require('yargs');
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


yargs.command([{
    command: "music",
    aliases: ["m"],
    describe: "[Download Music From RadioJavan]",
    builder: {
        url: {
            alias: "u",
            describe: "Url Video RadioJavan",
            demandOption: true,
            type: "string",
        }
    },
    handler({ url }) {
        handleDownload(url,'mp3',Music)
    }
},
{
    command: "video",
    aliases: ["v"],
    describe: "[Download Video From RadioJavan]",
    builder: {
        url: {
            alias: "u",
            describe: "Url Video RadioJavan",
            demandOption: true,
            type: "string",
        },
        quality: {
            alias: "q",
            describe: "Quality Video",
            type: "string",
        }
    },
    handler({ url,quality }) {
        handleDownload(url,'video',Video,quality)
    }
},
{
    command: "podcast",
    aliases: ["p"],
    describe: "[Download Podcast From RadioJavan]",
    builder: {
        url: {
            alias: "u",
            describe: "Url Podcast RadioJavan",
            demandOption: true,
            type: "string",
        }
    },
    handler({ url }) {
        handleDownload(url,'podcast',Podcast)
    }
},
{
    command: "*",
    describe: [console.log(chalk.red( figlet.textSync('RadioJavan Downloader'))),console.log("Usage: rjdl <command>"),console.log("\nExample: rjdl video https://www.radiojavan.com/videos/video/dj-moeen-video-mix-1 hd"),console.log("\n--------------------------------------------------------------")],
    builder: {}
}
]);

yargs.parse();