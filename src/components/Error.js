import React from 'react';

class Error extends React.Component {
    render() { 
        return <div className='content'>
            <h1>404 Not found</h1>
            <p>This question doesn't exist !</p>
        </div>;
    }
}
 
export default Error;