import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DateUtils from '../../util/DateUtils';

const Home = () => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!fullName) {
      errors.fullName = 'Full Name is required';
    }
    const phoneRegex = /^0\d{9}$/;
    if (!phoneNumber) {
      errors.phoneNumber = 'Phone Number is required';
    } else if (!phoneRegex.test(phoneNumber)) {
      errors.phoneNumber = 'Enter a valid phone number. Eg: 0272001700';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
      errors.email = 'Enter a valid email address';
    }

    if (!amount) {
      errors.amount = 'Please enter an amount to pay.';
    } else if (amount < 5) {
      errors.amount = 'The minimum amount allowed is GHS5.00';
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      // Convert amount to a number
      const amountValue = parseFloat(amount);
      const currentMonth = DateUtils.getCurrentMonth();
      const currentYear = DateUtils.getCurrentYear();
      const currentDate = DateUtils.getCurrentDate();
      // Handle form submission (e.g., send data to backend)
      console.log('Form submitted:', { fullName, phoneNumber, email, amount: amountValue, currentMonth, currentYear, currentDate  });

      // Clear form fields after submission
      setFullName('');
      setPhoneNumber('');
      setEmail('');
      setAmount('');
      setErrors({});
    } else {
      setErrors(formErrors);
    }
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
    if (e.target.value >= 5) {
      setErrors((prevErrors) => ({ ...prevErrors, amount: undefined }));
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 w-full px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-black">GMSC '18</h1>
      <h2 className="text-xl mt-2 mb-8">GMSC '18 Contribution Website</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <div className="mb-4">
          <label className="block text-gray-700">Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
          {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Phone Number</label>
          <input
            type="text"
            value={phoneNumber}
            placeholder='...should be your MoMo number'
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
          {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Amount</label>
          <input
            type="text"
            value={amount}
            onChange={handleAmountChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
          {errors.amount && <p className="text-red-500 text-sm">{errors.amount}</p>}
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 w-full rounded">
          Make Payment
        </button>
      </form>
      <Link to="/contributors" className="text-blue-500 font-bold mt-4">View contributors for this month</Link>
    </div>
  );
};

export default Home;
