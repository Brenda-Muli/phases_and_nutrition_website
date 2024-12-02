import React, {useState} from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import BlogFeatured from "./BlogFeatured";

function Home() {
  const [openFAQ, setOpenFAQ] = useState(null);
  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);};
  return (
    <>
      <motion.section
        style={{
          backgroundImage: "url('/photos/banner.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
       
          
        className="relative flex items-start justify-start p-8 bg-white "
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        
        <div className="w-full max-w-2xl pt-9 ml-1">
          <h2 className="text-5xl font-semibold text-left mb-4 text-[#801b40] font-playfair ">
            Wellness in <span className="text-[#b21e4b]">Phases</span>
          </h2>
          <p className="text-lg mt-2 text-left text-[#801b40] ">
          Hey There! Understanding your menstrual cycle is essential for feeling your best, and we’re here to make it simple and straightforward for you. Our goal is to provide you with clear, accessible information so you can manage your menstrual health with confidence. 
          </p>
        </div>
      </motion.section>
      <br/>

      {/* Menstrual Cycle Section with Motion */}
      <motion.section
        className=""
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
      <h2 className="text-3xl font-semibold text-center text-[#951c45] mb-8 font-playfair">
          Menstrual Cycle Phases
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
              to="https://wellness-frontend.onrender.com/phases/menstrual/"
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
              to="https://wellness-frontend.onrender.com/phases/follicular/"
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
              to="https://wellness-frontend.onrender.com/phases/ovulatory/"
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
              to="https://wellness-frontend.onrender.com/phases/luteal/"
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

      {/* Blog Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <BlogFeatured />
      </motion.section>
      <br/>
      {/* FAQ Section with Motion */}
      <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      <h4 className="text-2xl font-semibold text-[#b21e4b]">FAQs</h4>

      <section className="flex flex-col md:flex-row items-center justify-between p-6 space-y-6 md:space-y-0">
        {/* Left Side */}
        <motion.div
          className="w-full md:w-1/2 space-y-4"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <p className="text-5xl text-[#951c45] font-playfair">Menstrual cycle <span className="text-4xl text-[#b21e4b]"> FAQs</span> </p>
          <p className="text-md text-[#411020]">
            Find answers to common questions about the phases of the menstrual cycle.
          </p>
        </motion.div>

        {/* Right Side */}
        <motion.div
          className="w-full md:w-1/2 space-y-4 cursor-pointer mb-4"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.4, duration: 0.5 }}
          
          
        >
          {/* FAQ 1 */}
          <motion.div
            className="pb-4 "
            whileHover={{ scale: 1.05 }}
            onClick={() => toggleFAQ(1)} 
          >
            <p className="font-semibold text-lg text-[#470a1f] bg-gradient-to-r from-[#fde6e9] to-[#fbd0d9] pb-4 rounded-md pl-4 pt-2 "> What is a normal menstrual cycle, and how can I track it?</p>
            <motion.p
              className="text-md text-[#801b40]" 
              initial={{ opacity: 0 }}
              animate={{
                opacity: openFAQ === 1 ? 1 : 0,
                height: openFAQ === 1 ? "auto" : 0, 
              }}
              transition={{ duration: 0.3 }}
            >
              A normal menstrual cycle lasts between 21 to 35 days, with periods typically lasting 3 to 7 days. To track it, mark the start and end of your period using a menstrual calendar, an app, or a simple notebook. This can help predict future periods and recognize irregularities in your cycle.
            </motion.p>
          </motion.div>

          {/* FAQ 2 */}
          <motion.div
            className="pb-4"
            whileHover={{ scale: 1.05 }}
            onClick={() => toggleFAQ(2)} 
          >
            <p className="font-semibold text-lg text-[#470a1f] bg-gradient-to-r from-[#fde6e9] to-[#fbd0d9] pb-4 rounded-md pl-4 pt-2 ">What are the symptoms of PMS, and how can I manage them?</p>
            <motion.p
              className="text-md text-[#801b40]"
              initial={{ opacity: 0 }}
              animate={{
                opacity: openFAQ === 2 ? 1 : 0,
                height: openFAQ === 2 ? "auto" : 0, 
              }}
              transition={{ duration: 0.3 }}
            >
              PMS includes symptoms like bloating, cramps, mood swings, fatigue, and breast tenderness. You can manage PMS by maintaining a balanced diet, exercising regularly, staying hydrated, and using pain relief for cramps. Stress reduction through relaxation techniques can also help ease emotional symptoms.
            </motion.p>
          </motion.div>

          {/* FAQ 3 */}
          <motion.div
            className="pb-4 "
            whileHover={{ scale: 1.05 }}
            onClick={() => toggleFAQ(3)} 
          >
            <p className="font-semibold text-lg text-[#470a1f] bg-gradient-to-r from-[#fde6e9] to-[#fbd0d9] pb-4 rounded-md pl-4 pt-2 ">Why is my period irregular, and is it something to worry about?</p>
            <motion.p
              className="text-md text-[#801b40]"
              initial={{ opacity: 0 }}
              animate={{
                opacity: openFAQ === 3 ? 1 : 0,
                height: openFAQ === 3 ? "auto" : 0, 
              }}
              transition={{ duration: 0.3 }}
            >
              Irregular periods are common, especially during adolescence and perimenopause. Causes include hormonal changes, stress, weight fluctuations, or conditions like PCOS. While irregular periods are often normal, see a doctor if they persist or if you experience extreme pain or other concerning symptoms.
            </motion.p>
          </motion.div>

          {/* FAQ 4 */}
          <motion.div
            className=" pb-4"
            whileHover={{ scale: 1.05 }}
            onClick={() => toggleFAQ(4)} 
          >
            <p className="font-semibold text-lg text-[#470a1f] bg-gradient-to-r from-[#fde6e9] to-[#fbd0d9] pb-4 rounded-md pl-4 pt-2 ">How can I know if something is wrong with my period?</p>
            <motion.p
              className="text-md text-[#801b40]"
              initial={{ opacity: 0 }}
              animate={{
                opacity: openFAQ === 4 ? 1 : 0,
                height: openFAQ === 4 ? "auto" : 0, 
              }}
              transition={{ duration: 0.3 }}
            >
              Signs that something might be wrong include heavy bleeding (soaking through pads or tampons in an hour), missed periods, or severe pain that affects your daily activities. If these symptoms persist or worsen, it's important to consult a healthcare provider.
            </motion.p>
          </motion.div>

          {/* FAQ 5 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={() => toggleFAQ(5)} 
          >
            <p className="font-semibold text-lg text-[#470a1f] bg-gradient-to-r from-[#fde6e9] to-[#fbd0d9] pb-4 rounded-md pl-4 pt-2 ">How does my menstrual cycle affect my health, mood, and energy levels?</p>
            <motion.p
              className="text-md text-[#801b40]"
              initial={{ opacity: 0 }}
              animate={{
                opacity: openFAQ === 5 ? 1 : 0,
                height: openFAQ === 5 ? "auto" : 0, 
              }}
              transition={{ duration: 0.3 }}
            >
              Hormonal fluctuations during your menstrual cycle can affect your mood, energy, and even your skin. Estrogen boosts mood and energy, while progesterone can cause fatigue and irritability, particularly in the days leading up to your period. Maintaining a healthy diet, staying active, and managing stress can help balance these changes.
            </motion.p>
          </motion.div>
        </motion.div>
      </section>
    </motion.section>
    </>
  );
}

export default Home;
