import React from 'react';
import { connect } from "react-redux";

class Answered extends React.Component {
    render() { 
      const { authedUser, users, question } = this.props

      const optionOneTotalVotes = question.optionOne.votes.length
      const optionTwoTotalVotes = question.optionTwo.votes.length
      const totalVotes = optionOneTotalVotes + optionTwoTotalVotes

      const optionOnePercentage =
          (optionOneTotalVotes / totalVotes) * 100
      const optionTwoPercentage =
          (optionTwoTotalVotes / totalVotes) * 100

      const optionOneVotes = question.optionOne.votes
      const selectedOptionOne = optionOneVotes.includes(authedUser)

      const optionTwoVotes = question.optionTwo.votes
      const selectedOptionTwo = optionTwoVotes.includes(authedUser)

        return <div className='content'>

            <div className='answered-question'>

              <section className='answered-question-author-info'>
                <h1 className='name'>{users[question.author].name} asks:</h1>
                <img className='img'
                  src={users[question.author].avatarURL}
                  alt={`Avatar of ${users[question.author].name}`}
                />
              </section>

              <section className='answered-question-options'>
                <h2>Would you rather</h2>
                <p className='answered-question-option-text' style={selectedOptionOne ? {backgroundColor: 'yellow', width: '90%'} : {backgroundColor: 'transparent'}}>{question.optionOne.text}</p>
                <div className='or'>___Or___</div>
                <p className='answered-question-option-text' style={selectedOptionTwo ? {backgroundColor: 'yellow', width: '90%'} : {backgroundColor: 'transparent'}}>{question.optionTwo.text}</p>
              </section>

              <section className='answered-question-options-info'>

                <section className='answered-question-option-info'>
                  <div>{optionOneTotalVotes} out of {totalVotes}</div>
                  <div>{optionOnePercentage.toFixed(0)}%</div>
                </section>

                <br />

                <section className='answered-question-option-info'>
                  <div>{optionTwoTotalVotes} out of {totalVotes}</div>
                  <div>{optionTwoPercentage.toFixed(0)}%</div>
                </section>

              </section>

            </div>

        </div>;
    }
}

function mapStateToProps({ authedUser, users, questions }) {
  return {
    authedUser,
    users,
    questions
  }
}

export default connect(mapStateToProps)(Answered);