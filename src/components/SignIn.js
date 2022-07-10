import React from 'react';
import { connect } from "react-redux";
import { handleSetAuthedUser } from '../redux/thunks/authedUser';
import { Redirect } from 'react-router-dom';

class SignIn extends React.Component {
    state = {
        userId: '',
        toSignUp: false
    }
    handleClick = (e) => {
      this.setState({
        toSignUp: true
      })
    }
    render() { 
      const { toSignUp } = this.state

      if (toSignUp === true) {
          return <Redirect to='/signup' />
      }

      const { users } = this.props;

      // console.log('users from SignIn', users)

      return <div className='content'>
              <div>
                  <h1>"Would you rather ..." app</h1>
                  
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault()
                      this.props.dispatch(handleSetAuthedUser(this.state.userId))
                  }}>
                      <select className='select'
                          onChange={(e) => {
                            this.setState({userId: e.target.value})
                          }}>
                              <option value='' hidden>
                                  Select a user
                              </option>
                          {Object.keys(users).map((userID) => (
                              <option key={users[userID].id} value={users[userID].id}>
                                  {users[userID].name}
                              </option>
                          ))}
                      </select>
                      <br />
                      <div className='btns'>
                        <button type='submit' className='first-btn button'>
                          Sign in
                        </button>
                        <br/>
                        <button className='second-btn button' onClick={this.handleClick}>
                          Sign up
                        </button>
                      </div>
                  </form>
              </div>
      </div>;
    }
}

function mapStateToProps({ users }) {
  return {
    users
  }
}

export default connect(mapStateToProps)(SignIn);
