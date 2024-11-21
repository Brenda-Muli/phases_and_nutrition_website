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
    <form onSubmit={handleSubmit}>
      <div>
        <label>Cycle Length (28-30 days):</label>
        <input
          type="number"
          value={cycleLength}
          onChange={(e) => setCycleLength(e.target.value)}
          min="28"
          max="30"
          required
        />
      </div>
      <div>
        <label>Period Length (days):</label>
        <input
          type="number"
          value={periodLength}
          onChange={(e) => setPeriodLength(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Last Period Date:</label>
        <input
          type="date"
          value={lastPeriodDate}
          onChange={(e) => setLastPeriodDate(e.target.value)}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default MenstrualDataForm;
