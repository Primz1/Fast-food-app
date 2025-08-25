// data.ts
const dummyData = {
  categories: [
    { name: "Swallows", description: "Starchy staples like Fufu, Ugali, Eba, and Pounded Yam" },
    { name: "Rice Dishes", description: "Classic rice meals like Jollof, Ofada, Fried Rice, and Coconut Rice" },
    { name: "Street Food & Snacks", description: "Popular Nigerian snacks and quick bites (Akara, Puff Puff, Boli, etc.)" },
    { name: "Grilled & Roasted", description: "Delicious roasted and grilled meats, fish, and skewers" },
    { name: "Soups & Stews", description: "Rich and spicy African soups and stews" },
    { name: "Staples", description: "Everyday Nigerian staples like beans, porridge, and hearty meals" }
  ],

  customizations: [
  // Soups
  { name: "Egusi Soup", price: 5, type: "base" },
  { name: "Ogbono Soup", price: 5, type: "base" },
  { name: "Ewedu Soup", price: 5, type: "base" },
  { name: "Gbegiri Soup", price: 5, type: "base" },

  // Swallows -> use 'bread'
  { name: "Pounded Yam", price: 5, type: "bread" },
  { name: "Amala", price: 5, type: "bread" },
  { name: "Eba", price: 5, type: "bread" },
  { name: "Fufu", price: 5, type: "bread" },

  // Proteins -> use 'spice' (or 'base')
  { name: "Beef", price: 2, type: "spice" },
  { name: "Goat Meat", price: 3, type: "spice" },
  { name: "Chicken", price: 2, type: "spice" },
  { name: "Fish", price: 2, type: "spice" },

  // Sides
  { name: "Dodo (Fried Plantain)", price: 2, type: "side" },
  { name: "Moi Moi", price: 2, type: "side" },

  // Breakfast extras
  { name: "Pap (Akamu)", price: 5, type: "base" },
  { name: "Bread", price: 2, type: "bread" },
  { name: "Sardine", price: 2, type: "spice" },
  { name: "Sugar", price: 2, type: "topping" },
  { name: "Chili Sauce", price: 2, type: "sauce" },
],

 menu: [
    {
      name: "Pounded Yam",
      description: "Smooth yam swallow best paired with rich Nigerian soups.",
      image_url: "https://github.com/Primz1/african-food-images/blob/main/pounded-yam.png?raw=true",
      price: 7,
      rating: 4.8,
      calories: 400,
      protein: 6,
      category_name: "Swallows",
      customizations: ["Egusi Soup", "Ogbono Soup", "Oha Soup", "Afang Soup", "Efo Riro"]
    },
    {
      name: "Amala",
      description: "Dark yam flour swallow native to Yoruba cuisine.",
      image_url: "https://github.com/Primz1/african-food-images/blob/main/amala.jpg?raw=true",
      price: 7,
      rating: 4.7,
      calories: 390,
      protein: 5,
      category_name: "Swallows",
      customizations: ["Gbegiri", "Ewedu", "Egusi Soup", "Ogbono Soup"]
    },
    {
      name: "Eba (Garri)",
      description: "Popular cassava swallow served with a variety of soups.",
      image_url: "https://github.com/Primz1/african-food-images/blob/main/eba.jpg?raw=true",
      price: 6,
      rating: 4.6,
      calories: 380,
      protein: 4,
      category_name: "Swallows",
      customizations: ["Egusi Soup", "Afang Soup", "Okra Soup", "Bitterleaf Soup"]
    },
    {
      name: "Fufu (Cassava)",
      description: "Sticky fermented cassava swallow, common in Southern Nigeria.",
      image_url: "https://github.com/Primz1/african-food-images/blob/main/fufu.jpg?raw=true",
      price: 7,
      rating: 4.6,
      calories: 410,
      protein: 4,
      category_name: "Swallows",
      customizations: ["Banga Soup", "Ogbono Soup", "Okra Soup", "Light Soup"]
    },

    // RICE DISHES
    {
      name: "Jollof Rice with Chicken",
      description: "Spicy tomato-based rice served with grilled or fried chicken.",
      image_url: "https://github.com/Primz1/african-food-images/blob/main/jollof-rice.jpg?raw=true",
      price: 13,
      rating: 4.9,
      calories: 600,
      protein: 24,
      category_name: "Rice Dishes",
      customizations: ["Fried Plantains", "Moi Moi", "Beef"]
    },
    {
      name: "Ofada Rice & Ayamase",
      description: "Local brown rice with spicy green pepper stew and assorted meat.",
      image_url: "https://github.com/Primz1/african-food-images/blob/main/ofada-rice.jpg?raw=true",
      price: 14,
      rating: 4.8,
      calories: 700,
      protein: 28,
      category_name: "Rice Dishes",
      customizations: ["Boiled Egg", "Dodo", "Snail"]
    },
    {
      name: "Fried Rice with Chicken",
      description: "Mixed vegetable rice stir-fried with spices and served with chicken.",
      image_url: "https://github.com/Primz1/african-food-images/blob/main/fried-rice.jpg?raw=true",
      price: 13,
      rating: 4.7,
      calories: 630,
      protein: 23,
      category_name: "Rice Dishes",
      customizations: ["Beef", "Salad", "Moi Moi"]
    },
    {
      name: "Coconut Rice",
      description: "Aromatic rice cooked with creamy coconut milk and peppers.",
      image_url: "https://github.com/Primz1/african-food-images/blob/main/coconut-rice.jpg?raw=true",
      price: 12,
      rating: 4.6,
      calories: 590,
      protein: 20,
      category_name: "Rice Dishes",
      customizations: ["Shrimp", "Fried Fish", "Plantain"]
    },

    // SNACKS
    {
      name: "Moi Moi (Bean Cake)",
      description: "Steamed bean pudding made from ground peeled beans and spices.",
      image_url: "https://github.com/Primz1/african-food-images/blob/main/moi-moi.jpg?raw=true",
      price: 6,
      rating: 4.7,
      calories: 300,
      protein: 14,
      category_name: "Street Food & Snacks",
      customizations: ["Boiled Egg", "Sardine", "Beef Filling"]
    },
    {
      name: "Akara",
      description: "Deep-fried bean cakes, crispy on the outside and soft inside.",
      image_url: "https://github.com/Primz1/african-food-images/blob/main/akara.jpg?raw=true",
      price: 5,
      rating: 4.6,
      calories: 310,
      protein: 12,
      category_name: "Street Food & Snacks",
      customizations: ["Pap", "Bread", "Pepper Sauce"]
    },
    {
      name: "Puff Puff",
      description: "Sweet deep-fried dough balls, soft and fluffy.",
      image_url: "https://github.com/Primz1/african-food-images/blob/main/puff-puff.jpg?raw=true",
      price: 4,
      rating: 4.5,
      calories: 280,
      protein: 3,
      category_name: "Street Food & Snacks",
      customizations: ["Sugar", "Chili Sauce"]
    },
    {
      name: "Roasted Plantain (Boli)",
      description: "Charcoal-roasted plantain served with spicy groundnut or pepper sauce.",
      image_url: "https://github.com/Primz1/african-food-images/blob/main/roasted-plantain.jpg?raw=true",
      price: 5,
      rating: 4.6,
      calories: 360,
      protein: 3,
      category_name: "Street Food & Snacks",
      customizations: ["Groundnut", "Pepper Sauce"]
    },

    // GRILLED / MEAT
    {
      name: "Suya (Beef Skewers)",
      description: "Spicy grilled beef skewers coated with yaji and onions.",
      image_url: "https://github.com/Primz1/african-food-images/blob/main/suya.jpg?raw=true",
      price: 10,
      rating: 4.9,
      calories: 420,
      protein: 30,
      category_name: "Grilled & Roasted",
      customizations: ["Extra Yaji", "Cucumber", "Tomato Slices"]
    },
    {
      name: "Asun (Spicy Goat Meat)",
      description: "Peppery grilled goat meat, diced and stir-fried with spicy mix.",
      image_url: "https://github.com/Primz1/african-food-images/blob/main/asun.jpg?raw=true",
      price: 13,
      rating: 4.8,
      calories: 500,
      protein: 33,
      category_name: "Grilled & Roasted",
      customizations: ["Onions", "Pepper Sauce", "Dodo"]
    },
    {
      name: "Grilled Catfish",
      description: "Well-seasoned grilled whole catfish served with spicy sauce.",
      image_url: "https://github.com/Primz1/african-food-images/blob/main/grilled-catfish.jpg?raw=true",
      price: 15,
      rating: 4.7,
      calories: 480,
      protein: 32,
      category_name: "Grilled & Roasted",
      customizations: ["Yam Chips", "Pepper Sauce"]
    },

    // SOUP-COMPATIBLE SINGLE BOWLS
    {
      name: "Pepper Soup (Catfish)",
      description: "A light, spicy, herby broth made with fish and native spices.",
      image_url: "https://github.com/Primz1/african-food-images/blob/main/pepper-soup.jpg?raw=true",
      price: 12,
      rating: 4.6,
      calories: 350,
      protein: 24,
      category_name: "Soups & Stews",
      customizations: ["Extra Spice", "White Rice"]
    },
    {
      name: "Nkwobi",
      description: "Eastern cow foot delicacy in spicy palm oil sauce and onions.",
      image_url: "https://github.com/Primz1/african-food-images/blob/main/nkwobi.jpg?raw=true",
      price: 14,
      rating: 4.7,
      calories: 580,
      protein: 29,
      category_name: "Soups & Stews",
      customizations: ["Utazi", "Extra Palm Oil"]
    },
    {
      name: "Isi Ewu",
      description: "Delicacy of spiced goat head in a rich oil base.",
      image_url: "https://github.com/Primz1/african-food-images/blob/main/isi-ewu.jpg?raw=true",
      price: 16,
      rating: 4.8,
      calories: 690,
      protein: 32,
      category_name: "Soups & Stews",
      customizations: ["Utazi", "Pepper Mix"]
    },
    {
      name: "Ewa Agoyin",
      description: "Soft mashed beans with spicy palm oil sauce.",
      image_url: "https://github.com/Primz1/african-food-images/blob/main/ewa-agoyin.jpg?raw=true",
      price: 9,
      rating: 4.5,
      calories: 520,
      protein: 16,
      category_name: "Staples",
      customizations: ["Agege Bread", "Plantains"]
    },
    {
      name: "Beans & Corn Porridge (Adalu)",
      description: "Nigerian beans mixed with soft sweet corn and pepper sauce.",
      image_url: "https://github.com/Primz1/african-food-images/blob/main/beans-porridge.jpg?raw=true",
      price: 10,
      rating: 4.4,
      calories: 550,
      protein: 17,
      category_name: "Staples",
      customizations: ["Fried Fish", "Plantains"]
    }
  ],
};

export default dummyData;
