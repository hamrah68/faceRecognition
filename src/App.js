import React, { useState, useEffect } from 'react';
import './App.css';
import Navigation from "./components/navigation/navigation";
import Logo from "./components/logo/logo";
import ImageLinkForm from "./components/imageLinkForm/image-link-form";
import Rank from "./components/rank/rank";
import Particles from 'react-particles-js';
import Clarifai from "clarifai";
import FaceRecognition from "./components/faceRecognition/faceRecognition";
import SignIn from "./components/signin/signin";
import Register from "./components/register/register";

const app = new Clarifai.App({
  apiKey: 'c310fe9d0fc34cf68d49639d6bcc0fcf'
});

const particlesOptions = {

  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800
      }
    }
  },
  "interactivity": {
    "events": {
      "onhover": {
        "enable": true,
        "mode": "repulse"
      }
    }
  }
}

const App = () => {
  const [input, setInput] = useState('https://i2-prod.mirror.co.uk/incoming/article14334083.ece/ALTERNATES/s810/3_Beautiful-girl-with-a-gentle-smile.jpg');
  const [imageUrl, setImageUrl] = useState('empty');
  const [box, setBox] = useState({});
  const [rout, setRout] = useState('signin');
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    setImageUrl(input)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input])

  const onInputChange = (event) => {
    setInput(event.target.value);

  };

  const onButtonSubmit = () => {
    setImageUrl(input);
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL
      , input).then(response => displayFaceBox(calculateFaceLocation(response))
        .catch(err => console.log(err))
      );
  }
  const onRouteChange = (route) => {
    if (route === 'signout') {
      setIsSignedIn(false);
    } else if (route === 'home') {
      setIsSignedIn(true);
    }
    setRout(route);
  }

  const calculateFaceLocation = (data) => {
    console.log(data, "face Calculate");
    const faceRecognitionData = data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: faceRecognitionData.left_col * width,
      topRow: faceRecognitionData.top_row * height,
      rightCol: width - (faceRecognitionData.right_col * width),
      bottomRow: height - (faceRecognitionData.bottom_row * height)
    }
  }

  const displayFaceBox = (box) => {
    setBox(box)
    console.log(box);
  }


  return (
    < div className="App" >
      <Particles className="particles"
        params={particlesOptions} />
      <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />
      {
        rout === 'home'
          ? <div>
            <Logo />
            <Rank />
            <ImageLinkForm onInputChange={onInputChange}
              onButtonSubmit={onButtonSubmit}
            />
            <FaceRecognition box={box} imageUrl={imageUrl} />
          </div>
          : (
            rout === 'signin'
              ? <div>  <SignIn onRouteChange={onRouteChange} /> </div>
              : <Register onRouteChange={onRouteChange} />
          )





      }
    </div >
  );
}

export default App;