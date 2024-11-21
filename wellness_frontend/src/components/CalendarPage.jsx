import React, { useState } from "react";
import MenstrualDataForm from "./MenstrualDataForm"; 
import CycleCalendar from "./CycleCalendar"; 
import { Button } from "react-bootstrap"; 

function CalendarPage (){
  const [isFormOpen, setIsFormOpen] = useState(false); 
  const [calendarData, setCalendarData] = useState(null); 

  // Handles form submission and sends the data to backend
  const handleFormSubmit = async (formData) => {
    const response = await fetch('http://127.0.0.1:8000/api/phasescalendar/posted_data/', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = await response.json();
      setCalendarData(data); 
      setIsFormOpen(false); 
    } else {
      alert("Error submitting data");
    }
  };

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        {/* Button to toggle form visibility */}
        {!calendarData && (
          <Button onClick={() => setIsFormOpen(!isFormOpen)}>
            {isFormOpen ? "Cancel" : "Enter Your Details"}
          </Button>
        )}
      </div>

      {/* Show form when it's open */}
      {isFormOpen && (
        <MenstrualDataForm onSubmit={handleFormSubmit} />
      )}

      {/* Display the calendar once the form is submitted */}
      {calendarData && <CycleCalendar data={calendarData} />}
    </div>
  );
};

export default CalendarPage;
