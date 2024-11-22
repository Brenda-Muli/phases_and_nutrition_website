import React, { useState } from "react";

const MenstrualDataForm = ({ onSubmit }) => {
  const [cycleLength, setCycleLength] = useState("");
  const [periodLength, setPeriodLength] = useState("");
  const [lastPeriodDate, setLastPeriodDate] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!cycleLength || !periodLength || !lastPeriodDate) {
      alert("Please fill in all fields.");
      return;
    }

    // form data
    const formData = {
      cycle_length: parseInt(cycleLength),
      period_length: parseInt(periodLength),
      last_period_date: lastPeriodDate,
    };

    onSubmit(formData); 
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-[rgba(255,182,193,0.3)] p-6 rounded-lg shadow-lg w-full sm:w-96">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="cycleLength" className="text-sm font-bold text-[#8d0e32]">
              Cycle Length (28-30 days):
            </label>
            <input
              type="number"
              id="cycleLength"
              value={cycleLength}
              onChange={(e) => setCycleLength(e.target.value)}
              min="28"
              max="30"
              required
              className="w-full p-2 border border-[#8d0e32] rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="periodLength" className="text-sm font-bold text-[#8d0e32]">
              Period Length (days):
            </label>
            <input
              type="number"
              id="periodLength"
              value={periodLength}
              onChange={(e) => setPeriodLength(e.target.value)}
              required
              className="w-full p-2 border border-[#8d0e32] rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastPeriodDate" className="text-sm font-bold text-[#8d0e32]">
              Last Period Date:
            </label>
            <input
              type="date"
              id="lastPeriodDate"
              value={lastPeriodDate}
              onChange={(e) => setLastPeriodDate(e.target.value)}
              required
              className="w-full p-2 border border-[#8d0e32] rounded"
            />
          </div>
          <button
            type="submit"
            className="bg-[#d5294d] text-white p-2 rounded w-full hover:bg-red-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default MenstrualDataForm;
