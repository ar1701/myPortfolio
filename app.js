// Convert the Express app to a static site for deployment
const portfolioData = {
  name: 'Ayush Raj',
  contact: {
    email: 'ayushrajj30@gmail.com',
    phone: '+91 6203392086',
    location: 'Kochi, India',
    github: 'https://github.com/ar1701',
    linkedin: 'https://www.linkedin.com/in/ayush-raj17'
  },
  education: {
    degree: 'Bachelor of Technology in Computer Science & Engineering',
    institution: 'Cochin University of Science and Technology',
    duration: 'Oct 2022 – May 2026',
    year: '3rd Year (Penultimate Year)',
    cgpa: '9.6/10',
    achievements: [
      'Listed among Top 10% Students in the Batch',
      'Team HORIZON Represented INDIA at Robotics Competition ERC\'24 in Poland'
    ]
  },
  experience: [
    {
      title: 'Software Engineering Intern',
      company: 'Horizon Mars Rover, CUSAT',
      duration: 'Nov 2023 - Present',
      points: [
        'Developed URDF - a file describes the visual, geometric properties and kinematic joint of a Robotic Arm',
        'Created using Unified Robotics Description Format & XML and successfully designed the software',
        'Accomplished Proper Working of Robotic Arm controlled by Arduino Due & Servo Motors by running ROS',
        'Acquired Data Visualization Skill and increases my efficiency by 30%'
      ]
    },
    {
      title: 'AI - ML Intern',
      company: 'IBM Skillsbuild',
      duration: 'June 2024 - July 2024',
      points: [
        'Developed a strong Foundation of Neural Networks, Natural Language Processing(NLP), LLMs & GenAI',
        'Build a 20% faster fine tuned ChatBot using IBM Watson Studio & a Kidney Stone Detector ML Model',
        'Reduced failures by 25% due to implementation of IBM Pre-built Automation tools',
        'Integrated the ChatBot in a Food-Match Web Portal which was fine tuned for that particular website'
      ]
    }
  ],
  leadership: [
    {
      title: 'SIG AI Lead',
      organization: 'IEEE Execom\'24',
      duration: 'Jun 2024 – Present',
      points: [
        'Responsible for Organizing Tech Events related to AI in the College along with the other IEEE Leads',
        'Took Sessions for Juniors to get them familiarized with Artificial Intelligence and Machine Learning',
        'Improved my Problem Solving Skills by 40% and learned to Work in a Team Environment'
      ]
    },
    {
      title: 'Backend Developer',
      organization: 'TedxCUSAT',
      duration: 'May 2024 – Present',
      points: [
        'TedxCUSAT is a club which invites Tech Speakers in our College based on recent technical trends',
        'Along with my Teammates Designed a fully functional Backend System for the Web Application of TedxCUSAT',
        'Improved my Communication Skills by 50% and got the exposure of a Professional Organization'
      ]
    }
  ],
  projects: [
    {
      title: 'EduFlex',
      year: '2024',
      description: 'Web Application to learn & get educational tools for free',
      details: 'A MERN Stack, Vertex AI & Gemini API Project that leverages Problem Solving Tools, NEP Syllabus Generator, AI Chatbot, Grading System & more',
      technologies: ['React', 'Node.js', 'MongoDB', 'Vertex AI', 'Gemini API']
    },
    {
      title: 'Preventive AI',
      year: '2024',
      description: 'AI platform for early cancer detection and personalized treatment insights',
      details: 'Combines medical imaging, genomic data, and EHRs. Built with React, Node, MongoDB, and TensorFlow Serving',
      technologies: ['React', 'Node.js', 'MongoDB', 'TensorFlow']
    },
    {
      title: 'Hack-Match',
      year: '2024',
      description: 'Online Platform to find teammates for tech competitions',
      details: 'Created using EJS templating lang, a Node.js backend with Express/MongoDB & Python for searching mates',
      technologies: ['EJS', 'Node.js', 'Express', 'MongoDB', 'Python']
    }
  ],
  awards: [
    {
      title: 'GDG Build With AI Hackathon Winner',
      date: 'April 2024',
      description: 'Winner among 500+ participants nationwide for Best Project and Management'
    },
    {
      title: 'Make-A-Ton 7.0 Winner',
      date: 'October 2024',
      description: 'Secured 3rd Position and Track Winner in South India\'s Largest Hackathon by MLH'
    }
  ],
  skills: {
    languages: ['Java (OOP)', 'JavaScript', 'HTML/CSS', 'C/C++', 'SQL', 'Python'],
    technical: ['Git', 'Data Structures', 'Algorithms', 'Bootstrap', 'Vertex AI', 'Node.js', 'Express.js', 'Linux', 'Problem Solving', 'NLP', 'AI', 'Machine Learning']
  }
};

// Generate static HTML
const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

app.set('view engine', 'ejs');

// Serve static files from 'public' directory
app.use(express.static('public'));

// Your portfolioData object (as shown in your code)

// Universal route - will catch all requests
app.get('*', (req, res) => {
  res.render('index', { data: portfolioData });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

ejs.renderFile('views/index.ejs', { data: portfolioData }, (err, html) => {
  if (err) throw err;
  
  if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist');
  }
  
  fs.writeFileSync('dist/index.html', html);
  
  // Copy static assets
  fs.cpSync('public', 'dist', { recursive: true });
});
