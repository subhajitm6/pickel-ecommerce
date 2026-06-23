import { motion } from 'framer-motion';
import riceImg from '../../assets/images/serving_rice.png';
import sandwichImg from '../../assets/images/serving_sandwich.png';
import parathaImg from '../../assets/images/serving_paratha.png';
import bowlImg from '../../assets/images/serving_bowl.png';

const recipes = [
  { name: 'Pickle with Rice', desc: 'The classic comfort food.', color: 'bg-mango/20', image: riceImg },
  { name: 'Pickle Sandwich', desc: 'A tangy twist to your lunch.', color: 'bg-lime/20', image: sandwichImg },
  { name: 'Pickle Paratha', desc: 'Spicy, flaky, and delicious.', color: 'bg-chili/20', image: parathaImg },
  { name: 'Pickle Bowl', desc: 'Healthy with a punch of flavor.', color: 'bg-pickle/20', image: bowlImg },
];

export function Recipes() {
  return (
    <section className="py-32 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black text-brown mb-6">Serving Ideas</h2>
          <p className="text-xl text-brown/70 font-medium">Elevate your everyday meals.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {recipes.map((recipe, i) => (
            <motion.div
              key={recipe.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className={`${recipe.color} rounded-[2rem] p-6 cursor-pointer group`}
            >
              <div className="h-48 rounded-3xl bg-white/40 mb-6 group-hover:bg-white/60 transition-colors flex items-center justify-center shadow-inner overflow-hidden relative">
                <img src={recipe.image} alt={recipe.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
              <h3 className="text-xl font-black text-brown mb-2">{recipe.name}</h3>
              <p className="text-brown/70 font-medium">{recipe.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
