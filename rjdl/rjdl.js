const {download} = require('./download');
const chalk = require('chalk');
const BaseUrl = "https://host2.rj-mw1.com/media";


const CheckLink = (url)=>{
    if(url.split('/')[2]==!"ww.radiojavan.com"){
        console.log(chalk.red("Please Checking Link,is Link Not RadioJavan"))
        return false;
    }else{
        return true;
    }
}

const Music = (filename,quality)=>{
        const file = `${filename}.mp3`
        download(`${BaseUrl}/mp3/mp3-256/${file}`, file, () => {});
    
}

const Podcast = (filename,quality)=>{
    const file = `${filename}.mp3`
    download(`${BaseUrl}/podcast/mp3-192/${file}`, file, () => {});
}
const Video = (filename,quality)=>{
    let qualityVideo ;
    switch (quality) {
        case 'lq':
            qualityVideo = 'lq';
            break;
        case 'hd':
            qualityVideo = 'hd';
            break;    
    
        default:
            qualityVideo = 'hd';
            break;
    }
    const file = `${filename}.mp4`
    download(`${BaseUrl}/music_video/${qualityVideo}/${file}`, file, () => {});
}
module.exports.Music = Music;
module.exports.Video = Video;
module.exports.Podcast = Podcast;