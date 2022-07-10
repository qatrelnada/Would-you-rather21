import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import SignIn from './SignIn';

class AuthedUser extends React.Component {
    render() { 
        const { authedUser, children } = this.props;
        return authedUser === null  ? <SignIn /> : <Fragment>{children}</Fragment>
    }
}

function mapStateToProps({ authedUser }) {
    return { authedUser };
}
  
// export default AuthedUser;
export default connect(mapStateToProps)(AuthedUser);