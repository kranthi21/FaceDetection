import React,{ Component }  from "react";

class Register extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            name: '',
            password: ''
        }
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value});
    }

    onNameChange = (event) => {
        this.setState({name: event.target.value});
    }

    onPassChange = (event) => {
        this.setState({password: event.target.value});
    }

    onSubmitRegister = () => {
        const {email, name, password} = this.state;
        console.log('password',password);
        fetch('http://localhost:3000/register',{
            method:'post',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
                email: email,
                name: name,
                password: password
            })
        })
        .then(response => response.json())
        .then(user =>{
            if(user){
                this.props.loadUser(user);
                this.props.onRouteChange('Home');
            }
        })
        .catch(console.log)
    }

    render(){
        return (
            <article className="br3 ba b--black-30 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black">
                <div className="measure center">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f1 fw6 ph0 mh0">Register</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                        <input
                            onChange={this.onNameChange} 
                            className="pa2 ba b--black input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="text" 
                            name="name"  
                            id="name"/>
                    </div>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input 
                            onChange={this.onEmailChange}
                            className="pa2 ba b--black input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="email" 
                            name="email-address"  
                            id="email-address"/>
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input 
                            onChange={this.onPassChange}
                            className="b pa2 ba b--black input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="password" 
                            name="password"  
                            id="password"/>
                    </div>
                    
                    </fieldset>
                    <div className="">
                    <input 
                        onClick={this.onSubmitRegister}
                        className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Submit"/>
                    </div>
                    <div className="lh-copy mt3">
                    <p 
                        onClick={() => this.props.onRouteChange('SignIn')}
                        className="f6 link dim black db pointer">Sign In</p>
                    </div>
                </div>
                </main>
    
    
            </article>
        );
    }   
}

export default Register;