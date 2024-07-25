import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import MidasLanding from './MidasLanding';
import CreateAccount from './CreateAccount';
import LoanApplication from './LoanApplication';
import PaymentPlan from './PaymentPlan';
import PersonalSpace from './PersonalSpace';
import Login from './Login';


const App = () => {
  const [user, setUser] = useState(null);
  const [loanApplicationData, setLoanApplicationData] = useState(null);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

const handleLogin = (userData, newToken) => {
  setUser(userData);
  setToken(newToken);
  localStorage.setItem('token', newToken);
};

const handleLogout = () => {
  setUser(null);
  setToken(null);
  localStorage.removeItem('token');
};


  useEffect(() => {
    if (token) {
      // Verify token and set user
      // This would typically involve an API call to verify the token
      // For now, we'll just set a mock user
      setUser({ firstName: 'John', lastName: 'Doe' });
    }
  }, [token]);

  const handleCreateAccount = (userData) => {
    setUser(userData);
  };
  
  const handleLoanApplication = (data) => {
    console.log('Handling loan application:', data);
    setLoanApplicationData(data);
  };
  
  const handleSelectTerm = (term) => {
    setSelectedLoan(term);
  };

  return (
    <Router>
      <div className="container mx-auto p-4 font-serif">
        <header className="flex justify-between items-center mb-8">
          <Link to="/" className="text-2xl font-bold text-slate-700 hover:text-yellow-500">Midas</Link>
          <nav>
            <ul className="flex space-x-6">
              <li><Link to="/" className="text-slate-700 hover:text-yellow-500">Home</Link></li>
              <li><Link to="/services" className="text-slate-700 hover:text-yellow-500">Services</Link></li>
              <li><Link to="/about" className="text-slate-700 hover:text-yellow-500">About Us</Link></li>
              {!user && <li><Link to="/login" className="text-slate-700 hover:text-yellow-500">Login</Link></li>}
              {user && <li><button onClick={() => setUser(null)} className="text-slate-700 hover:text-yellow-500">Logout</button></li>}
            </ul>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<MidasLanding />} />
          <Route 
            path="/create-account" 
            element={<CreateAccount onNext={handleCreateAccount} />} 
          />
          <Route 
            path="/login" 
            element={<Login onLogin={handleLogin} />} 
          />
          <Route 
            path="/loan-application" 
            element={
              user ? 
                <LoanApplication
                  onNext={handleLoanApplication}
                  loanData={loanApplicationData}
                /> :
                <Navigate to="/login" replace />
            } 
          />
          <Route 
            path="/payment-plan" 
            element={
              loanApplicationData ? 
                <PaymentPlan
                  loanData={loanApplicationData}
                  onSelectTerm={handleSelectTerm}
                /> :
                <Navigate to="/loan-application" replace />
            } 
          />
          <Route 
            path="/personal-space" 
            element={
              user ? 
                <PersonalSpace
                  user={user}
                  selectedLoan={selectedLoan}
                /> :
                <Navigate to="/login" replace />
            } 
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;