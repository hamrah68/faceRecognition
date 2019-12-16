import "./image-link-form.css";
import React from "react";

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div>
      <p className="f3 white">
        {"این برنامه می تواند صورت ها را در عکس تشخیص دهد"}
      </p>
      <div className="center">
        <div className="form-face-detect center pa4 br3 shadow-5 ">
          <input
            required
            onChange={onInputChange}
            className="f4 pa2 w-70 center"
            type="text"
          />
          <button
            onClick={onButtonSubmit}
            className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
          >
            تشخیص چهره
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
