import { showLoading, hideLoading } from 'react-redux-loading';
import { _getQuestions, _saveQuestion } from '../../utils/_DATA';
import { receiveQuestions, addQuestion, addAnswerToQuestion } from '../actions/questions';
import { addQuestionToUser } from '../actions/users';
import { addAnswerToUser } from '../actions/users';
import { saveQuestionAnswer } from '../../utils/api';

export function handleReceiveQuestions () {
    return async function (dispatch) {
      dispatch(showLoading());
  
      const questions = await _getQuestions();
  
      dispatch(receiveQuestions(questions));
      dispatch(hideLoading());
    }
}

export function handleAddQuestion (optionOne, optionTwo, author) {
    return async function (dispatch) {
      
      dispatch(showLoading());
  
      const question = await _saveQuestion(
        optionOne,
        optionTwo,
        author
      );

      dispatch(addQuestion(question));
      dispatch(addQuestionToUser(question));
      dispatch(hideLoading());
    }
}

export function handleAnswerQuestion(authedUser, qid, answer) {
    return async function (dispatch) {
  
      dispatch(showLoading());
  
      await saveQuestionAnswer( 
        authedUser, 
        qid, 
        answer
      );

      dispatch(addAnswerToUser(authedUser, qid, answer));
      dispatch(addAnswerToQuestion(authedUser, qid, answer));
      dispatch(hideLoading());
    }
}