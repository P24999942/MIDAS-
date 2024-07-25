import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PaymentPlan = ({ loanData, onSelectTerm }) => {
  const navigate = useNavigate();
  const [sliderAmount, setSliderAmount] = useState(parseFloat(loanData.loanAmount) || 0);
  const [showAdjustedTerms, setShowAdjustedTerms] = useState(false);
  const [isDeclined, setIsDeclined] = useState(false);
  const maxLoanAmount = parseFloat(loanData.annualIncome);

  const getAutoLoanRate = (creditScore) => {
    if (creditScore >= 781) return 5.38;
    if (creditScore >= 661) return 6.89;
    if (creditScore >= 601) return 9.62;
    if (creditScore >= 501) return 12.85;
    return 15.62;
  };

  const calculateLoanTerms = (loanAmount, annualIncome, loanType, creditScore) => {
    const amount = parseFloat(loanAmount);
    const income = parseFloat(annualIncome);
    const score = parseInt(creditScore);

    if (isNaN(amount) || isNaN(income) || amount <= 0 || income <= 0 || amount > income || isNaN(score)) {
      return [];
    }

    if (loanType === 'Auto') {
      const rate = getAutoLoanRate(score);
      return [
        { months: 48, rate },
        { months: 72, rate },
        { months: 120, rate }
      ];
    } else if (loanType === 'Mortgage') {
      return [
        { months: 180, rate: 5.5 },
        { months: 360, rate: 7.0 }
      ];
    } else if (loanType === 'Personal') {
      return [
        { months: 12, rate: 8.0 },
        { months: 24, rate: 9.0 },
        { months: 36, rate: 10.0 }
      ];
    }

    return [];
  };

  const calculatePayments = (amount, months, rate) => {
    const monthlyRate = rate / 100 / 12;
    const payment = amount * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    const totalInterest = (payment * months) - amount;
    const total = amount + totalInterest;

    return {
      monthlyPayment: payment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      total: total.toFixed(2)
    };
  };

  const handleSliderChange = (e) => {
    const newAmount = parseFloat(e.target.value);
    setSliderAmount(newAmount);
    setShowAdjustedTerms(newAmount !== parseFloat(loanData.loanAmount));
    setIsDeclined(newAmount > maxLoanAmount);
  };

  const handleSelectTerm = (term) => {
    onSelectTerm({
      ...term,
      loanType: loanData.loanType,
      amount: sliderAmount
    });
    navigate('/personal-space');
  };

  const handleBack = () => {
    navigate('/loan-application');
  };

  const renderTerms = (terms, amount, title) => (
    <div>
      <h3 className="text-2xl font-semibold mb-4">{title}</h3>
      {Array.isArray(terms) && terms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {terms.map((term, index) => {
            const { monthlyPayment, totalInterest, total } = calculatePayments(amount, term.months, term.rate);
            return (
              <div key={index} className="p-4 border rounded shadow">
                <div className="font-bold mb-2">{term.months / 12} years ({term.months} months)</div>
                <div>Monthly Payment: ${monthlyPayment}</div>
                <div>Interest Rate: {term.rate.toFixed(2)}%</div>
                <div>Total Interest: ${totalInterest}</div>
                <div>Total Amount: ${total}</div>
                <button 
                  onClick={() => handleSelectTerm({ ...term, amount, monthlyPayment, totalInterest, total })}
                  className="mt-4 w-full p-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Select This Term
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <p>No applicable terms for the current loan amount or loan type.</p>
      )}
    </div>
  );

  const initialTerms = calculateLoanTerms(loanData.loanAmount, loanData.annualIncome, loanData.loanType, loanData.creditScore);
  const adjustedTerms = calculateLoanTerms(sliderAmount, loanData.annualIncome, loanData.loanType, loanData.creditScore);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-4">Loan Terms</h2>
      
      <button onClick={handleBack} className="mb-4 p-2 bg-gray-500 text-white rounded hover:bg-gray-600">
        Back to Loan Application
      </button>
      
      {renderTerms(initialTerms, parseFloat(loanData.loanAmount), "Initial Loan Terms")}

      <div className="mt-12">
        <h3 className="text-2xl font-semibold mb-4">Explore Different Loan Amounts</h3>
        <div className="mb-8">
          <input 
            type="range" 
            min="0" 
            max={maxLoanAmount} 
            value={sliderAmount} 
            onChange={handleSliderChange}
            className="w-full"
          />
          <div className="flex justify-between">
            <span>$0</span>
            <span>Current: ${sliderAmount.toFixed(2)}</span>
            <span>${maxLoanAmount.toFixed(2)}</span>
          </div>
        </div>

        {isDeclined ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Loan Application Declined!</strong>
            <p>The selected loan amount exceeds your annual income. Please consider a lower amount.</p>
            <p className="mt-2">Suggested maximum loan amount: ${maxLoanAmount.toFixed(2)}</p>
          </div>
        ) : (
          showAdjustedTerms && renderTerms(adjustedTerms, sliderAmount, "Adjusted Loan Terms")
        )}
      </div>
    </div>
  );
};

export default PaymentPlan;