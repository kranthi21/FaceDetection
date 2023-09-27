import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceDetection from './components/FaceDetection/FaceDetection';
import SignIn from './components/SignIn/SignIn';
import Rank from './components/Rank/Rank';
import ParticlesBg from 'particles-bg';
import React,{ Component } from 'react';
import Register from './components/Register/Register';


const initalState = {
  input: "",
  box: {},
  route: 'SignIn',
  isSignedIn: false,
  user:{
        id : '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
  }
};

class App extends Component{
  constructor(){
    super();
    this.state =initalState;
    
  }

  loadUser = (user) => {
    this.setState({user:{
      id : user.id,
      name: user.name,
      email: user.email,
      entries: user.entries,
      joined: user.joined
    }});
    console.log('user loaded', user);
  } 

  // Testing the server connection
  // componentDidMount(){
  //   fetch('http://localhost:3000/')
  //   .then(response => response.json())
  //   .then(console.log)
  // }

  onInputChange = (event) => {
    console.log(event.target.value);
    this.setState({input: event.target.value});
  }

  locateFace = (data) =>{
    const face = data.outputs[0].data.regions[0].region_info.bounding_box;
   
    const img = document.getElementById("output_image");
    
    const w = Number(img.width);
    const h = Number(img.height);
    console.log(w,h);

    return {
      leftCol: (face.left_col + 0.5) * w,
      topRow: face.top_row * h,
      rightCol: (1.5 - face.right_col)*w, //w - face.right_col*w
      bottomRow: h - ((face.bottom_row)*h)
    }
  }

  displayFace = (box) => {
    this.setState({box: box});
  }

  onButtonSubmit = () => {
    console.log("button clicked");
    fetch('https://face-21-api.onrender.com/imageUrl',{
      method:'post',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response => response.json())
    .then(resp => {
      fetch('https://face-21-api.onrender.com/image',{
        method:'put',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({
          id: this.state.user.id
        })
      })
        .then(response => response.json())
        .then(count =>{
          this.setState(Object.assign(this.state.user, {entries:count}))
        })
      
      this.displayFace(this.locateFace(resp))
    }) // forwarding the data to locateface function then forwarding box to displaybox
    .catch(error => console.log('error', error));
  }

  onRouteChange = (rt) => {
    console.log(rt);
    rt === 'Home'? this.setState({isSignedIn: true}):this.setState(initalState);
    this.setState({route: rt});
  }

  render(){
    const {input, box, route, isSignedIn, user} = this.state;

    return (
      <div className="App">
        <ParticlesBg num={150} type="circle" bg={true} />
        <Navigation isSignedIn = {isSignedIn} onRouteChange={this.onRouteChange}/>
        {
           route === 'Home' ?
           <div>
            <Logo/>
            <Rank name= {user.name} entries = {user.entries}/>
            <ImageLinkForm 
              onInputChange = {this.onInputChange}
              onButtonSubmit = {this.onButtonSubmit}
            />
            <FaceDetection imgUrl = {input} box = {box}/>
           </div>
          :(
          route === 'SignIn'?
            <SignIn
              loadUser = {this.loadUser} 
              onRouteChange = {this.onRouteChange}/>
            :
            <Register 
              loadUser={this.loadUser} 
              onRouteChange={this.onRouteChange}/>
          )
        }
      </div>
    );
  }
}

export default App;
