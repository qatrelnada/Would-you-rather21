import React from 'react';
import { connect } from "react-redux";
import { NavLink } from 'react-router-dom';
import { removeAuthedUser } from '../redux/actions/authedUser';
import '../NavBar.css';

class NavBar extends React.Component {
    render() { 
        const { users, authedUser } = this.props;

        return <div className='nav-bar'>

            <ul className='nav-links'>
                <li className='nav-link'>
                    <NavLink className='link' activeClassName="active" to='/' exact>
                        Home
                    </NavLink>
                </li>

                <li className='nav-link'>
                    <NavLink className='link' activeClassName="active" to='/add'>
                        Add question
                    </NavLink>
                </li>

                <li className='nav-link'>
                    <NavLink className='link' activeClassName="active" to='/leaderboard'>
                        Leaderboard
                    </NavLink>
                </li>
            </ul>

            {authedUser && (
                <ul className='nav-user-sign-out'>
                    <li className='welcome-user'>
                        <p>Welcome, {users[authedUser].name}</p>
                    </li>

                    <li className='nav-img'>
                        <img className='avatar' src={users[authedUser].avatarURL} alt='User avatar' />
                    </li>

                    <li className='nav-btn'>
                        <button className='sign-out'
                            onClick={() => {
                                this.props.dispatch(removeAuthedUser())
                            }}>
                                Sign out
                        </button>
                    </li>
                </ul>
            )}
            
        </div>;
    }
}

function mapStateToProps({ users, authedUser }) {
    return {
        users,
        authedUser
    }
}

// export default NavBar;
export  default connect(mapStateToProps)(NavBar);
