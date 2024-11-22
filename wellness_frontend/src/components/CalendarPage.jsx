import React, { useState } from "react";
import axios from "axios";
import MenstrualDataForm from "./MenstrualDataForm"; 
import CycleCalendar from "./CycleCalendar"; 
import { Button } from "react-bootstrap"; 

function CalendarPage() {
  const [isFormOpen, setIsFormOpen] = useState(false); 

  // Handles form submission and sends the data to backend
  const handleFormSubmit = async (formData) => { 
    console.log('Form Data:', formData);

  
    let data = formData
  
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://127.0.0.1:8000/api/calendar/current_phase/',
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${localStorage.getItem("access")}`
      },
      data : data
    };
    
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
    

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        {/* Button to toggle form visibility */}
        {!isFormOpen && (
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
      <CycleCalendar /> 
    </div>
  );
};
};
export default CalendarPage;