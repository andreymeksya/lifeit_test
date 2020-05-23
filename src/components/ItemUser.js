import React from "react";

class ItemUser extends React.Component {
  state = {
    first_name: this.props.first_name,
    last_name: this.props.last_name,
    email: this.props.email,
    onEdit: false
  }

  onChange = (e) => this.setState({[e.target.name]: e.target.value});
  
  saveUserInfo = () => {
    this.props.onEdit(this.props.id, this.state.first_name, this.state.last_name, this.state.email)
    this.setState({onEdit: false})
  }

  render() {
        const {avatar} = this.props;
        let url;
        if (avatar !== 'default'){
            url = 'url('+avatar+')';
        } else {
            url = 'url(https://iupac.org/wp-content/uploads/2018/05/default-avatar.png)'
        }
    return (
      <div className='blockUser row'>
        <div className="userPic" style={{backgroundImage: url}}/>
        <div className='row rowElse'>
            {(this.state.onEdit) ?
            <input type='text' name='first_name' onChange={this.onChange} value={this.state.first_name}/>
            : <div>{this.state.first_name}</div> } 

            {(this.state.onEdit) ?
            <input type='text' name='last_name' onChange={this.onChange} value={this.state.last_name}/>
            : <div>{this.state.last_name}</div> }
            
            <div className='w-100'/>

            {(this.state.onEdit) ?
            <input type='text' name='email' onChange={this.onChange} value={this.state.email}/>
            : <div>{this.state.email}</div> }
        </div>
        
        <div className='ml-auto'>
        {(this.state.onEdit) ? 
            <button className='btn btn-info mb-4 mt-3 btnElse ' onClick={this.saveUserInfo}>Сохранить</button> :
            <div> 
            <button className='btn btn-info mb-4 mt-3 btnElse' onClick={() => this.setState({onEdit: true})} >Редактировать</button>
            <div className='w-100'/>
            <button className='btn btn-info btnElse' onClick={this.props.onDelete.bind(this, this.props.id)} >Удалить</button>
            </div>
        }
        
        </div>
      </div>
    );
  }
}

export default ItemUser;
