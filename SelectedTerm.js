import React, { useState } from 'react';

const SelectedTerm = ({ term, onBack }) => (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Selected Loan Term</h2>
      <div className="p-4 border rounded shadow">
        <div className="font-bold mb-2">{term.months} {term.months > 12 ? 'months' : (term.months > 1 ? 'weeks' : 'week')}</div>
        <div>Loan Amount: ${term.amount.toFixed(2)}</div>
        <div>Monthly Payment: ${term.monthlyPayment}</div>
        <div>Interest Rate: {term.rate}%</div>
        <div>Total Interest: ${term.totalInterest}</div>
        <div>Number of Payments: {term.months}</div>
        <div>Total Amount: ${term.total}</div>
      </div>
      <button onClick={onBack} className="mt-4 w-full p-2 bg-blue-500 text-white rounded">
        Back to Loan Terms
      </button>
    </div>
  );
  export default SelectedTerm;