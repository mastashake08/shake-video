export class VideoEncoder {
  constructor(mimeType, videoWidth, videoHeight) {
    this.mimeType = mimeType;
    this.videoWidth = videoWidth;
    this.videoHeight = videoHeight;
    this.mediaRecorder = null;
    this.videoChunks = [];
    this.onDataAvailable = null;
    this.onStop = null;
  }

  start() {
    const stream = navigator.mediaDevices.getUserMedia({
      video: { width: this.videoWidth, height: this.videoHeight },
    });
    this.mediaRecorder = new MediaRecorder(stream, { mimeType: this.mimeType });

    this.mediaRecorder.ondataavailable = (event) => {
      if (event.data && event.data.size > 0) {
        this.videoChunks.push(event.data);
        if (this.onDataAvailable) {
          this.onDataAvailable(event.data);
        }
      }
    };

    this.mediaRecorder.onstop = () => {
      if (this.onStop) {
        const videoBlob = new Blob(this.videoChunks, { type: this.mimeType });
        this.onStop(videoBlob);
      }
    };

    this.mediaRecorder.start();
  }

  stop() {
    if (this.mediaRecorder) {
      this.mediaRecorder.stop();
    }
  }
}
