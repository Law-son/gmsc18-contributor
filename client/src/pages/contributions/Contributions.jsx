import React, { useState, useEffect } from "react";
import axios from 'axios';
import DateUtils from "../../util/DateUtils"; // Import the DateUtils utility class

const Contributions = () => {
  const currentMonth = DateUtils.getCurrentMonth();
  const currentYear = DateUtils.getCurrentYear();
  const [contributors, setContributors] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [filteredContributors, setFilteredContributors] = useState([]);
  const [totalAmountCurrentMonth, setTotalAmountCurrentMonth] = useState(0);
  const [totalAmountYear, setTotalAmountYear] = useState(0);
  const [totalAmountOverall, setTotalAmountOverall] = useState(0);

  useEffect(() => {
    // Fetch contributions from the server
    const fetchContributions = async () => {
      try {
        const response = await axios.get('https://gmsc18-contributor.onrender.com/fetchPayments/');
        const data = response.data.success;

        setContributors(data);
        calculateTotalAmountOverall(data);
        filterContributorsByMonth(currentMonth, currentYear, data);
      } catch (error) {
        console.error('Error fetching contributions:', error);
      }
    };

    fetchContributions();
  }, [currentMonth, currentYear]);

  useEffect(() => {
    // Calculate total amount for the current month
    const totalForMonth = filteredContributors.reduce((total, contributor) => total + contributor.amount, 0);
    setTotalAmountCurrentMonth(totalForMonth);
  }, [filteredContributors]);

  useEffect(() => {
    // Calculate total amount for the current year
    const totalForYear = contributors
      .filter(contributor => contributor.currentYear === currentYear)
      .reduce((total, contributor) => total + contributor.amount, 0);
    setTotalAmountYear(totalForYear);
  }, [contributors, currentYear]);

  const calculateTotalAmountOverall = (data) => {
    const total = data.reduce((total, contributor) => total + contributor.amount, 0);
    setTotalAmountOverall(total);
  };

  // Handle month change
  const handleMonthChange = (event) => {
    const month = event.target.value;
    setSelectedMonth(month);
    filterContributorsByMonth(month, currentYear);
  };

  // Filter contributors by selected month and year
  const filterContributorsByMonth = (month, year, data = contributors) => {
    const filtered = data.filter(
      (contributor) => contributor.currentMonth === month && contributor.currentYear === year
    );
    setFilteredContributors(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-black mb-4 text-center md:text-left">
          Contributions
        </h1>

        {/* Total amount gathered */}
        <div className="mb-4 md:flex md:items-center md:justify-between">
          <div className="mb-4 md:mb-0">
            <p className="text-lg font-semibold">
              Total amount gathered this month: GHS{totalAmountCurrentMonth}
            </p>
            <p className="text-lg font-semibold">
              Total amount gathered this year: GHS{totalAmountYear}
            </p>
            <p className="text-lg font-semibold">
              Overall total amount gathered: GHS{totalAmountOverall}
            </p>
          </div>
          <div className="md:text-right">
            {/* Month selector */}
            <label
              htmlFor="monthSelector"
              className="text-lg font-semibold mr-2"
            >
              Select Month:
            </label>
            <select
              id="monthSelector"
              className="px-4 py-2 border border-gray-300 rounded"
              value={selectedMonth}
              onChange={handleMonthChange}
            >
              {/* Dropdown options for selecting month */}
              <option value="">Select Month</option>
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>
          </div>
        </div>

        {/* Contributors table */}
        <div className="bg-white p-6 rounded shadow-md">
          <h2 className="text-2xl font-bold mb-4">
            Contributors for the month of {selectedMonth || "All"}
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded shadow-md">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left px-4 py-2">#</th>
                  <th className="text-left px-4 py-2">Full Name</th>
                  <th className="text-left px-4 py-2">Amount</th>
                  <th className="text-left px-4 py-2">Date Paid</th>
                </tr>
              </thead>
              <tbody>
                {filteredContributors.map((contributor, index) => (
                  <tr key={contributor._id}>
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">{contributor.fullName}</td>
                    <td className="border px-4 py-2">GHS{contributor.amount}</td>
                    <td className="border px-4 py-2">
                      {contributor.currentDate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contributions;
