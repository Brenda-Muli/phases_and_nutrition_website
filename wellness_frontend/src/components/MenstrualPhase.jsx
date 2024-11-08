import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

function MenstrualPhase() {
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
    <div style={{ background: 'linear-gradient(#ffe3e4, #fff0f2)' }}>

      {/* Second Section: Circular Image */}
  <h2 className="text-xl font-bold pt-9 text-[#8d0e32]">MENSTRUAL PHASE</h2>
  <br/>
  <motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ duration: 1 }}
  viewport={{ once: false, amount: 0.5 }}
  className="second-section py-8"
  style={{ background: 'linear-gradient(#ffe3e4, #fff0f2)' }}
>
  
  {/* Text Section */}
  <div className="text-section text-right text-[#4f0216]">
    <p className="mt-4 text-md">
      Menstrual Phase is the first phase, which marks the beginning of the cycle and lasts approximately from days 1 to 5.
    </p>
  </div>

  {/* Content Container */}
  <div className="flex items-center justify-between mt-8">
    <div className="image-section flex justify-center items-center">
      <img
        src="/photos/menstrual_phase.JPG"
        alt="Second Section Image"
        className="circular-image max-w-2xl object-cover"
        style={{
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          objectFit: "fill",
        }}
      />
    </div>

    {/* Bullet Points List */}
    <motion.div
      className="text-section text-left mt-8 text-[#4f0216] w-1/2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1 }} 
    >
      <motion.ul className="list-disc ml-5">
        {["Low hormonal and iron levels.","Skin is more drier and prone to inflammation.", "Change in bowels." ]
          .map((point, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -50 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{
                delay: index * 1, 
                duration: 1, 
              }}
              className="text-md mb-8"
                  >
              {point}
            </motion.li>
                ))}
      </motion.ul>
          </motion.div>
        </div>
    </motion.div>


      {/* Third Section (Food Categories) */}
    <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: false, amount: 0.5 }}
        className="third-section py-8"
      >
        <motion.h2
          className="text-center text-6xl font-bold mb-8 text-[#8d0e32] font-dancing"
          initial={{ y: -100 }}
          whileInView={{ y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: false, amount: 0.5 }}
        >
          Food Categories
        </motion.h2>

        <div className="food-categories">
          {phase.food_categories.map((category) => (
            <motion.div
              key={category.id}
              className="category-item flex flex-col mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{
                duration: 1,
                delay: 1,
              }}
              viewport={{ once: false, amount: 0.5 }}
            >
              <div className="w-1/2">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full max-w-md cursor-pointer"
                  onClick={() => setSelectedCategory(category)}
                />
              </div>

              <div className="w-1/2 mt-4 text-center">
                <h3 className="text-2xl font-semibold">{category.name}</h3>
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
              {currentIngredients.map((ingredient) => (
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
              ))}
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


    
      {/* Fourth Section (Image Cards) */}
    <h2 className="text-center text-5xl font-bold mb-8 text-[#8d0e32] font-dancing">Wellness in Menstrual</h2>
    <div className="fourth-section bg-[#ffe3e4] py-12">
      <motion.div
        className="container mx-auto px-4"
        initial={{ x: "100%" }}
        whileInView={{ x: 0 }}
        transition={{
          duration: 1,
          delay: 0.5,
        }}
        viewport={{ once: true }}
      >
        

        {/* Image Cards */}
      <motion.div
          className="flex flex-row justify-start space-x-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            staggerChildren: 2,
            duration: 1,
          }}
        >
          {/* Image 1 */}
          <motion.div
            className="mb-8 w-64"  
            initial={{ opacity: 0 }}
            animate={{ opacity: visibleImages[0] ? 1 : 0 }}
            transition={{
              delay: 2,
            }}
          >
            <img
              src="/photos/serum.jpg"
              alt="Image 1"
              className="w-full object-cover rounded-lg"
            />
            <div className="mt-2 text-center">
              <p className="text-md font-semibold">HYDRATE SKIN</p>
            </div>
          </motion.div>

          {/* Image 2 */}
          <motion.div
            className="mb-8 w-64"  
            initial={{ opacity: 0 }}
            animate={{ opacity: visibleImages[1] ? 1 : 0 }}
            transition={{
              delay: 3,
            }}
          >
            <img
              src="/photos/strech.jpg"
              alt="Image 2"
              className="w-full object-cover rounded-lg"
            />
            <div className="mt-2 text-center">
              <p className="text-md font-semibold">LIGHT STRECH</p>
            </div>
          </motion.div>

          {/* Image 3 */}
          <motion.div
            className="mb-8 w-64"  
            initial={{ opacity: 0 }}
            animate={{ opacity: visibleImages[2] ? 1 : 0 }}
            transition={{
              delay: 3,
            }}
          >
            <img
              src="/photos/cozy.jpg"
              alt="Image 3"
              className="w-full object-cover rounded-lg"
            />
            <div className="mt-2 text-center">
              <p className="text-md font-semibold">REST</p>
            </div>
          </motion.div>

          {/* Image 4 */}
          <motion.div
            className="mb-8 w-64"  
            initial={{ opacity: 0 }}
            animate={{ opacity: visibleImages[2] ? 1 : 0 }}
            transition={{
              delay: 4,
            }}
          >
            <img
              src="/photos/walk.jpg"
              alt="Image 3"
              className="w-full object-cover rounded-lg"
            />
            <div className="mt-2 text-center">
              <p className="text-md font-semibold">LIGHT WALK</p>
            </div>
          </motion.div>
      </motion.div>
    </motion.div>
    </div>
  </div>
  );
};

export default MenstrualPhase;
