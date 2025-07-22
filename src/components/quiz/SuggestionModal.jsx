import React from 'react';

const SuggestionModal = ({ score }) => {
  return (
    <div className="suggestion">
      {score >= 7 ? (
        <p>💬 Suggestion: Consult a mental health professional or try mindfulness apps like Headspace.</p>
      ) : (
        <p>💡 Tip: Set daily screen time limits and enjoy offline hobbies for balance.</p>
      )}
    </div>
  );
};

export default SuggestionModal;
