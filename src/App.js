import React, { useState, useEffect } from 'react';
import './App.css';
import Navigation from "./components/navigation/navigation";
import Logo from "./components/logo/logo";
import ImageLinkForm from "./components/imageLinkForm/image-link-form";
import Rank from "./components/rank/rank";
import Particles from 'react-particles-js';
import FaceRecognition from "./components/faceRecognition/faceRecognition";
import SignIn from "./components/signin/signin";
import Register from "./components/register/register";



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
  // "interactivity": {
  //   "events": {
  //     "onhover": {
  //       "enable": true,
  //       "mode": "repulse"
  //     }
  //   }
  // }
}

const App = () => {
  const [input, setInput] = useState('https://i2-prod.mirror.co.uk/incoming/article14334083.ece/ALTERNATES/s810/3_Beautiful-girl-with-a-gentle-smile.jpg');
  const [imageUrl, setImageUrl] = useState('empty');
  const [box, setBox] = useState({});
  const [route, setRoute] = useState('signin');
  const [isSignedIn, setIsSignedIn] = useState(false);


  const [user, setUser] = useState({
    id: '',
    FullName: "",
    email: "",
    entries: 0,
    joined: ''
  })

  const setStateToDefault = () => {
    setInput('https://i2-prod.mirror.co.uk/incoming/article14334083.ece/ALTERNATES/s810/3_Beautiful-girl-with-a-gentle-smile.jpg');
    setImageUrl('empty');
    setBox({});
    setRoute('signin');
    setIsSignedIn(false);
    setUser({
      id: '',
      FullName: "",
      email: "",
      entries: 0,
      joined: ''
    })
  }

  const loadUser = (data) => {
    const newUserInfoObj = {
      ...data,
      id: data.id,
      FullName: data.fullname,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }
    setUser(newUserInfoObj)
  }

  useEffect(() => {
    setImageUrl(input)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input])

  const onInputChange = (event) => {
    setBox({});
    setInput(event.target.value);

  };

  const onButtonSubmit = () => {
    setBox({});
    setImageUrl(input);
    fetch("https://quiet-dusk-55757.herokuapp.com/imageurl", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: input
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch("https://quiet-dusk-55757.herokuapp.com/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: user.id
            })
          }).then(response => response.json())
            .then(count => {
              setUser({
                //... can solve the problem of undefined changes
                ...user,
                entries: count
              })
            }).catch(console.log)
        }
        displayFaceBox(calculateFaceLocation(response));
      })
      .catch(err => console.log(err))
  }


  const onRouteChange = (route) => {
    if (route === 'signout') {
      setStateToDefault();
    } else if (route === 'home') {
      setIsSignedIn(true);
    }
    setRoute(route);
  }

  const calculateFaceLocation = (data) => {
    // console.log(data, "face Calculate");
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
    // console.log(box);
  }



  return (
    < div className="App" >
      <Particles className="particles"
        params={particlesOptions} />

      <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />
      {
        route === 'home'
          ? <div>
            <Logo />
            <Rank name={user.fullname} entries={user.entries} />
            <ImageLinkForm onInputChange={onInputChange}
              onButtonSubmit={onButtonSubmit}
            />
            <FaceRecognition box={box} imageUrl={imageUrl} />
          </div>
          : (
            route === 'signin'
              ? <SignIn loadUser={loadUser} onRouteChange={onRouteChange} />
              : <Register loadUser={loadUser} onRouteChange={onRouteChange} />
          )
      }
    </div >
  );
}

export default App;