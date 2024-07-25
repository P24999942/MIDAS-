import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from './utils/api';

const CreateAccount = ({ onNext }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobileNumber: '',
    emailAddress: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/register', formData);
      const { user, token, refreshToken } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      onNext(user);
      navigate('/loan-application');
    } catch (error) {
      console.error('Error creating account:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-3xl font-bold text-slate-700 mb-6">Create your account</h2>
      <p className="text-slate-600 mb-6">Share a few pieces of information to get started with your loan application. Please fill out all required * fields.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-slate-700">Legal first name *</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-slate-700">Legal last name *</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="mobileNumber" className="block text-sm font-medium text-slate-700">Mobile number</label>
            <input
              type="tel"
              id="mobileNumber"
              name="mobileNumber"
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="emailAddress" className="block text-sm font-medium text-slate-700">Email address *</label>
            <input
              type="email"
              id="emailAddress"
              name="emailAddress"
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700">Password *</label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
              onChange={handleInputChange}
              required
            />
          </div>
          <button 
          type="submit" 
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default CreateAccount;