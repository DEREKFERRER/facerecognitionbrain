import React from 'react';

class Signin extends React.Component {
    //routes
    constructor(props) {
        super(props);
        this.state = {
            signinEmail: '',
            signinPassword: ''
        }
    }
    onEmailChange = (event) => {
        this.setState({signinEmail: event.target.value})
    }
    onPasswordChange = (event) => {
        this.setState({signinPassword: event.target.value})
    }
    
    onSubmitSignin = () => {
        //fetch by default does a GET request, but what we want to do here is a POST
        fetch('https://mybackend-uuhs.onrender.com/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.signinEmail, 
                password: this.state.signinPassword
            })
        }) 
        .then(response => response.json())
        .then(user => {
            /* if(!data.error){
                console.log("Successful login")
            } */
          /*   if (data === 'success') {
                this.props.onRouteChange('home');
            } */
            //new
            if(user.id){// does the user exist? Did we receive a user with a property of id?
                this.props.loadUser(user);
                this.props.onRouteChange('home');
            }
        })
       
    }
    render() {
        //destructuring
        const { onRouteChange } = this.props; // para malinis. tanggalin nalang yung 'this.props' sa baba kapag gagawa kana ng project
        return (
            <article className="br3 ba  b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                    <main className="pa4 black-80">
                    <div className="measure ">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input 
                         className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                         type="email" 
                         name="email-address"  
                         id="email-address"
                         onChange={this.onEmailChange}
                         />
                        </div>
                        <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input 
                        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                        type="password" 
                        name="password"  
                        id="password"
                        onChange={this.onPasswordChange}
                        />
                        </div>
                    </fieldset>
                    <div className="">
                        <input onClick={this.onSubmitSignin} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in"/>
                    </div>
                    <div className="lh-copy mt3">
                        <p onClick={() => onRouteChange('register') } className="f6 link dim black db pointer">Register</p>
                    </div>
                    </div>
                </main>
              </article>
            );
    }
  
}

export default Signin;