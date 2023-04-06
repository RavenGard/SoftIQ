import React from "react";
import {
  ReactMediaRecorder,
  useReactMediaRecorder,
} from "react-media-recorder";
import { Link } from "react-router-dom";

export const Interview = () => {
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ video: true });

  const handleRecordingComplete = (blob) => {
    console.log("recording complete", blob);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {status === "idle" && (
        <button
          className="py-4 px-8 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-300"
          onClick={startRecording}
        >
          Start Interview
        </button>
      )}
      {status === "recording" && (
        <div className="w-full h-full">
          <video
            className="w-full h-full object-contain"
            src={mediaBlobUrl}
            controls
          />
        </div>
      )}
      {status === "recording" && (
        <button
          className="py-4 px-8 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-300"
          onClick={stopRecording}
        >
          Stop Interview
        </button>
      )}
      <ReactMediaRecorder
        video
        onRecordingComplete={handleRecordingComplete}
        render={({ status, startRecording, stopRecording }) => <div></div>}
      />
      <Link to="/" className="mt-8 underline">
        Back to Dashboard
      </Link>
    </div>
  );
};
