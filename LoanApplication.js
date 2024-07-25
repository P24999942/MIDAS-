import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LoanTypeIcon from './LoanTypeIcon';
import api from './utils/api';
import axios from 'axios';

const LoanApplication = ({ onNext, loanData }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(loanData?.loanType ? 'details' : 'category');
  const [formData, setFormData] = useState({
    loanType: '',
    loanAmount: '',
    annualIncome: '',
    creditScore: '',
    propertyValue: '',
    downPayment: '',
    vehicleValue: '',
    employmentStatus: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCategorySelect = (category) => {
    setFormData({ ...formData, loanType: category });
    setStep('details');
  };

  const handleLocalBack = () => {
    if (step === 'details') {
      setStep('category');
    } else {
      navigate('/create-account');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('/api/loans/apply', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Loan application submitted:', response.data);
      onNext(response.data);
      navigate('/payment-plan');
    } catch (error) {
      console.error('Error submitting loan application:', error);
    }
  };

  const renderCategorySelection = () => (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-slate-700 mb-4">Select Loan Type</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {['Personal', 'Mortgage', 'Auto'].map((loanType) => (
          <button
            key={loanType}
            onClick={() => handleCategorySelect(loanType)}
            className="flex flex-col items-center p-6 bg-white rounded-lg border border-slate-300 hover:border-yellow-500 transition-colors duration-200"
          >
            <div className="mb-4">
              <LoanTypeIcon type={loanType} size={60} />
            </div>
            <span className="text-lg font-medium text-slate-700">{loanType}</span>
          </button>
        ))}
      </div>
    </div>
  );

  const renderLoanDetails = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-3xl font-bold text-slate-700 mb-4">Loan Application for {formData.loanType}</h2>
      <div>
        <label htmlFor="loanAmount" className="block text-sm font-medium text-slate-700">Desired Loan Amount ($)</label>
        <input
          type="number"
          id="loanAmount"
          name="loanAmount"
          value={formData.loanAmount}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
          required
        />
      </div>
      <div>
        <label htmlFor="annualIncome" className="block text-sm font-medium text-slate-700">Annual Income ($)</label>
        <input
          type="number"
          id="annualIncome"
          name="annualIncome"
          value={formData.annualIncome}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
          required
        />
      </div>
      <div>
        <label htmlFor="creditScore" className="block text-sm font-medium text-slate-700">Credit Score</label>
        <input
          type="number"
          id="creditScore"
          name="creditScore"
          value={formData.creditScore}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
            focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
          min="300"
          max="850"
          required
        />
      </div>
      {formData.loanType === 'Mortgage' && (
        <>
          <div>
            <label htmlFor="propertyValue" className="block text-sm font-medium text-slate-700">Property Value ($)</label>
            <input
              type="number"
              id="propertyValue"
              name="propertyValue"
              value={formData.propertyValue}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
              required
            />
          </div>
          <div>
            <label htmlFor="downPayment" className="block text-sm font-medium text-slate-700">Down Payment ($)</label>
            <input
              type="number"
              id="downPayment"
              name="downPayment"
              value={formData.downPayment}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
              required
            />
          </div>
        </>
      )}
      {formData.loanType === 'Auto' && (
        <div>
          <label htmlFor="vehicleValue" className="block text-sm font-medium text-slate-700">Vehicle Value ($)</label>
          <input
            type="number"
            id="vehicleValue"
            name="vehicleValue"
            value={formData.vehicleValue}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
            required
          />
        </div>
      )}
      {formData.loanType === 'Personal' && (
        <div>
          <label htmlFor="employmentStatus" className="block text-sm font-medium text-slate-700">Employment Status</label>
          <select
            id="employmentStatus"
            name="employmentStatus"
            value={formData.employmentStatus}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
              focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
            required
          >
            <option value="">Select status</option>
            <option value="Employed">Employed</option>
            <option value="Self-Employed">Self-Employed</option>
            <option value="Unemployed">Unemployed</option>
            <option value="Retired">Retired</option>
          </select>
        </div>
      )}
      <div className="flex justify-between">
        <button
          type="button"
          onClick={handleLocalBack}
          className="px-4 py-2 border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
        >
          Back
        </button>
        <button 
          type="submit" 
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
        >
          Continue
        </button>
      </div>
    </form>
  );

  return (
    <div className="container mx-auto px-4 py-8 font-serif">
      <button onClick={handleLocalBack} className="text-slate-700 hover:text-yellow-500 flex items-center mb-6">
        <ArrowLeft className="mr-2" size={20} />
        Back
      </button>
      <div className="max-w-2xl mx-auto">
        {step === 'category' ? renderCategorySelection() : renderLoanDetails()}
      </div>
    </div>
  );
};

export default LoanApplication;





