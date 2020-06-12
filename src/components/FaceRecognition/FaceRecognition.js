import React from "react";
import './FaceRecognition.css';

const FaceRecognition = ({imageUrl, boxes}) => {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img id='input_image' src={imageUrl} alt={imageUrl} width='500' height='auto'/>
        {
          boxes.map(box => (
            <div
              key={box.id}
              className="bounding-box"
              style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}
            ></div>
          ))
        }
      </div>
    </div>
  )
}

export default FaceRecognition;
