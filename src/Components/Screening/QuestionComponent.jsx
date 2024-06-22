import React from 'react';
import PropTypes from 'prop-types';

const QuestionComponent = ({ questionNumber, questionText }) => {
  return (
    <div className="border border-gray-300 p-4 rounded-lg shadow-sm flex items-center bg-white m-3">
      <span className="font-bold mr-2">{questionNumber}.</span>
      <p className="text-gray-700">{questionText}</p>
      {/* <span>{switch}</span> */}
    </div>
  );
};

QuestionComponent.propTypes = {
  questionNumber: PropTypes.number.isRequired,
  questionText: PropTypes.string.isRequired,
};

export default QuestionComponent;
