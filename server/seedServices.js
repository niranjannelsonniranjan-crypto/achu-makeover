/**
 * Seed script to populate the database with services from the studio's menu.
 */
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Service = require('./models/Service');

dotenv.config();

const services = [
  // Threading
  { title: 'Threading', price: 40, description: 'Eyebrow shaping', category: 'Threading' },
  { title: 'Upper lip', price: 30, description: 'Hair removal for upper lip', category: 'Threading' },
  { title: 'Forehead', price: 30, description: 'Hair removal for forehead', category: 'Threading' },
  { title: 'Chin', price: 30, description: 'Hair removal for chin', category: 'Threading' },
  { title: 'Side face', price: 30, description: 'Hair removal for side face', category: 'Threading' },
  { title: 'Full face', price: 100, description: 'Hair removal for full face', category: 'Threading' },
  { title: 'Neck', price: 40, description: 'Hair removal for neck', category: 'Threading' },

  // Waxing
  { title: 'Half hand', price: 100, description: 'Waxing for half hand', category: 'Waxing' },
  { title: 'Full hand', price: 180, description: 'Waxing for full hand', category: 'Waxing' },
  { title: 'Half Leg', price: 150, description: 'Waxing for half leg', category: 'Waxing' },
  { title: 'Full Leg', price: 250, description: 'Waxing for full leg', category: 'Waxing' },
  { title: 'Full Face', price: 150, description: 'Waxing for full face', category: 'Waxing' },

  // Facial
  { title: 'Basic facial (Cleanup)', price: 300, description: 'Basic skin cleanup', category: 'Facial' },
  { title: 'Fruit facial', price: 500, description: 'Natural fruit-based facial', category: 'Facial' },
  { title: 'Gold facial', price: 1000, description: 'Luxury gold facial', category: 'Facial' },
  { title: 'Bridal Glow facial', price: 1500, description: 'Intensive glow for brides', category: 'Facial' },
  { title: 'D-Tan facial', price: 350, description: 'Tan removal treatment', category: 'Facial' },
  { title: 'Face Bleach', price: 200, description: 'Bleaching for face', category: 'Facial' },
  { title: 'Neck Bleach', price: 150, description: 'Bleaching for neck', category: 'Facial' },

  // Hair Services
  { title: 'Front cut', price: 100, description: 'Hair styling - front cut', category: 'Hair Services' },
  { title: 'Blow Dry', price: 200, description: 'Hair styling - blow dry', category: 'Hair Services' },
  { title: 'Hair Ironing', price: 300, description: 'Hair styling - ironing', category: 'Hair Services' },
  { title: 'Hair curling', price: 400, description: 'Hair styling - curling', category: 'Hair Services' },
  { title: 'Hair wash', price: 500, description: 'Premium hair wash', category: 'Hair Services' },
  { title: 'Global hair colour', price: 1000, description: 'Full hair colouring', category: 'Hair Services' },
  { title: 'Highlights', price: 800, description: 'Hair highlights', category: 'Hair Services' },

  // Piercing
  { title: 'Ear piercing', price: 150, description: 'Standard ear piercing', category: 'Piercing' },
  { title: 'Kids Ear piercing', price: 150, description: 'Gentle ear piercing for kids', category: 'Piercing' },
  { title: 'Nose piercing', price: 300, description: 'Standard nose piercing', category: 'Piercing' },

  // Mehandi
  { title: 'Simple Design (1 hand)', price: 100, description: 'Simple mehandi design', category: 'Mehandi' },
  { title: 'Arabic', price: 250, description: 'Arabic mehandi style', category: 'Mehandi' },
  { title: 'One hand', price: 300, description: 'Detailed design for one hand', category: 'Mehandi' },
  { title: 'Two hands', price: 600, description: 'Detailed design for two hands', category: 'Mehandi' },
  { title: 'Bridal mehendi', price: 2000, description: 'Full bridal mehandi package', category: 'Mehandi' },
  { title: 'Feet mehendi', price: 300, description: 'Mehandi design for feet', category: 'Mehandi' },

  // Makeup
  { title: 'Light makeup', price: 2500, description: 'Subtle light makeup', category: 'Makeup' },
  { title: 'Party makeup', price: 2000, description: 'Glamorous party makeup', category: 'Makeup' },
  { title: 'HD makeup', price: 10000, description: 'High-definition bridal makeup', category: 'Makeup' },
  { title: 'Engagement makeup', price: 4500, description: 'Special makeup for engagement', category: 'Makeup' },
  { title: 'Reception makeup', price: 6000, description: 'Radiant reception makeup', category: 'Makeup' },
  { title: 'Bridal makeup', price: 6500, description: 'Complete bridal makeup package', category: 'Makeup' },
  { title: 'Saree Draping', price: 300, description: 'Professional saree draping', category: 'Makeup' },
  { title: 'Hair style', price: 500, description: 'Professional hair styling', category: 'Makeup' },

  // Hair CARE
  { title: 'Hair wash', price: 100, description: 'Basic hair wash', category: 'Hair CARE' },
  { title: 'Hair cut (Straight)', price: 200, description: 'Straight hair cut', category: 'Hair CARE' },
  { title: 'U cut', price: 350, description: 'U-shaped hair cut', category: 'Hair CARE' },
  { title: 'V cut', price: 400, description: 'V-shaped hair cut', category: 'Hair CARE' },
  { title: 'Layer cut', price: 800, description: 'Layered hair cut', category: 'Hair CARE' },
  { title: 'Kids Hair cut', price: 250, description: 'Hair cut for children', category: 'Hair CARE' },
  { title: 'Hair spa', price: 700, description: 'Relaxing hair spa treatment', category: 'Hair CARE' },
  { title: 'Hair oil massage', price: 600, description: 'Nourishing hair oil massage', category: 'Hair CARE' },
  { title: 'Hair colour', price: 800, description: 'Basic hair colouring', category: 'Hair CARE' },

  // Manicure & Pedicure
  { title: 'Basic manicure', price: 300, description: 'Standard hand care', category: 'Manicure & Pedicure' },
  { title: 'Spa manicure', price: 400, description: 'Premium spa manicure', category: 'Manicure & Pedicure' },
  { title: 'Basic pedicure', price: 500, description: 'Standard foot care', category: 'Manicure & Pedicure' },
  { title: 'Massage pedicure', price: 800, description: 'Relaxing massage pedicure', category: 'Manicure & Pedicure' },
  { title: 'Manicure + Pedicure combo', price: 900, description: 'Complete hand & foot care combo', category: 'Manicure & Pedicure' },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing services
    await Service.deleteMany({});
    console.log('Cleared existing services.');

    // Insert new services
    await Service.insertMany(services);
    console.log(`Successfully seeded ${services.length} services.`);

    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

seedDB();
