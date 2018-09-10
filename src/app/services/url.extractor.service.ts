import { Injectable } from '@angular/core';
import { } from 'rxjs/Obs';

@Injectable()
export class UrlExtractorService {
    youtubeUrl = 'https://www.youtube.com/embed/';
    googleDriveUrl = 'https://drive.google.com/file/d/';
    vimeoUrl = 'https://player.vimeo.com/video/';
    youTubeRegExp = /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    vimeoRegExp = /(http|https)?:\/\/(www\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|)(\d+)(?:|\/\?)/;
    constructor() {
    }

    public getEmbedUrl(url): string {
        let embedUrl = '';
        if (url.indexOf('youtu.be') !== -1 || url.indexOf('youtube.com') !== -1) {
            embedUrl = this.getYouTubeUrl(url);
        } else if (url.indexOf('vimeo.com') !== -1) {
            embedUrl = this.getVimeoUrl(url);
        } else if (url.indexOf('drive.google.com') !== -1) {
            embedUrl = this.getGoogleDriveUrl(url);
        }
        return embedUrl;
    }

    private getYouTubeUrl(url): string {
        let videoVal = url.match(this.youTubeRegExp);
        let video_id = (videoVal && videoVal.length > 1) ? videoVal[1] : '';
        if (!video_id) {
            return '';
        }
        let ampersandPosition = video_id.indexOf('&');
        if (ampersandPosition !== -1) {
            video_id = video_id.substring(0, ampersandPosition);
        }
        return video_id ? (this.youtubeUrl + video_id) : '';
    }

    public getThumbnailUrl(url): string {
        let embedUrl = '';
        if (url.indexOf('youtu.be') !== -1 || url.indexOf('youtube.com') !== -1) {
            embedUrl = this.getYouTubeThumbnail(url);
        } else if (url.indexOf('vimeo.com') !== -1) {
            embedUrl = this.getVimeoThumbnailUrl(url);
        } else if (url.indexOf('drive.google.com') !== -1) {
            embedUrl = this.getGoogleDriveUrl(url);
        }
        return embedUrl;
    }

    private getYouTubeThumbnail(url: string) {
        let videoVal = url.match(this.youTubeRegExp);
        let video_id = (videoVal && videoVal.length > 1) ? videoVal[1] : '';
        if (!video_id) {
            return '';
        }
        let ampersandPosition = video_id.indexOf('&');
        if (ampersandPosition !== -1) {
            video_id = video_id.substring(0, ampersandPosition);
        }
        return video_id ? ('https://img.youtube.com/vi/' + video_id + '/default.jpg') : '';
    }

    private getVimeoThumbnailUrl(url) {
        let match = url.match(this.vimeoRegExp);
        if (match && match.length > 4) {
            return 'https://i.vimeocdn.com/video/' + match[4] + '.jpg';
        } else {
            return '';
        }

    }

    private getVimeoUrl(url): string {
        let match = url.match(this.vimeoRegExp);
        if (match && match.length > 4) {
            return this.vimeoUrl + match[4];
        } else {
            return '';
        }
    }

    private getGoogleDriveUrl(url): string {
        let id = url.match(/[-\w]{25,}/);
        return id ? (this.googleDriveUrl + id[0] + '/preview') : '';
    }

}
