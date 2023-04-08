// https://stackblitz.com/edit/react-xjurfc?file=src%2FApp.js

import React, { useRef, useState, useEffect } from "react";
import { ReactMediaRecorder } from "react-media-recorder";

const VideoPreview = ({ stream }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  if (!stream) {
    return null;
  }

  return <video ref={videoRef} width={500} height={500} autoPlay controls />;
};

export const Interview = () => {
  const [enable, setEnable] = useState(true);
  const [recorded, setRecorded] = useState(false);

  const handleRecordingComplete = (blob) => {
    console.log("recording complete", blob);
    setRecorded(true);
  };

  const handleEraseVideo = () => {
    setRecorded(false);
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
                // <div className="block mb-4 w-full h-full bg-gray-200" />
              )}

              {status !== "recording" && recorded === false && (
                <button
                  className="block mx-auto mb-4 px-10 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-300"
                  onClick={startRecording}
                >
                  Start Recording
                </button>
              )}

              {enable && <VideoPreview stream={previewStream} />}

              {status === "recording" && (
                <div>
                  <button
                    className="block mx-auto mb-4 px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-300"
                    onClick={stopRecording}
                  >
                    Stop Recording
                    {setRecorded(true)}
                  </button>
                </div>
              )}

              {recorded && (
                <button 
                className="block mx-auto mb-4 px-4 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-colors duration-300"
                onClick={startRecording}>
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
