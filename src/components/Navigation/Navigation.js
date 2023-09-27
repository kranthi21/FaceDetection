const Navigation = ({isSignedIn, onRouteChange}) => {
    return (
            isSignedIn ? 
                <nav style= {{display: 'flex', justifyContent:'flex-end'}}>
                <p 
                    onClick={()=>onRouteChange('SignIn')} // inorder to avoid function call us arrow function
                    className="f3 link dim black underline pa3 pointer">Sign out
                </p>
                </nav>
                :
                <nav style= {{display: 'flex', justifyContent:'flex-end'}}>
                    <p 
                        onClick={()=>onRouteChange('Register')} // inorder to avoid function call us arrow function
                        className="f3 link dim black underline pa3 pointer">Register
                    </p>
                    <p 
                        onClick={()=>onRouteChange('SignIn')} // inorder to avoid function call us arrow function
                        className="f3 link dim black underline pa3 pointer">Sign In
                    </p>

                </nav>
    );
}

export default Navigation;