import React from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import { handleAddQuestion } from '../redux/thunks/questions';
import AuthedUser from './AuthedUser';

class AddQuestion extends React.Component {
    state = {
        optionOneText: '',
        optionTwoText: '',
        toHome: false
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const { optionOneText, optionTwoText } = this.state
    
        // Add question to Store
        const { dispatch, authedUser } = this.props
        dispatch(handleAddQuestion(optionOneText, optionTwoText, authedUser))
    
        console.log('New question option one: ', optionOneText);
        console.log('New question option two: ', optionTwoText);
    
        this.setState({
            optionOneText: '',
            optionTwoText: '',
            toHome: true
        })
    }
    render() {
        const { toHome } = this.state

        if (toHome === true) {
            return <Redirect to='/' />
        }

        return (
            <AuthedUser>
            <div className='content'>
                <h1>Would you rather</h1>
                <form onSubmit={this.handleSubmit}>
                    <input className='add-question-input' value={this.state.optionOneText} placeholder='Option one' onChange={(e) => {
                        this.setState({optionOneText: e.target.value})
                    }} />
                    <br />
                    <span>___Or___</span>
                    <br />
                    <input className='add-question-input' value={this.state.optionTwoText} placeholder='Option two' onChange={(e) => {
                        this.setState({optionTwoText: e.target.value})
                    }} />
                    <br />
                    <button type='submit' className='add-question-btn'>
                        Submit
                    </button>
                </form>
            </div>
            </AuthedUser>
        )
    }
}

function mapStateToProps({ authedUser }) {
    return {
        authedUser,
    };
}

export default connect(mapStateToProps)(AddQuestion);