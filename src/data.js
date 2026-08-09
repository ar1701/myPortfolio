import React from 'react';

export const aboutData = {
  text1: "Software Engineer @ IBM, passionate about robotics and software development. With a CGPA above 9.74 in my college, I'm actively specializing in myself and innovating something new everyday.",
  text2: "I have solved 150+ programming problems across various platforms like LeetCode, GeeksforGeeks, HackerRank etc.",
  beyondTech: "Outside of programming, I enjoy solving Rubik's Cube (3x3 and 2x2), reading books, playing cricket, and exploring new places."
};

export const skillsData = [
  { category: "Programming Languages", icon: "fas fa-code", items: ["C", "C++", "Java", "Python", "Data Structures", "Algorithms", "Object Oriented Programming"] },
  { category: "Frameworks & Libraries", icon: "fas fa-layer-group", items: ["React & Node.js", "Express.js & REST API", "Tailwind CSS", "Docker", "Embedded Systems"] },
  { category: "Database & Cloud", icon: "fas fa-database", items: ["MongoDB", "SQL", "AWS", "Google Cloud", "Cloudinary", "CI/CD", "Nginx"] },
  { category: "AI/ML & Robotics", icon: "fas fa-brain", items: ["Vertex AI", "Gemini API", "Supervised ML", "Pandas", "ROS2", "SLAM / NAV2", "RVIZ / Gazebo"] }
];

export const experienceData = [
  {
    title: "Software Engineering Intern (HDM-Db2)",
    company: "IBM India Private Limited",
    period: "Jan 2026 – July 2026",
    image: "/assets/images/ibm_logo.png",
    cert: "https://drive.google.com/file/d/1PZWgOFnvpgH6g8Jg8Gbd3OpTXUbpaNsl/view?usp=sharing",
    bullets: [
      "Worked on the Hybrid Data Management (HDM-Db2) project, IBM's unified data platform for managing and accessing data across multiple environments",
      "Contributed to integrating, virtualizing, and governing data across on-premises, private cloud, and public cloud infrastructure",
      "Collaborated with cross-functional engineering teams to optimize data access performance and ensure platform reliability"
    ]
  },
  {
    title: "Full Stack Python Intern",
    company: "Smartcard AI",
    period: "July 2025 – Oct 2025",
    image: "/assets/images/smartcard.png",
    cert: "https://drive.google.com/file/d/1RzZZDVjBK3KUibb4xDH1tE76nR7_MUxK/view?usp=sharing",
    bullets: [
      "Built a RESTful API backend to integrate 5+ different data sources (PostgreSQL, MySQL, Spreadsheet, etc.) into the Smartcard AI dashboard",
      "Designed dynamic visualizations for selected data & generated AI-driven insights with the Gemini API from user prompts",
      "Enhanced the backend by implementing token-based authentication and developed a demo trial booking system"
    ]
  },
  {
    title: "Embedded System Intern",
    company: "Brainspired Labs Pvt. Ltd.",
    period: "Jan 2025 – June 2025",
    image: "/assets/images/brainspired_logo.jpeg",
    cert: "https://drive.google.com/file/d/1RD_n-M_o6cSed2HXY_8mkSnFpU5AQPfN/view?usp=sharing",
    bullets: [
      "Successfully integrated a dual 16-bit DAC with STM32H753ZI via I2C, ensuring accurate conversion and analyzing waveforms",
      "Established UART communication in ESP32, enabling real-time frequency and voltage control through an Android app",
      "Implemented the CJMCU-1334 audio DAC with ESP32-S3 using the I2S protocol"
    ]
  },
  {
    title: "Software Developer Intern",
    company: "Horizon Mars Rover Team, CUSAT",
    period: "Nov 2023 – June 2025",
    image: "/assets/images/horizon.jpeg",
    cert: "https://drive.google.com/file/d/16Qo8G9USD8xwp6tUDGBWDm3CAUTAhRdB/view?usp=sharing",
    bullets: [
      "Developed a Unified Robotics Description Format (URDF) file to define the visual, geometric, and kinematic properties of a robotic arm",
      "Utilized URDF and XML to design and structure the robotic arm's software framework",
      "Achieved successful control and operation of the robotic arm using Arduino Due and servo motors, integrated with ROS2"
    ]
  },
  {
    title: "AI - ML Intern",
    company: "IBM Skillsbuild",
    period: "June 2024 – July 2024",
    image: "/assets/images/ibms.png",
    cert: "https://drive.google.com/file/d/1aK0EbJBm1C5vrsDfGfAef-HeZIFYubfa/view?usp=sharing",
    bullets: [
      "Gained a strong foundation in Neural Networks, NLP, LLMs, and GenAI",
      "Developed a fine-tuned chatbot using IBM Watson Studio",
      "Created a machine learning model for kidney stone detection"
    ]
  }
];

export const projectsData = [
  {
    title: "Saarthi",
    desc: "Built a full stack application offering free educational tools, including problem-solving resources, an NEP syllabus generator, AI chatbot, grading system, language translator and more.",
    demo: "https://vercel-saarthi.vercel.app/main",
    repo: "https://github.com/ar1701/Saarthi",
    image: "/assets/images/Diksha_logo.jpeg",
    tags: ["Bootstrap", "Gemini API", "Node.js", "Express.js", "MongoDB Atlas", "Vertex AI"]
  },
  {
    title: "WasteBuddy",
    desc: "WasteBuddy is an AI-powered platform that transforms domestic waste into resources through smart recycling, AI recognition, and a waste marketplace. It optimizes collection and rewards users for responsible disposal.",
    demo: "https://kh-05-2025.onrender.com/",
    repo: "https://github.com/ar1701/Preventive-AI",
    image: "/assets/images/WasteBuddy_Logo.jpeg",
    tags: ["Python", "Gemini Vision Model", "Node.js & Express.js", "MongoDB Atlas", "Socket.io", "Cloudinary"]
  },
  {
    title: "Preventive AI",
    desc: "An AI platform combining medical imaging, genomic data, and EHRs for early cancer detection and personalized treatment insights.",
    demo: "https://genai-ai-cancer-detection.onrender.com/",
    repo: "https://github.com/ar1701/Preventive-AI",
    image: "/assets/images/preventive ai.png",
    tags: ["Python", "Supervised ML", "Node.js", "Express.js", "MongoDB Atlas", "TensorFlow"]
  },
  {
    title: "Food - Match",
    desc: "Food-Match is a full-stack project enabling users to log in, add, search, review, and modify recipes, integrating Food API with Axios and supporting CRUD operations.",
    demo: "https://food-match-ugwh.onrender.com/listings",
    repo: "https://github.com/ar1701/Food-Match",
    image: "/assets/images/foodmatch.png",
    tags: ["Bootstrap", "Ninja API", "Node.js", "Express.js", "MongoDB Atlas"]
  },
  {
    title: "Mobile Robot Simulation",
    desc: "Simulation demonstrating path planning, obstacle avoidance, and SLAM in a virtual environment.",
    image: "/assets/images/demo.gif",
    tags: ["ROS2", "Gazebo", "Nav2", "SLAM"]
  },
  {
    title: "Placement Management System",
    desc: "It is the go-to platform for CUSAT students, providing updates on company visits, placement shortlists, and personalized assignments. Stay prepared with tailored timelines and requirements!",
    demo: "https://placement-management-system-1-rdwj.onrender.com/",
    repo: "https://github.com/ar1701/Placement-Management-System",
    image: "/assets/images/pms.png",
    tags: ["Gemini API", "HTML", "Bootstrap", "Node.js", "MongoDB Atlas", "Cloudinary"]
  }
];

export const achievementsData = [
  {
    title: "Participated in 12 Hackathons",
    icon: "fa-trophy",
    color: "#f59e0b",
    details: [
      "2 x Hackathon Winner",
      "1 x Runner Up",
      "2 x 3rd Position",
      "1 x Jury Choice Award Winner at Accenture (AIC)"
    ]
  },
  {
    title: "Represented India",
    icon: "fa-flag",
    color: "#3b82f6",
    details: [
      "Represented INDIA at European Rover Challenge, 2024, Poland - Robotics Competition.",
      "Team name: Horizon (World Rank 18th)"
    ]
  },
  {
    title: "Top 10% in the batch",
    icon: "fa-graduation-cap",
    color: "#10b981",
    details: [
      "Maintained 9+ GPA for 8 consecutive semesters."
    ]
  }
];
