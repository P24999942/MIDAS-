import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import api from './utils/api';
import axios from 'axios';



const PersonalSpace = ({ user, selectedLoan }) => {
  const [remainingPayments, setRemainingPayments] = useState(selectedLoan.months);
  const [nextPaymentDate, setNextPaymentDate] = useState(new Date());

  useEffect(() => {
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + 30);
    setNextPaymentDate(nextDate);
  }, []);

  const handleMakePayment = async () => {
    if (remainingPayments > 0) {
      try {
        const formData = { loanId: selectedLoan.id, amount: selectedLoan.monthlyPayment };
        const response = await axios.post('/api/payments', formData);
        setRemainingPayments(prev => prev - 1);
        alert('Payment processed successfully!');
      } catch (error) {
        console.error('Error processing payment:', error);
        alert('Failed to process payment. Please try again.');
      }
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  const renderPaymentChart = () => {
    const data = Array(selectedLoan.months).fill().map((_, index) => ({
      name: `Payment ${index + 1}`,
      value: 1,
    }));

    const completedPayments = selectedLoan.months - remainingPayments;
    const COLORS = ['#0088FE', '#FFFFFF'];

    return (
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            startAngle={180}
            endAngle={0}
            innerRadius="60%"
            outerRadius="80%"
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={index < completedPayments ? COLORS[0] : COLORS[1]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    );
  };

  const handleSomeAction = async () => {
    try {
      const formData = {}; // Define your formData here
      const token = localStorage.getItem('token');
      const response = await axios.post('/some-endpoint', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Handle the response
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6">Welcome to Your Personal Space, {user.firstName}!</h1>
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Your Selected Loan</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p><strong>Loan Type:</strong> {selectedLoan.loanType}</p>
            <p><strong>Loan Amount:</strong> {formatCurrency(selectedLoan.amount)}</p>
            <p><strong>Interest Rate:</strong> {selectedLoan.rate.toFixed(2)}%</p>
          </div>
          <div>
            <p><strong>Term:</strong> {selectedLoan.months} months</p>
            <p><strong>Monthly Payment:</strong> {formatCurrency(selectedLoan.monthlyPayment)}</p>
            <p><strong>Total Interest:</strong> {formatCurrency(selectedLoan.totalInterest)}</p>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Payment Progress</h2>
        <div className="flex items-center justify-between mb-4">
          <p><strong>Remaining Payments:</strong> {remainingPayments} of {selectedLoan.months}</p>
          <p><strong>Next Payment Date:</strong> {nextPaymentDate.toLocaleDateString()}</p>
        </div>
        {renderPaymentChart()}
      </div>
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Make a Payment</h2>
        <p className="mb-4">Your next payment of {formatCurrency(selectedLoan.monthlyPayment)} is due on {nextPaymentDate.toLocaleDateString()}.</p>
        <button 
          onClick={handleMakePayment} 
          className="w-full p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
        >
          Make Payment
        </button>
      </div>
    </div>
  );
};

export default PersonalSpace;