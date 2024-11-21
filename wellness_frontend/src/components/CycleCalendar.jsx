import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import MenstrualDataForm from "./MenstrualDataForm"; 

const localizer = momentLocalizer(moment);

function CycleCalendar () {
  const [events, setEvents] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(null); 
  const [currentPhase, setCurrentPhase] = useState(""); 

  useEffect(() => {
    if (formData) {
      const { last_period_date, cycle_length, period_length } = formData;
      const startDate = new Date(last_period_date);
      const generatedEvents = generateCycleEvents(startDate, cycle_length, period_length);
      setEvents(generatedEvents);
    }
  }, [formData]);

  useEffect(() => {
    if (events.length > 0) {
      // Find the current phase based on today's date
      const today = new Date();
      const phase = getCurrentPhase(today, events);
      setCurrentPhase(phase);
    }
  }, [events]);

  // Function to generate events based on the cycle data
  const generateCycleEvents = (startDate, cycleLength, periodLength) => {
    let events = [];
    let currentDate = new Date(startDate);

    for (let i = 0; i < cycleLength; i++) {
      const date = new Date(currentDate);
      let phase = "";

      if (i < periodLength) {
        phase = "Menstrual";
      } else if (i < cycleLength - 14) {
        phase = "Follicular";
      } else if (i < cycleLength - 7) {
        phase = "Ovulatory";
      } else {
        phase = "Luteal";
      }

      events.push({
        title: phase,
        start: new Date(date),
        end: new Date(date),
        allDay: true,
        style: { backgroundColor: getPhaseColor(phase) }, 
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return events;
  };

  
  const getPhaseColor = (phase) => {
    switch (phase) {
      case "Menstrual":
        return "#FF0000"; 
      case "Follicular":
        return "#FF6347"; 
      case "Ovulatory":
        return "#FF1493"; 
      case "Luteal":
        return "#FFB6C1"; 
      default:
        return "#D3D3D3"; 
    }
  };

  // Function to get the current phase based on today's date
  const getCurrentPhase = (date, events) => {
    for (let event of events) {
      if (
        date.getDate() === event.start.getDate() &&
        date.getMonth() === event.start.getMonth() &&
        date.getFullYear() === event.start.getFullYear()
      ) {
        return event.title; 
      }
    }
    return "Unknown"; 
  };

  // Handle month navigation
  const handleNavigate = (date) => {
    setCurrentMonth(date);
  };

  // Handle Back and Next month navigation
  const handleBackMonth = () => {
    setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)));
  };

  // Handle form submission
  const handleFormSubmit = (data) => {
    setFormData(data); 
    setShowForm(false); 
  };

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <button onClick={handleBackMonth}>Back</button>
        <span style={{ margin: '0 20px' }}>
          {moment(currentMonth).format("MMMM YYYY")}
        </span>
        <button onClick={handleNextMonth}>Next</button>
      </div>

      <div>
        <button onClick={() => setShowForm(true)} style={{ padding: "10px" }}>
          Enter Your Details
        </button>
      </div>

      {showForm && (
        <div>
          <MenstrualDataForm onSubmit={handleFormSubmit} />
        </div>
      )}

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        date={currentMonth}
        onNavigate={handleNavigate}
      />

      <div style={{ marginTop: "20px", fontSize: "18px", fontWeight: "bold" }}>
        <p>You are currently at the {currentPhase} phase.</p>
      </div>
    </div>
  );
};

export default CycleCalendar;
