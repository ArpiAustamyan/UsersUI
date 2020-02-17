
import React from 'react';
import './App.css';
const axios = require('axios').default;
​
class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      firstname:"",
      lastname:"",
      users: []
    };
​
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  
  }
​
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  
  handleSubmit = async (event) => {
    event.preventDefault();
    const user = {
      FirstName: this.state.firstname,
      LastName: this.state.lastname
    };
​
​
   fetch('http://localhost:50617/api/Users', {
          method: 'POST', 
          mode: 'no-cors', 
          cache: 'no-cache', 
          headers: {
              'Content-Type':'application/json',
              'Accept':'*/*',
          },
         
          body: JSON.stringify(user), 
      })
      .then(response => response.json())  
  }
​
   componentDidMount() {
     debugger;
     axios.get('http://localhost:50617/api/Users')
      .then((response) => {
        this.setState({ users: response.data})
      });
  }
 
​
  render(){
    const { users } = this.state;
    return (
      <div >
        <form onSubmit={this.handleSubmit}>
            <div >
              <div>
                <label>Firstname</label>
                <input type='text' name='firstname' value={this.state.firstname} onChange={this.handleChange}/>
              </div>
              <div>
                <label>Lastname</label>
                <input type='text' name='lastname' value={this.state.lastname} onChange={this.handleChange}/>
              </div>
            </div>
            <div>
              <button type='submit'>Register</button>
            </div>
           <UsersList data={users} />
        </form>
      </div>
    );
    }
}  
​
class UsersList extends React.Component{
  render(){
    {
      const items = this.props.data.map(user => (
        <div key={user.id}>
          <span>{user.firstname}</span>
          <label>'    '</label>
          <span>{user.lastname} </span>
        </div>
      ));
      
      return(
      <div>
        {items}      
      </div>
      );
    }
  }
}

export default App;