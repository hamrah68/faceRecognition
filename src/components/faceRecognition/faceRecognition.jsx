import "./faceRecognition.css";
import React from "react";

const FaceRegognition = ({ imageUrl, box }) => {
  return (
    <div className="center ma ">
      <div className="absolute mt2 image-box">
        <img id="inputimage" width="700px" heigh="auto" alt="" src={imageUrl} />
        <div
          className="bounding-box"
          style={{
            top: box.topRow,
            right: box.rightCol,
            bottom: box.bottomRow,
            left: box.leftCol
          }}
        ></div>
      </div>
    </div>
  );
};

export default FaceRegognition;
