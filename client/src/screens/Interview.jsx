//https://stackblitz.com/edit/react-xjurfc?file=src%2FApp.js
import React, { useRef, useState, useEffect } from "react";
import { ReactMediaRecorder } from "react-media-recorder";
import { Link } from "react-router-dom";

// The VideoPreview component is responsible for displaying a video preview of the given stream
const VideoPreview = ({ stream }) => {
  // videoRef is a reference to the video DOM element
  const videoRef = useRef(null);
  //updates the video element's srcObject property
  // when the stream changes. It accepts a callback function that runs when the component mounts or when the
  // specified dependencies (in this case, the stream) change

  useEffect(() => {
    // If there is a video DOM element (videoRef.current) and a stream, update the video element's srcObject property
    // with the stream. This ensures that the video preview displays the correct stream.
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);
  // If there's no stream, the VideoPreview component returns null, which means nothing will be rendered
  if (!stream) {
    return null;
  }

  // If there is a stream, render a video element with the provided reference (videoRef), width, height, autoPlay, and
  // controls properties. The autoPlay property ensures that the video preview starts playing automatically, and the
  // controls property adds playback controls to the video element.
  return <video ref={videoRef} width={500} height={500} autoPlay controls />;
};

// protype const question
const Question = ({ question }) => {
  return <h1 className="text-2xl font-bold mb-4">{question}</h1>;
};

export const Interview = () => {
  // recorded is a state variable that indicates whether a video has been recorded or not. setRecorded is a function
  // to update the recorded state.
  const [recorded, setRecorded] = useState(false);
  const [mediaUrl, setMediaUrl] = useState(null);
  const [question, setQuestion] = useState({});

  useEffect(() => {
    let requestBody = {
      query: `
        query {
          getQuestions {
            _id
            questionDescription
          }
        }
      `,
    };

    fetch("http://localhost:3000/softiq", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then((resData) => {
        const length = resData.data.getQuestions.length;
        console.log("This is the length: " + length);
        const randomQuestion = resData.data.getQuestions[Math.floor(Math.random() * length)];
        console.log("This is the random question: " + randomQuestion.questionDescription);

        /* 
         this code is redundant; randomQuestion is the object that can be used to access questionDescription ->
         const questionInfo = {
           questionId: randomQuestion._id,
           questionDescription: randomQuestion.questionDescription
         };
         */
        
        setQuestion(randomQuestion);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleRecordingComplete = (blob) => {
    console.log("recording complete", blob);
    setRecorded(true);
    const myURL = new URL("http://localhost:5173/interview");
    setMediaUrl(myURL.createObjectURL(blob));
  };

  // The Interview component returns a container div with the ReactMediaRecorder component inside it.
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      {/* protype question */}
      <Question question={question.questionDescription} />

      <ReactMediaRecorder
        // The video prop indicates that the recording will be a video.
        video
        // onRecordingComplete is a callback function that is called when the recording is completed.
        onRecordingComplete={handleRecordingComplete}
        // The render prop is a function that returns the UI elements (buttons and video previews) based on the
        // recording status and the recorded video URL (mediaBlobUrl). This function receives an object containing
        // the following properties: previewStream, status, startRecording, stopRecording, and mediaBlobUrl.
        render={({
          previewStream,
          status,
          startRecording,
          stopRecording,
          mediaBlobUrl,
        }) => {
          return (
            <div className="max-w-md mx-auto my-8">
              {/* /* Show the recorded video if it exists, otherwise show an empty div 
              
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
              {recorded ? (
                <video
                  className="block mx-auto mb-4"
                  src={mediaBlobUrl}
                  controls
                  autoPlay
                  loop
                />
              ) : (
                <VideoPreview stream={previewStream} />
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

              {/* Show the "Stop Recording" button if currently recording */}
              {status === "recording" && (
                <div>
                  <button
                    className="block mx-auto mb-4 px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-300"
                    onClick={() => {
                      stopRecording();
                      setRecorded(true);
                      handleRecordingComplete();
                    }}
                  >
                    Stop Recording
                  </button>
                </div>
              )}

              {/* Show the "Try Again" and "Continue" buttons if a video is recorded */}
              {recorded && (
                <>
                  <div className="flex justify-center space-x-4 mt-4">
                    {/* "Try Again" button */}
                    <button
                      className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
                      onClick={() => {
                        setRecorded(false);
                        setMediaUrl(null);
                      }}
                    >
                      Try Again
                    </button>

                    {/* "Continue" button */}
                    <button>
                      <Link
                        to="/feedback"
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-300"
                      >
                        Continue
                      </Link>
                    </button>
                  </div>
                </>
              )}

              {/*Show the "Continue" button if a video is recorded*/}
            </div>
          );
        }}
      />
    </div>
  );
};
