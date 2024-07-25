import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const MidasLanding = () => {
  return (
    <div className="container mx-auto px-4 py-8 font-serif">
      <main className="flex items-center">
        <div className="w-1/2 pr-8">
          <h2 className="text-5xl font-bold text-slate-700 mb-6 leading-tight">
            Quick and Easy Loans for Your Financial Needs.
          </h2>
          <Link to="/create-account" className="bg-yellow-500 text-white px-6 py-3 rounded-full hover:bg-yellow-600 transition-colors flex items-center inline-flex">
            Get started
            <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>
        <div className="w-1/2">
            <li><Link to="/" className="text-slate-700 font-medium hover:text-yellow-500 border-b-2 border-yellow-500">Home</Link></li>
            <li><Link to="/services" className="text-slate-700 hover:text-yellow-500">Services</Link></li>
            <li><Link to="/about" className="text-slate-700 hover:text-yellow-500">About Us</Link></li>
            <li><Link to="/login" className="text-slate-700 hover:text-yellow-500">Login</Link></li>
            </div>
      </main>
    </div>
  );
};

export default MidasLanding;