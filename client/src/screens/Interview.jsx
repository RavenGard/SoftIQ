import React, { useRef, useState, useEffect } from "react";
import { ReactMediaRecorder } from "react-media-recorder";

// This component is responsible for showing a video preview of the stream
const VideoPreview = ({ stream }) => {
  const videoRef = useRef(null);

  // When the stream changes, we update the video element's srcObject
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  // If there's no stream, don't show the video element
  if (!stream) {
    return null;
  }

  return <video ref={videoRef} width={500} height={500} autoPlay controls />;
};

export const Interview = () => {
  const [recorded, setRecorded] = useState(false);

  const handleRecordingComplete = (blob) => {
    console.log("recording complete", blob);
    setRecorded(true);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <ReactMediaRecorder
        video
        onRecordingComplete={handleRecordingComplete}
        render={({
          previewStream,
          status,
          startRecording,
          stopRecording,
          mediaBlobUrl,
        }) => {
          return (
            <div className="max-w-md mx-auto my-8">
              {/* Show the recorded video if it exists, otherwise show an empty div 
              
              mediaBlobUrl is a property provided by the ReactMediaRecorder component. It 
              represents a URL that points to the recorded video data in the browser's memory. 
              This URL is generated when the recording is completed and can be used as the src 
              attribute for the video element to play back the recorded video.The code uses a 
              ternary operator (? :) to decide what to render based on whether mediaBlobUrl has a value or not:
              If mediaBlobUrl has a value (i.e., a video has been recorded), it creates a video element with 
              the mediaBlobUrl as the src. The controls, autoPlay, and loop attributes are added to the video 
              element for better user experience.If mediaBlobUrl is null or undefined (i.e., no video has been 
                recorded yet), it renders an empty div instead.This conditional rendering is done to 
                show the recorded video when it's available and hide it when it's not.*/}
              {mediaBlobUrl ? (
                <video
                  className="block mx-auto mb-4"
                  src={mediaBlobUrl}
                  controls
                  autoPlay
                  loop
                />
              ) : (
                <div />
              )}

              {/* Show the "Start Recording" button if not recording and no video recorded */}
              {status !== "recording" && recorded === false && (
                <button
                  className="block mx-auto mb-4 px-10 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-300"
                  onClick={startRecording}
                >
                  Start Recording
                </button>
              )}

              {/* Show the video preview */}
              <VideoPreview stream={previewStream} />

              {/* Show the "Stop Recording" button if currently recording */}
              {status === "recording" && (
                <div>
                  <button
                    className="block mx-auto mb-4 px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-300"
                    onClick={() => {
                      stopRecording();
                      setRecorded(true);
                    }}
                  >
                    Stop Recording
                  </button>
                </div>
              )}

              {/* Show the "Try Again" button if a video is recorded */}
              {recorded && (
                <button
                  className="block mx-auto mb-4 px-4 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-colors duration-300"
                  onClick={() => {
                    setRecorded(false);
                  }}
                >
                  Try Again
                </button>
              )}
            </div>
          );
        }}
      />
    </div>
  );
};
