export class VideoDecoder {
  constructor(videoElement) {
    this.videoElement = videoElement;
    this.videoUrl = null;
    this.onLoadedMetadata = null;
    this.onEnded = null;
  }

  async decode(videoBlob) {
    if (this.videoUrl) {
      URL.revokeObjectURL(this.videoUrl);
    }
    this.videoUrl = URL.createObjectURL(videoBlob);

    return new Promise((resolve) => {
      this.videoElement.addEventListener('loadedmetadata', () => {
        if (this.onLoadedMetadata) {
          this.onLoadedMetadata();
        }
        resolve();
      });

      this.videoElement.addEventListener('ended', () => {
        if (this.onEnded) {
          this.onEnded();
        }
      });

      this.videoElement.src = this.videoUrl;
    });
  }
}
