import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Answered from './Answered';
import AuthedUser from './AuthedUser';
import Error from './Error';
import { handleAnswerQuestion } from './../redux/thunks/questions';

class Details extends React.Component {
    state = {
        answer: '',
        answered: false
    }

    handleChange = (e) => {
        this.setState({answer: e.target.value})
    }
  
    handleSubmit = () => {
        const { authedUser } = this.props;
        const id = this.props.match.params.question_id;
        const { answer } = this.state;
  
        this.props.dispatch(handleAnswerQuestion(
            authedUser,
            id,
            answer,
        ))
        
        this.setState({answered: true});
    }
  
    render() { 
        const { authedUser, users, questions } = this.props;
        const id = this.props.match.params.question_id
        const question = questions && questions[id];
        // console.log({questions});
        // console.log({question});
        const answeredQuestion = authedUser && users[authedUser].answers && Object.keys(users[authedUser].answers).includes(id);

        return (
            <AuthedUser>
                {!question && (
                    <Error />
                )}
                {question && (answeredQuestion || this.state.answered
                ? (<Answered question={question} />)
                : (
                    <div className='content'>

                        <div className='unanswered-question'>

                            <section className='unanswered-question-author-info'>
                                <h1 className='name'>{users[question.author].name} asks:</h1>

                                <img className='img'
                                    src={users[question.author].avatarURL}
                                    alt={`Avatar of ${users[question.author].name}`}
                                />
                            </section>
                            
                            <section className='unanswered-question-options'>
                                <h2>Would you rather</h2>

                                <form
                                    onSubmit={this.handleSubmit}>
                                    <div className='unanswered-question-option'>
                                        <input name='option' type='radio' value='optionOne' onChange={this.handleChange} />{question.optionOne.text}
                                    </div>
                                    
                                    <div className='unanswered-question-option'>
                                        <input name='option' type='radio' value='optionTwo' onChange={this.handleChange} />{question.optionTwo.text}
                                    </div>

                                    {/* <input type='submit' value='Submit' onSubmit={this.handleSubmit} className='unanswered-question-btn' /> */}
                                    <button 
                                        type='submit' 
                                        className='unanswered-question-btn' >
                                            Submit
                                    </button>
                                </form>
                            </section>

                        </div>

                    </div>
                  )
                )}
            </AuthedUser>
        )
    }
}

function mapStateToProps({ authedUser, users, questions }) {
    return {
        authedUser,
        users,
        questions
    }
}

export default withRouter(connect(mapStateToProps)(Details));
