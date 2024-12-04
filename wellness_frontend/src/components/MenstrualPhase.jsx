import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { AiFillHeart } from 'react-icons/ai';
import Alert from './Alert';

function MenstrualPhase() {
  const { slug } = useParams();
  const [phase, setPhase] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [ingredientsPerPage, setIngredientsPerPage] = useState(3);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [visibleImages, setVisibleImages] = useState([false, false, false]);
  const [alertMessage, setAlertMessage] = useState(null);

  // Fetching phase details
  useEffect(() => {
    const fetchPhaseDetails = async () => {
      try {
        console.log("Fetching phase details...");
        const response = await axios.get(`https://wellness-backend-fetu.onrender.com/api/meal/phases/${slug}/`);
        setPhase(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching phase details:", err);
        setError('Error fetching phase details.');
        setLoading(false);
      }
    };

    fetchPhaseDetails();
  }, [slug]);

  // Handle image visibility toggle every 3 seconds
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

  // Liking an ingredient function
  const likeIngredient = async (ingredientId, ingredientName) => {
    try {
      // Directly use the token in the request headers
      const response = await axios.post(
        `https://wellness-backend-fetu.onrender.com/api/phases/profile/`,
        { ingredient_id: ingredientId },
        { headers: { Authorization: `Bearer ${localStorage.getItem("access")}` } }
      );

      // Handle the success response
      setAlertMessage(`${ingredientName} added to profile!`);
      setTimeout(handleAlertClose, 3000); // Close the alert after 3 seconds
    } catch (error) {
      console.error("Error liking ingredient:", error);
      setAlertMessage("Failed to add ingredient to profile.");
    }
  };

  const handleAlertClose = () => {
    setAlertMessage(null);
  };

  // Loading and error handling
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Pagination logic for ingredients
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
    <div className="absolute inset-0 bg-white bg-opacity-20 "></div>
    <h2 className="text-4xl font-bold pt-9 text-[#8d0e32] font-playfair text-center  relative z-10">
      Menstrual Phase
    </h2>
    <br />

  
    <motion.p
      className="mt-4 text-lg max-w-7xl text-[#470a1f] text-center pl-8 relative z-10 font-semibold"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 0.5 }
    }  
    >
      Menstrual Phase is the beginning of the menstrual cycle, lasting typically between 3 to 7 days. During this phase, the uterine lining sheds, which can lead to symptoms like fatigues, cramps and mood shifts. This phase is a time when the body requires gentle support through rest and targeted nutrition to span replenish lost nutrients and manage discomfort. 
    </motion.p>
  </motion.div>
  <br/> <br/>
  

    {/* Food Categories */}
  <div className="third-section py-8">
      <motion.h2
        className="text-left text-4xl font-bold mb-8 text-[#8d0e32] font-playfair"
        initial={{ y: -100 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: false, amount: 0.5 }}
      >
        Food Categories
      </motion.h2>
      
      <motion.p
        className="text-left text-md mb-8 text-[#470a1f] max-w-7xl"
        initial={{ y: -100 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: false, amount: 0.5 }}
      >
        To replenish nutrients and support your body during your period, aim to include iron-rich foods like leafy greens, beans, and lean meats. Magnesium-rich foods, such as dark chocolate, seeds, and nuts, can also help with muscle relaxation and reduce menstrual discomfort. 
      </motion.p>

      <div className="food-categories flex flex-wrap justify-start space-x-6">
        {phase.food_categories.map((category) => (
          <motion.div
            key={category.id}
            className="category-item flex flex-col items-center mb-8 w-32 hover:shadow-lg transition-shadow duration-300"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{
              duration: 1,
              delay: 1,
            }}
            viewport={{ once: false, amount: 0.5 }}
            style={{
              boxShadow: '0 4px 6px rgba(178, 30, 75, 0.3)',  
            }}
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
                <div key={ingredient.id} className="ingredient-item flex-shrink-0 w-64 relative">
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

                  {/* Heart Icon with hover effect */}
                  <div className="relative mt-2 flex justify-center">
                    <AiFillHeart
                      size={24}
                      className="cursor-pointer text-red-500 hover:text-red-700 transition-colors"
                      onClick={() => likeIngredient(ingredient.id, ingredient.name)}
                    />
                    {/* Tooltip on hover */}
                    <span className="absolute bottom-8 text-sm bg-white text-[#8d0e32] p-1 rounded opacity-0 transition-opacity hover:opacity-100">
                      Like to add to profile
                    </span>
                  </div>
                </div>
              );
            })}
          </motion.div>

          {/* Pagination */}
          <div className="ingredient-nav flex justify-between items-center my-4">
            <button
              onClick={prevPage}
              disabled={currentPage === 0}
              className="text-white bg-[#fbd0d9] hover:bg-[#fde6e9] rounded px-4 py-2 disabled:opacity-50"
            >
              &lt;
            </button>
            <span className="text-white">
              Page {currentPage + 1} of {totalPages}
            </span>
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages - 1}
              className="text-white bg-[#fbd0d9] hover:bg-[#fde6e9] rounded px-4 py-2 disabled:opacity-50"
            >
              &gt;
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

      {/* Display Alert if there's a message */}
      {alertMessage && (
        <Alert message={alertMessage} onClose={handleAlertClose} />
      )}
    </div>

      {/* Content Container */}
      <div className="flex items-center justify-between mt-8">
        <div className="image-section flex justify-start items-center">
        </div>
      </div>

  <div className="py-8">
  {/* First row */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8" >
    {/* Image Section (left) */}
    <div className="flex justify-start items-center">
      <img
        src="/photos/skin-care.png"
        alt="Menstrual Phase Image"
        className="w-2/3 h-2/3 object-cover-top"
      />
    </div>

    {/* Text Section (right) */}
    <div className="flex flex-col justify-center">
      <h2 className="text-5xl font-bold pt-9 text-[#8d0e32] font-playfair">
        Skin Care
      </h2>
      <p className="mt-4 text-md max-w-xl text-[#470a1f]">
        During menstruation, there is a drop in estrogen that can lead to a decrease in the skin’s natural moisture retention, leaving it feeling rough, tight, or flaky. To combat these changes, incorporating a hydrating serum, hydrating face masks or rich moisturizers into your skincare routine can be especially helpful. Serums with ingredients like hyaluronic acid, glycerin, or ceramides can provide deep hydration and support the skin’s natural barrier.
      </p>
    </div>
  </div>

  {/* Second row (reversed order) */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
    <div className="flex flex-col justify-center">
      <h2 className="text-5xl font-bold pt-9 text-[#8d0e32] font-playfair">
        Workouts<br /> 
      </h2>
      <p className="mt-4 text-md max-w-xl text-[#470a1f]">
        During menstruation, the body undergoes various hormonal and physical changes that may cause fatigue, cramps, or discomfort. While intense workouts may feel more challenging, light exercise like yoga, stretching, or low-impact activities can actually be beneficial. If you're feeling tired or uncomfortable, prioritizing rest and hydration is just as valuable for overall well-being during this time.
      </p>
    </div>

    <div className="flex justify-start items-center">
      <img
        src="/photos/stretch.jpg"
        alt="Menstrual Phase Image"
        className="w-3/4 h-auto object-cover"
      />
    </div>
  </div>

  {/* Third row */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
    <div className="flex justify-start items-center">
      <img
        src="/photos/two_section.jpg"
        alt="Menstrual Phase Image"
        className="w-3/4 h-auto object-cover-top"
      />
    </div>

    <div className="flex flex-col justify-center">
      <h2 className="text-5xl font-bold pt-9 text-[#8d0e32] font-playfair">
        Menstrual <br /> Products
      </h2>
      <p className="mt-4 text-md max-w-xl text-[#470a1f]">
        Choosing the right menstrual products can make a significant difference in comfort and convenience during your period. There are a variety of options available, each with its own benefits depending on personal preference and lifestyle. When selecting products, it's important to consider factors like absorbency, comfort, and skin sensitivity, as well as whether the product aligns with your environmental values. Finding the right fit can make your period feel more manageable and less stressful.
      </p>
    </div>
  </div>
</div>
</div>
  );
};

export default MenstrualPhase;
