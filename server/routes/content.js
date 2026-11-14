const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    brand: 'AGVERSE',
    tagline: 'The Intelligence of the Earth',
    location: 'Dubai, UAE',
    pillars: [
      {
        title: 'Precision Farming',
        description: 'Every seed is monitored. Every drop of water is calculated.'
      },
      {
        title: 'Data-Driven Decisions',
        description: 'Our AI predicts the future of the harvest before the first sprout appears.'
      },
      {
        title: 'Maximum Efficiency',
        description: 'Scaling food production at 10x the traditional speed.'
      }
    ],
    technology: [
      {
        title: 'AI & Machine Learning',
        subtitle: 'The “Brain” of AGverse',
        description: 'Our algorithms analyze soil, weather, and crop health to optimize growth cycles instantly.'
      },
      {
        title: 'Autonomous Robotics',
        subtitle: 'The “Hands” of the operation.',
        description: 'Sleek, solar-powered robots handle planting, weeding, and harvesting with 100% precision.'
      },
      {
        title: 'Advanced Drone Fleet',
        subtitle: 'The “Eyes” in the sky',
        description: 'Multi-spectral sensors map thousands of hectares in minutes, identifying issues before they become problems.'
      }
    ],
    statistics: {
      cropSimulationSpeed: '10x',
      wasteIrrigation: 'ZERO',
      monitoring: '24/7',
      carbonGoal: 'NET-ZERO by 2030'
    }
  });
});

module.exports = router;
