import "./App.css";
import Webcam from "react-webcam";
import AppLogin from "./components/AppLogin";
import { useState, useRef } from "react";
import Background from "./media/login.png";

import * as posenet from "@tensorflow-models/posenet";
import { drawKeypoints, drawSkeleton } from "./utilities";

function App() {
  const [isUserAuthenticated, setUserAuthenticated] = useState(false);
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [toggleText, setToggleText] = useState("start");
  const [run, setRun] = useState(true);
  const [interval, testInterval] = useState();

  const styles = {
    backgroundImage: `url(${Background})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100vw",
    height: "100vh",
  };

  const runPosenet = async () => {
    // async means like ajax call
    // await maeas this will wait till the posenet.lode is finished

    //MobileNet (smaller, faster, less accurate)
    // const net = await posenet.load({
    //   architecture: "MobileNetV1",
    //   outputStride: 16,
    //   inputResolution: { width: 640, height: 480 },
    //   multiplier: 0.75,
    // });

    //ResNet (larger, slower, more accurate) **new!**
    const net = await posenet.load({
      architecture: "ResNet50",
      outputStride: 16, //32,
      inputResolution: { width: 500, height: 500 },
      quantBytes: 2,
      detectionType: "single",
    });

    testInterval(
      setInterval(() => {
        detect(net);
      }, 300)
    );
  };

  const detect = async (net) => {
    //Check webcam
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties from live webcam
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Make Detections
      const pose = await net.estimateSinglePose(video);
      console.log(pose);
      drawCanvas(pose, video, videoWidth, videoHeight, canvasRef);
    }
  };

  const drawCanvas = (pose, video, videoWidth, videoHeight, canvas) => {
    console.log("drawCanvas");
    //Creating a 2D Canvas
    const ctx = canvas.current.getContext("2d");
    canvas.current.width = videoWidth;
    canvas.current.height = videoHeight;

    //Passing into below pose[keypoints], threshold, canvas
    drawKeypoints(pose["keypoints"], 0.6, ctx);
    drawSkeleton(pose["keypoints"], 0.7, ctx);
  };

  function toggleHandler() {
    if (run) {
      runPosenet();
      setToggleText("stop");
    } else if (!run) {
      clearInterval(interval);
      testInterval(null);
      setToggleText("start");
    }
    setRun(!run);
  }

  if (isUserAuthenticated) {
    //runPosenet();
    return (
      <div className="homePageStyle">
        <Webcam
          ref={webcamRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 500,
            height: 500,
          }}
        />
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 500,
            height: 500,
          }}
        ></canvas>
        <div className="buttonContainer">
          <button onClick={toggleHandler}>{toggleText}</button>
        </div>
      </div>
    );
  } else {
    return (
      <div style={styles}>
        <AppLogin setUserAuthenticated={setUserAuthenticated}></AppLogin>
      </div>
    );
  }
}

export default App;
