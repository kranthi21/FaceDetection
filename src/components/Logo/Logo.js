// import { Tilt } from "react-parallax-tilt";
import { Tilt } from "react-tilt";
import './Logo.css';
import logo from './icons8-facial-detection-100 color.png'

const Logo = () =>{
    return(
        <div className="ma4 mt0">
            <Tilt className="Tilt br2 shadow-2" options={{max:25}} style={{ height: 100, width: 100 }}>
                <div className="Tilt-inner ">
                    <img  src={logo} alt="logo"/>
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;