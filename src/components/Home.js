import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import AuthedUser from './AuthedUser';
import '../Home.css';

class Home extends React.Component {
    state = {
        showAnsweredQuestions: false
    };

    toggle = (questions) => {
        if (questions === 'unanswered') this.setState({showAnsweredQuestions: false});
        if (questions === 'answered') this.setState({showAnsweredQuestions: true});
    };

    render() { 
        
        const { showAnsweredQuestions } = this.state;
        
        const { authedUser, users, questions } = this.props;

        let questionsArray = Object.values(questions);
        questionsArray = questionsArray.sort((a, b) => b.timestamp - a.timestamp);

        return (
            <AuthedUser>
            <div className='content'>

                <div className='Tabs'>

                    <button className='tab' 
                        style={!showAnsweredQuestions ? {backgroundColor: 'pink'} : {backgroundColor: 'transparent'}} 
                        onClick={() => this.toggle('unanswered')}>
                            <h1>Unanswered questions</h1>
                    </button>
                    
                    <button className='tab' 
                        style={showAnsweredQuestions ? {backgroundColor: 'pink'} : {backgroundColor: 'transparent'}} 
                        onClick={() => this.toggle('answered')}>
                            <h1>Answered questions</h1>
                    </button>

                </div>
                
                <ul className='questions-list'>

                    {questionsArray.map((question) => (
                        authedUser && users[authedUser].answers && Object.keys(users[authedUser].answers).includes(question.id) === showAnsweredQuestions && (
                            <li key={question.id} className='questions-list-item'>
                                <section className='question-author-info'>
                                    <div className='name'>{users[question.author].name} asks:</div>
                                    <div className='img'>
                                        <img src={users[question.author].avatarURL} alt={`Avatar of ${users[question.author].name}`} />
                                    </div>
                                </section>

                                <section className='question-info'>
                                    <h2>Would you rather ...</h2>

                                    <p>{question.optionOne.text}</p>

                                    <span>___Or___</span>

                                    <p>{question.optionTwo.text}</p>

                                    <button className='view-poll' onClick={this.handleClick}>
                                        <Link className='home-item-link' to={`/questions/${question.id}`}>
                                            View poll
                                        </Link>
                                    </button>
                                </section>
                            </li>
                        )
                    ))}

                </ul>
            </div>
            </AuthedUser>
        )
        
    }
}

function mapStateToProps({ authedUser, users, questions }) {
    return {
        authedUser,
        users,
        questions,
    };
}

// export default Home;
export default connect(mapStateToProps)(Home);
