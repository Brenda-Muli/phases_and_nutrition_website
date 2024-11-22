import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import MenstrualDataForm from './MenstrualDataForm';
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";
import axios from "axios";

const localizer = momentLocalizer(moment);

function CycleCalendar() {
  const [events, setEvents] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [currentPhase, setCurrentPhase] = useState("");
  const [showForm, setShowForm] = useState(false); 

  // Fetch data from backend on mount
  useEffect(() => {
    const fetchCalendarData = async () => {
      try {
        const response = await axios.get(
          'http://127.0.0.1:8000/api/calendar/current_phase/', 
          { 
            headers: { 
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            } 
          }
        );
        if (response.status === 200) {
          const data = response.data;
          setEvents(data.cycle_events || []); // Set cycle events
          setCurrentPhase(data.current_phase || ""); // Set current phase
        }
        else
        {console.error("Unexpected response", response.status)}
      } catch (error) {
        console.error("Error fetching calendar data:", error);
      }
    };

    fetchCalendarData();
  }, []); // Empty dependency array to run once on mount

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

  const handleFormSubmit = (formData) => {
    console.log(formData);
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
        <button
          onClick={() => setShowForm(true)} // Toggle form visibility
          className="pt-8 text-2xl font-semibold text-center text-[#951c45] mb-8 font-playfair bg-[#e58799] p-1 hover:bg-[#fbe8eb]"
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
        style={{ height: 350 }}
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
      <div className="text-2xl font-semibold text-center text-[#951c45] mb-8 font-playfair">
        <p>You are currently at the {currentPhase} phase.</p>
      </div>

      {/* Menstrual Cycle Section with Motion */}
      <motion.section
        className=""
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h2 className="text-3xl font-semibold text-center text-[#951c45] mb-8 font-playfair">
          Learn more about the phase you are in
        </h2>

        {/* Image Cards Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Link
              to="http://localhost:5173/phases/menstrual/"
              className="flex flex-col items-center justify-center bg-transparent rounded-lg overflow-hidden "
            >
              <img
                src="/photos/menstrual_phase.JPG"
                alt="Menstrual"
                className="w-32 h-32 object-cover rounded-full mx-auto mt-4"
                style={{ objectPosition: "80% 80%" }}
              />
              <div className="p-4">
                <h3 className="text-md font-semibold text-center text-[#470a1f]">
                  MENSTRUAL PHASE
                </h3>
              </div>
            </Link>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Link
              to="http://localhost:5173/phases/follicular/"
              className="flex flex-col items-center justify-center bg-transparent rounded-lg overflow-hidden "
            >
              <img
                src="/photos/follicular_phase.JPG"
                alt="Follicular"
                className="w-32 h-32 object-cover rounded-full mx-auto mt-4"
                style={{ objectPosition: "90% 80%" }}
              />
              <div className="p-4">
                <h3 className="text-md font-semibold text-center text-[#470a1f]">
                  FOLLICULAR PHASE
                </h3>
              </div>
            </Link>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Link
              to="http://localhost:5173/phases/ovulatory/"
              className="flex flex-col items-center justify-center bg-transparent rounded-lg overflow-hidden "
            >
              <img
                src="/photos/ovulation_phase.JPG"
                alt="Ovulatory"
                className="w-32 h-32 object-cover rounded-full mx-auto mt-4"
                style={{ objectPosition: "90% 90%" }}
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-center text-[#470a1f]">
                  OVULATORY PHASE
                </h3>
              </div>
            </Link>
          </motion.div>

          {/* Card 4 */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <Link
              to="http://localhost:5173/phases/luteal/"
              className="flex flex-col items-center justify-center bg-transparent rounded-lg overflow-hidden last:border-r-0"
            >
              <img
                src="/photos/luteal_phase.JPG"
                alt="Luteal"
                className="w-32 h-32 object-cover rounded-full mx-auto mt-4"
                style={{ objectPosition: "90% 90%" }}
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-center text-[#470a1f]">
                  LUTEAL PHASE
                </h3>
              </div>
            </Link>
          </motion.div>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default CycleCalendar;
