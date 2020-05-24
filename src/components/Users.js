import React from "react";
import axios from 'axios';
import ItemUser from './ItemUser';
import { withAlert } from 'react-alert'

class Users extends React.Component {
  state = {
    users: [],
    name: "",
    job: "",
    page: 1,
  }

  componentDidMount() {
    if(localStorage.getItem('token') !== null){
      axios.get('https://reqres.in/api/users?page=1')
      .then((response) => {
        this.setState({users: response.data.data})
        })
      .catch((error) => {
        this.props.alert.error(error.response.data.error)
        })
  } else {
    this.props.history.push('/');
  }
}

loadContent = () => {
  if(this.state.page < 2) {
    axios.get('https://reqres.in/api/users?page=2')
      .then((response) => {
        let updateUsers = [...this.state.users, ...response.data.data]
        this.setState({users: updateUsers, page: 2})
        })
      .catch((error) => {
        this.props.alert.error(error.response.data.error)
        })
  }
}

onScroll = (event) => {
  const scrollBottom = Math.floor((event.target.scrollTop + event.target.offsetHeight)/10)-1
   < Math.floor(event.target.scrollHeight/10) && 
   Math.floor((event.target.scrollTop + event.target.offsetHeight)/10)+1 
   > Math.floor(event.target.scrollHeight/10);
 
  if (scrollBottom) {
      this.loadContent()
    }
}
  
onChange = (e) => this.setState({[e.target.name]: e.target.value});
  
onEdit = (id, first_name, last_name, email) => {
  const body = {
    first_name: first_name,
    last_name: last_name,
    email: email
  };
  axios.put('https://reqres.in/api/users/'+id, body)
  .then((response) => {
    const index = this.state.users.findIndex(obj => obj.id === id);
    let copy = this.state.users;
    copy[index].first_name = first_name;
    copy[index].last_name = last_name;
    copy[index].email = email;

    this.setState({
      users: copy
    }) 
  })
  .catch((error) => {
    this.props.alert.error(error.response.data.error);
  });
}

onDelete = (id) => {

  axios.delete('https://reqres.in/api/users/'+id)
  .then((response) => {
    const index = this.state.users.findIndex(obj => obj.id === id);
    let copy = this.state.users;
    copy.splice(index, 1)
    this.setState({
      users: copy
    }) 
  })
  .catch((error) => {
    this.props.alert.error(error.response.data.error);
  });
    
  }
    onSubmit = (e) => {
        e.preventDefault();
        const {name, job} = this.state;
        const body = {
          job: job,
          name: name
        };
        axios.post('https://reqres.in/api/users', body)
        .then((response) => {
          let newUser = {
          avatar: 'default',
          email: '',
          first_name: response.data.name,
          id: response.data.id,
          last_name: ""
         }
         let stateData = this.state.users;
         stateData.unshift(newUser)
         this.setState({users: stateData})
         this.setState({
           name: '',
           job: ''
         })
        })
        .catch((error) => {
          this.props.alert.error(error.response.data.error)
        });
    }

    onLogOut = () => {
      localStorage.removeItem('token');
      this.props.history.push('/');
    }

  render() {
    const {users} = this.state;
    const listItems = users.map((user) =>
    <ItemUser 
      key={user.id}
      id={user.id}
      email={user.email}
      first_name={user.first_name}
      last_name={user.last_name}
      avatar={user.avatar}
      onDelete={this.onDelete}
      onEdit={this.onEdit}
    /> 
    );

    return (
      <div style={{height: '100vh', overflow: 'scroll'}}  onScroll={this.onScroll}>
      <div className="blockDiv">    
      <button className="btn btn-secondary float-right" onClick={this.onLogOut}>Выход</button>
        <form className="for"  onSubmit={this.onSubmit}>
          <h3 className='headerForm  pt-5' >Создать нового пользователя</h3>
          <input className="inp" type='text' name='name' onChange={this.onChange} value={this.state.name}/>
          <input className="inp" type='text' name='job' onChange={this.onChange} value={this.state.job}/>
          <button className="btn btn-info" type="submit">Добавить</button>
        </form>
        <h3 className='header'>Список пользователей</h3>
        <div onScroll={this.onScroll}>
        {listItems}
        </div>
      </div>
      </div>
    );
  }
}

export default withAlert()(Users);