import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import MenstrualDataForm from "./MenstrualDataForm";

const localizer = momentLocalizer(moment);

function CycleCalendar() {
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
      const today = new Date();
      const phase = getCurrentPhase(today, events);
      setCurrentPhase(phase);
    }
  }, [events]);

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
        return "#a22e4f";
      case "Follicular":
        return "#c13d60";
      case "Ovulatory":
        return "#e58799";
      case "Luteal":
        return "#f6d5da";
      default:
        return "#D3D3D3";
    }
  };

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

  const handleNavigate = (date) => {
    setCurrentMonth(date);
  };

  const handleFormSubmit = (data) => {
    setFormData(data);
    setShowForm(false);
  };

  return (
  <div style={{
    paddingTop: "2rem", 
  }}>
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f9f9f9",
        paddingTop: "6rem",
        
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          padding: "20px",
          width: "80%",
          maxWidth: "800px",
        }}
      >
        <h2 style={{ textAlign: "center", color: "#8d0e32", marginBottom: "20px" }}>
          Menstrual Cycle Calendar
        </h2>
        <div style={{ marginBottom: "20px", textAlign: "center" }}>
        </div>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <button
            onClick={() => setShowForm(true)}
            style={{
              padding: "10px 20px",
              backgroundColor: "#8d0e32",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
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
          style={{
            height: 350,
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            padding: "10px",
          }}
          date={currentMonth}
          onNavigate={handleNavigate}
          eventPropGetter={(event) => ({
            style: {
              backgroundColor: getPhaseColor(event.title),
              color: "#fff",
              borderRadius: "4px",
              border: "none",
            },
          })}
        />
        <div style={{ marginTop: "20px", textAlign: "center", fontSize: "18px", fontWeight: "bold" }} >
          <p className = "text-[#8d0e32]" >You are currently at the {currentPhase} phase.</p>
        </div>
      </div>
    </div>
  </div>
  );
}

export default CycleCalendar;
