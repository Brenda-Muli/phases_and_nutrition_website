import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

function MenstrualPhase() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [phase, setPhase] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [ingredientsPerPage, setIngredientsPerPage] = useState(3);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [visibleImages, setVisibleImages] = useState([false, false, false]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

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

  const handleIngredientSelect = async (ingredient) => {
    try {
      const response = await axios.post(
        'http://localhost:8000/api/phases/profile/add-ingredient/', 
        { ingredient_id: ingredient.id }, 
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}`
      }}
      );
      setSelectedIngredients((prev) => [...prev, ingredient]);
      alert(`${ingredient.name} added to profile!`);
      
      const updatedResponse = await axios.get(
        'http://localhost:8000/api/phases/profile/ingredients/',
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      
      // Update the selected ingredients in the state
      setSelectedIngredients(updatedResponse.data);
    } catch (error) {
      console.error("Error saving ingredient to profile:", error);
    };
  };

  
  useEffect(() => {
    const fetchSelectedIngredients = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8000/api/phases/profile/ingredients/',
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")} `} }
        );
        setSelectedIngredients(response.data);
      } catch (error) {
        console.error("Error fetching selected ingredients:", error);
      }
    };
  
    fetchSelectedIngredients();
  }, []);

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
    <div className="absolute inset-0 bg-white bg-opacity-20 z-0 "></div>
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
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 1 }}
    viewport={{ once: false, amount: 0.5 }}
    className="third-section py-8"
  >
    <motion.h2
      className="text-left pl-8 text-4xl font-bold mb-8 text-[#8d0e32] font-playfair"
      initial={{ y: -100 }}
      whileInView={{ y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: false, amount: 0.5 }}
    >
      Food Categories
    </motion.h2>
    
    <motion.p
      className="text-justify text-md mb-8 text-[#470a1f] max-w-7xl pl-8"
      initial={{ y: -100 }}
      whileInView={{ y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: false, amount: 0.5 }}
    >
      To replenish nutrients and support your body during your period, aim to include iron-rich foods like leafy greens, beans, and lean meats. Magnesium-rich foods, such as dark chocolate, seeds, and nuts, can also help with muscle relaxation and reduce menstrual discomfort. You can click on any of these foods to learn more about them and add them to your personalized notes for easy reference later. Simply click on an ingredient to save it, and you'll have a handy list of foods to include in your diet.
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
    </motion.div>

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
          <div
            key={ingredient.id}
            className="ingredient-item flex-shrink-0 w-64"
            onClick={() => handleIngredientSelect(ingredient)}
          >
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
          </div>

          
        );
      })}
    </motion.div>
  </div>
  )}
 
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
          {/* Image Section (left) */}
          <motion.div
            className="flex justify-center items-center"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <img
              src="/photos/skin-care.png"
              alt="Menstrual Phase Image"
              className="w-1/2 h-auto object-cover-top"
            />
          </motion.div>

          {/* Text Section (right) */}
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
            During menstruation, there is a drop in estrogen that can lead to a decrease in the skin’s natural moisture retention, leaving it feeling rough, tight, or flaky. To combat these changes, incorporating a hydrating serum, hydrating face masks or rich moisturizers into your skincare routine can be especially helpful. Serums with ingredients like hyaluronic acid, glycerin, or ceramides can provide deep hydration and support the skin’s natural barrier.
            </p>
          </motion.div>
        </motion.div>

      {/* Second row (reversed order) */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12"
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
          During menstruation, the body undergoes various hormonal and physical changes that may cause fatigue, cramps, or discomfort. While intense workouts may feel more challenging, light exercise like yoga, stretching, or low-impact activities can actually be beneficial. If you're feeling tired or uncomfortable, prioritizing rest and hydration is just as valuable for overall well-being during this time.
          </p>
        </motion.div>

        <motion.div
          className="flex justify-center items-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <img
            src="/photos/stretch.jpg"
            alt="Menstrual Phase Image"
            className="w-3/4 h-auto object-cover"
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
            src="/photos/two_section.jpg"
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
            Menstrual <br /> Products
          </h2>
          <p className="mt-4 text-md max-w-xl text-[#470a1f]">
          Choosing the right menstrual products can make a significant difference in comfort and convenience during your period. There are a variety of options available, each with its own benefits depending on personal preference and lifestyle.  When selecting products, it's important to consider factors like absorbency, comfort, and skin sensitivity, as well as whether the product aligns with your environmental values. Finding the right fit can make your period feel more manageable and less stressful.
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  </div>
  );
};

export default MenstrualPhase;
