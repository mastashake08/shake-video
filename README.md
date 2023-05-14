# Shake Video
This is a simple JavaScript package that provides a VideoEncoder and VideoDecoder class that use the HTML5 MediaRecorder and Blob APIs to encode and decode video data. You can use these classes to record video from a user's camera and then process the recorded video data in your application.

## Usage
### Installation
You can install the @mastashake08/shake-video package using npm:

```
npm install @mastashake08/shake-video
```
Using the VideoEncoder and VideoDecoder classes
Here's an example of how you might use the VideoEncoder and VideoDecoder classes:

```
import { VideoEncoder, VideoDecoder } from '@mastashake08/shake-video';

const mimeType = 'video/webm';
const videoWidth = 640;
const videoHeight = 480;
const encoder = new VideoEncoder(mimeType, videoWidth, videoHeight);
const decoder = new VideoDecoder(document.getElementById('video-element'));

encoder.onDataAvailable = (videoChunk) => {
  // Save the video chunk or do something with it
};

encoder.onStop = async (videoBlob) => {
  const videoBuffer = await decoder.decode(videoBlob);
  // Do something with the decoded video buffer
};

encoder.start();

// Wait some time, then stop the encoder
setTimeout(() => {
  encoder.stop();
}, 5000);
```
This code creates an instance of VideoEncoder and VideoDecoder. The VideoEncoder is started and runs for 5 seconds, recording video data and emitting onDataAvailable events for each chunk of encoded video data that it generates. When the VideoEncoder is stopped, it generates a Blob containing the entire recorded video and passes it to the onStop callback. The VideoDecoder is then used to decode the video Blob and generate a VideoBuffer. You can then use the VideoBuffer as needed, for example by rendering it in an HTML <video> element.

## API Reference
### VideoEncoder
#### constructor(mimeType, videoWidth, videoHeight)
Creates a new instance of the VideoEncoder class.

- mimeType: The MIME type to use for the encoded video data. For example, 'video/webm'.
- videoWidth: The width of the recorded video frames, in pixels.
- videoHeight: The height of the recorded video frames, in pixels.
- start(): Starts the video encoder. The encoder will begin recording video data and emitting onDataAvailable events for each chunk of encoded video data that it generates.

- stop(): Stops the video encoder. The encoder will generate a Blob containing the entire recorded video and pass it to the onStop callback.

- onDataAvailable(videoChunk)
A callback that will be called each time a new chunk of encoded video data is available. The videoChunk parameter will be a Blob containing the encoded video data.

- onStop(videoBlob)
A callback that will be called when the video encoder is stopped. The videoBlob parameter will be a Blob containing the entire recorded video.

### VideoDecoder
#### constructor(videoElement)
Creates a new instance of the VideoDecoder class.

- videoElement: The HTML <video> element that the decoded video data will be rendered to.
async decode(videoBlob)
Decodes a Blob containing encoded video data and returns a VideoBuffer.

- videoBlob: A Blob containing the encoded video
