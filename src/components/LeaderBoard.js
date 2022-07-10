import React from 'react';
import { connect } from "react-redux";
import AuthedUser from './AuthedUser';

class LeaderBoard extends React.Component {
  render() {
    const { users } = this.props;

    let sortedUsers = []

    Object.keys(users).forEach((userID) => {

      const user = users[userID];

      sortedUsers.push({
        user: users[userID],
        score: user.questions.length + Object.keys(user.answers).length
      });

    })

    sortedUsers.sort((a,b) => b.score - a.score);

    return (
      <AuthedUser>
      <div className='content'>
        <ul className='leaderboard-list'>
          {Object.values(sortedUsers).map((user) => (
            <li className='leaderboard-list-item' key={user.user.id}>
              <div className='leaderboard-user-info'>
                <div className='name'>{user.user.name}</div>
                <img className='img' src={user.user.avatarURL} alt='avatar' />
              </div>
              
              <div className='leaderboard-questions-info'>
                <p className='questions-info'>Asked {user.user.questions.length} questions</p>
                <br />
                <p className='questions-info'>Answered {Object.keys(user.user.answers).length} questions</p>
              </div>

              <div className='score'>
                Score: {user.user.questions.length + Object.keys(user.user.answers).length}
              </div>
            </li>
          ))}
        </ul>
      </div>
      </AuthedUser>
    )
  }
}

function mapStateToProps({ users }) {
  return {
    users
  }
}

export default connect(mapStateToProps)(LeaderBoard);