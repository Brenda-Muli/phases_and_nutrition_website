import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

function FollicularPhase() {
  const { slug } = useParams();
  const [phase, setPhase] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [ingredientsPerPage, setIngredientsPerPage] = useState(3);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [visibleImages, setVisibleImages] = useState([false, false, false]);

  useEffect(() => {
    const fetchPhaseDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/meal/phases/${slug}/`);
        setPhase(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching phase details.');
        setLoading(false);
      }
    };

    fetchPhaseDetails();
  }, [slug]);

  // triggering the image visibility in the fourth section 
  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleImages((prev) => {
        const next = [...prev];
        const firstHiddenIndex = next.indexOf(false);
        if (firstHiddenIndex !== -1) {
          next[firstHiddenIndex] = true;
        }
        return next;
      });
    }, 3000); 

    return () => clearInterval(interval);
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const startIndex = currentPage * ingredientsPerPage;
  const endIndex = startIndex + ingredientsPerPage;
  const currentIngredients = selectedCategory
    ? selectedCategory.ingredients.slice(startIndex, endIndex)
    : [];
  const totalPages = selectedCategory
    ? Math.ceil(selectedCategory.ingredients.length / ingredientsPerPage)
    : 0;

  const nextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  return (
    <div className = "ml-1">
  
{/* Container for heading and paragraph for joint animation */}
  <motion.div
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 1 }}
    className="relative bg-cover bg-center p-10"
    style={{
      backgroundImage: "url('/photos/phases_image.JPG')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      padding: '40px 20px',
   
    }}
  >
    <div className="absolute inset-0 bg-white bg-opacity-70 z-0 "></div>
    <h2 className="text-4xl font-bold pt-9 text-[#8d0e32] font-playfair text-center  relative z-10">
      Follicular Phase
    </h2>
    <br />

  
    <motion.p
      className="mt-4 text-lg max-w-6xl text-[#470a1f] text-center relative pl-16 z-10 font-semibold"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 0.5 }
    }  
    >
     The follicular phase marks the start of your cycle after menstruation, typically lasting from day 1 to around day 14. Energy levels tend to rise, and you may feel more motivated and focused. This phase is an ideal time to engage in more active workouts and nourish your body with foods that support hormone production, boost energy, and promote cellular repair.
    </motion.p>
  </motion.div>
  <br/> <br/>
  

{/* Food Categories */}
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 1 }}
    viewport={{ once: false, amount: 0.5 }}
    className="third-section py-8"
  >
    <motion.h2
      className="text-center text-4xl font-bold mb-8 text-[#8d0e32] font-playfair"
      initial={{ y: -100 }}
      whileInView={{ y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: false, amount: 0.5 }}
    >
      Food Categories
    </motion.h2>
    
    <motion.p
      className="text-center text-md mb-8 text-[#470a1f] max-w-7xl pl-8"
      initial={{ y: -100 }}
      whileInView={{ y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: false, amount: 0.5 }}
    >
      This is a time when energy levels typically rise, so focus on replenishing nutrients to support your body’s increased activity and metabolic needs. Include protein-rich foods like eggs, lean meats, and legumes to help build muscle and support cell repair. It's also an excellent time to include antioxidant-rich fruits and vegetables, such as berries, leafy greens,  to combat oxidative stress and promote hormonal balance. You can click on any of these foods to learn more about them and add them to your personalized notes for easy reference later. Simply click on an ingredient to save it, and you'll have a handy list of foods to include in your diet.

    </motion.p>

    <div className="food-categories flex flex-wrap justify-start space-x-6">
      {phase.food_categories.map((category) => (
        <motion.div
          key={category.id}
          className="category-item flex flex-col items-center
            mb-8 w-32"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{
            duration: 1,
            delay: 1,
          }}
          viewport={{ once: false, amount: 0.5 }}
        >
          <div className="max-w-full">
            <img
              src={category.image}
              alt={category.name}
              className="w-24 h-24 object-cover rounded-full cursor-pointer"
              onClick={() => setSelectedCategory(category)}
            />
          </div>

          <div className="w-1/2 mt-4 text-center text-small">
            <h3 className="text-xs font-semibold">{category.name}</h3>
          </div>
        </motion.div>
      ))}
    </div>

{/* Show Ingredients and Pagination if Category is Selected */}
    {selectedCategory && (
      <div className="ingredient-slider">
        <motion.div
          className="ingredients flex overflow-x-auto space-x-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: false, amount: 0.5 }}
        >
          {currentIngredients.map((ingredientData) => {
            const ingredient = ingredientData.ingredient; 
            return (
              <div key={ingredient.id} className="ingredient-item flex-shrink-0 w-64">
                <h4 className="text-lg font-semibold">{ingredient.name}</h4>
                <motion.img
                  src={ingredient.image}
                  alt={ingredient.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-48 object-cover rounded-lg mb-2"
                />
                <p>{ingredient.description}</p> 
                <div className="radio-button flex items-center mt-2">
                  <input
                    type="radio"
                    name="ingredientNote"
                    id={`ingredient-${ingredient.id}`}
                    className="mr-2"
                    onChange={() => alert(`${ingredient.name} added to notes!`)}
                  />
                  <label htmlFor={`ingredient-${ingredient.id}`} className="text-white">
                    Add to Notes
                  </label>
                </div>
              </div>
            );
          })}

    </motion.div>

      <div className="ingredient-nav flex justify-between items-center my-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 0}
          className="text-white bg-gray-800 hover:bg-gray-700 rounded px-4 py-2 disabled:opacity-50"
        >
          &lt;&gt;
        </button>
        <span className="text-white">
          Page {currentPage + 1} of {totalPages}
        </span>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages - 1}
          className="text-white bg-gray-800 hover:bg-gray-700 rounded px-4 py-2 disabled:opacity-50"
        >
          &lt;&gt;
        </button>
      </div>

      <div className="radio-buttons flex justify-center space-x-2">
        {Array.from({ length: totalPages }).map((_, index) => (
          <label key={index} className="text-white">
            <input
              type="radio"
              name="ingredientPage"
              checked={currentPage === index}
              onChange={() => setCurrentPage(index)}
              className="mr-1"
            />
            {index + 1}
          </label>
        ))}
      </div>
    </div>
      )}
      </motion.div>

      {/* Content Container */}
  <div className="flex items-center justify-between mt-8">
    <motion.div
      className="image-section flex justify-center items-center"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 1 }}
      
    >
    </motion.div>
  </div>


    <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: false, amount: 0.5 }}
        className="py-8"
      >
        {/* First row */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >

          <motion.div
            className="flex justify-center items-center"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <img
              src="/photos/productivity_foll.jpg"
              alt="Menstrual Phase Image"
              className="w-1/2 h-auto object-cover-top"
            />
          </motion.div>

          <motion.div
            className="flex flex-col justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            
          >
            <h2 className="text-5xl font-bold pt-9 text-[#8d0e32] font-playfair">
              Productivity
            </h2>
            <p className="mt-4 text-md max-w-xl text-[#470a1f]">
            During the follicular phase, estrogen levels begin to rise, leading to increased energy, mental clarity, and focus. This makes it an ideal time to start new projects, plan ahead, or dive into creative activities. Whether it's brainstorming ideas, strategizing, or learning something new, your ability to tackle tasks that require mental sharpness and enthusiasm is at its peak. Take advantage of this phase to set the tone for the rest of your cycle by being productive and proactive.
            </p>
          </motion.div>
        </motion.div>

      {/* Second row */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <motion.div
          className="flex flex-col justify-center"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-5xl font-bold pt-9 text-[#8d0e32] font-playfair">
            Workouts<br /> 
          </h2>
          <p className="mt-4 text-md max-w-xl text-[#470a1f]">
          The follicular phase is when your body has the most energy, and it's an excellent time to engage in more intense physical activities. Weightlifting and strength training can help build muscle and increase endurance, while jogging or hiking outdoors allows you to tap into your natural vitality. The rising energy levels also make it easier to push through challenging workouts, so focus on activities that build strength, stamina, and overall fitness.
          </p>
        </motion.div>

        <motion.div
          className="flex justify-center items-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <img
            src="/photos/workout_foll.jpg"
            alt="Menstrual Phase Image"
            className="w-1/2 h-1/2 object-cover"
          />
    </motion.div>
    </motion.div>

      {/* Third row */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="flex justify-center items-center"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <img
            src="/photos/skin_foll.jpg"
            alt="Menstrual Phase Image"
            className="w-3/4 h-auto object-cover-top"
          />
      </motion.div>

      <motion.div
          className="flex flex-col justify-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          
        >
          <h2 className="text-5xl font-bold pt-9 text-[#8d0e32] font-playfair">
            Skin Care
          </h2>
          <p className="mt-4 text-md max-w-xl text-[#470a1f]">
          As your energy picks up in this phase, it’s a great time to focus on your skin's natural renewal. Exfoliating your skin with gentle scrubs or chemical exfoliants can help shed dead skin cells, revealing smoother and more radiant skin. Adding antioxidant serums or vitamin C serums to your routine can protect your skin from environmental damage and promote cell regeneration, supporting your skin's health as it recovers from the previous phase.
          </p>
      </motion.div>
      </motion.div>
    </motion.div>
  </div>
  );
};

export default FollicularPhase;
