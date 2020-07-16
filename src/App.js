import React from 'react';
import './App.css';
const axios = require('axios');

class Form extends React.Component {
  userNameInput = React.createRef();
  handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const resp = await axios.get(`https://api.github.com/users/${this.userNameInput.current.value}`);
      this.props.onSubmit(resp.data);
      this.userNameInput.current.value = '';
      console.log('submitted');
      console.log(this.userNameInput.current.value);
      console.log(resp.data);
    } catch (error){
      console.error(error);
      console.log('Houston we have a problem!');
    }
  }
  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <input type="text" 
        placeholder="Github username" 
        ref={this.userNameInput} 
        required/>
        <button>Add card</button>
      </form>
    );
  }
}

const CardList = (props) => (
  <div>
    {props.profiles.map(profile => <Card key={profile.id} {...profile}/>)}
  </div>
)

class App extends React.Component {
  constructor(props){
    super(props);
      this.state = {
        profiles: []
      };
  }  
  addNewProfileData = (profileData) => {
    this.setState(prevState => ({profiles: [...prevState.profiles, profileData],
    }));
    console.log('App', profileData);
  }
  render(){
    return (
    <div>
      <div className="header">{this.props.title}</div>
      <Form onSubmit={this.addNewProfileData} />
      <CardList profiles={this.state.profiles} />
    </div>
    )
  }
}

class Card extends React.Component {
  render(){
    const profile = this.props;
    return (
      <div className="github-profile">
        <img src={profile.avatar_url} />
        <div className="info">
          <div className="name">{profile.name}</div>
          <div className="company">{profile.company}</div>
        </div>
      </div>
    );
  }
}
export default App;