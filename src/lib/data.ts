import { Profile } from "@/types";

/**
 * Content originally extracted from https://niteshpandey.in, since kept up
 * to date directly (LinkedIn updates, new awards/recognition, etc.) — see
 * README.md "Content TODO" for any specific gaps still outstanding
 * (project descriptions/tech stacks/links, publication titles for the
 * non-indexed count, recommendation quotes).
 */
export const profile: Profile = {
  name: "Nitesh Pandey",
  title: "AI & Robotics Engineer",
  tagline: "Artificial Intelligence · Robotics · Cybersecurity Research",
  heroSummary:
    "From a blank CAD sheet to 200+ filed patents — I design, train, and secure the machines of tomorrow.",
  personal: {
    firstName: "Nitesh",
    lastName: "Pandey",
    age: 22,
    nationality: "Indian",
    freelance: "Available",
    address: "JUET Campus",
    phone: "+91-8839584024",
    email: "niteshpandey46974@gmail.com",
    linkedin: "https://www.linkedin.com/in/niteshpandey46974/",
    googleScholar: "https://scholar.google.com/citations?user=R0I_EYYAAAAJ&hl=en",
    researchGate: "https://www.researchgate.net/profile/Nitesh-Pandey-13",
    languages: ["English", "Hindi"],
    resumeUrl: "https://drive.google.com/file/d/1DiaaxAr1IvitQoCmvz_Myt6DRyFq6Seu/view?usp=sharing",
    github: null // TODO: no GitHub profile found on the source site or LinkedIn URL
  },
  stats: [
    { value: 5, suffix: "+", label: "Years of experience" },
    { value: 200, suffix: "", label: "Patented projects" },
    { value: 30, suffix: "", label: "Research articles" },
    { value: 5, suffix: "", label: "Conferences" }
  ],
  skills: [
    { name: "AI & Machine Learning", level: 90, category: "AI/ML" },
    { name: "Python", level: 80, category: "AI/ML" },
    { name: "Research", level: 85, category: "AI/ML" },
    { name: "Robot Operating System (ROS)", level: 85, category: "Robotics" },
    { name: "AutoCAD", level: 85, category: "Robotics" },
    { name: "IoT", level: 70, category: "Robotics" },
    { name: "Cyber Security", level: 85, category: "Security" },
    { name: "Patent Drafting", level: null, category: "Tooling" }
  ],
  experience: [
    {
      period: "2025 — Present",
      role: "SDE-1 Intern",
      org: "Control Development Center (CDC), CIRD",
      description:
        "As an SDE-1 at CDC, I develop intelligent systems for industrial automation, robotics, and smart monitoring. My work spans ROS-based robotics, real-time sensor integration, SCADA, MQTT, OPC UA, and embedded systems, focusing on scalable, safe, and efficient solutions. I combine software engineering and research to address real-world industrial challenges through automation and intelligent technologies."
    },
    {
      period: "2024 — 2025",
      role: "Research Intern",
      org: "Scientific Analysis Group, DRDO",
      description:
        "Benchmarked Random Forest, SVM, and XGBoost on NSL-KDD for real-time intrusion classification. Enhanced generalization using CTGAN-generated synthetic attack data, reducing dependence on limited real samples. Published the complete, reproducible pipeline as a public Kaggle notebook, enabling transparent evaluation and further research."
    },
    {
      period: "2023 — 2025",
      role: "Head of Innovation and Robotics Lead",
      org: "Rospinot",
      description:
        "Led multidisciplinary teams in developing ROS-integrated robots and IoT prototypes from concept to functional demonstrations. Mentored 200+ members across AI/ML, embedded systems, and 3D modeling, contributing to 100+ patent filings and 20+ research publications. Directed AI/ML-driven automation projects, translating academic concepts into practical campus and industry solutions."
    },
    {
      period: "2022 — 2024",
      role: "Research Analyst",
      org: "AKP Technovision",
      description:
        "Worked on product development, enhancing hardware capabilities for advanced automation. Researched market trends, optimizing innovations, and filed utility patents for technological advancements."
    },
    {
      period: "01/2024 — 06/2024",
      role: "Project Intern",
      org: "Jaiprakash Power Venture Ltd.",
      description:
        "Researched energy-efficient automation, optimizing industrial processes. Designed AI-driven predictive maintenance models, improving power plant efficiency and reliability."
    },
    {
      period: "06/2023",
      role: "Innovation Design and Entrepreneurship Bootcamp",
      org: "Ministry of Innovation Cell",
      description:
        "Developed business strategies for robotics innovation, integrating AI-driven solutions. Worked on robot development, enhancing functionality and market viability through research-driven design."
    },
    {
      period: "06/2022 — 07/2022",
      role: "Finance Innovation, Research and Entrepreneurship Fellowship",
      org: "Orison Education India Ltd.",
      description:
        "Developed financial strategies, fostering innovation and entrepreneurship. Conducted research on real-world problems, optimizing investment approaches for sustainable business growth."
    }
  ],
  education: [
    {
      period: "2025 — Present",
      degree: "Masters Degree (M.Tech)",
      school: "Jaypee University of Engineering and Technology (JUET)",
      description:
        "Enrolled in a postgraduate program focused on artificial intelligence and machine learning, emphasizing core areas such as deep learning, natural language processing, and intelligent systems. The program fosters academic research, critical thinking, and hands-on development using modern AI tools and frameworks. Actively contributing to academic activities, interdisciplinary collaborations, and student mentoring within the university ecosystem."
    },
    {
      period: "2025",
      degree: "Bachelor Degree (B.Tech)",
      school: "Jaypee University of Engineering and Technology (JUET)",
      description:
        "Graduated with a focus on Robotics, AI, and Machine Learning. Gained hands-on experience in engineering principles, programming, and system design."
    },
    {
      period: "2021",
      degree: "Senior Secondary",
      school: "Jay Jyoti School",
      description:
        "Studied core subjects with an emphasis on science and technology. Served as school captain, demonstrating leadership and organizational skills."
    },
    {
      period: "2019",
      degree: "Secondary",
      school: "Jay Jyoti School",
      description:
        "Excelled in foundational subjects like mathematics, physics, and computer science, fostering a passion for problem-solving and technical innovation."
    }
  ],
  projects: [
    {
      title: "SIH 2024",
      description: "Smart India Hackathon 2024 entry.", // TODO: add real description
      tags: ["Hackathon"],
      media: "https://drive.google.com/file/d/1cESMScgs5zo_gvqo1bDudv9uznlenKqO/preview",
      github: null,
      demo: null,
      image: "/images/profile-2.png"
    },
    {
      title: "3D Printing",
      description: "TODO: add a real description, tech stack, and media for this project.",
      tags: [],
      media: null,
      github: null,
      demo: null,
      image: "/images/profile-3.png"
    },
    {
      title: "Advanced Wheelchair",
      description: "TODO: add a real description, tech stack, and media for this project.",
      tags: ["Robotics"],
      media: null,
      github: null,
      demo: null,
      image: "/images/profile-4.png"
    },
    {
      title: "Svatanya",
      description: "TODO: add a real description, tech stack, and media for this project.",
      tags: [],
      media: null,
      github: null,
      demo: null,
      image: "/images/profile-5.png"
    },
    {
      title: "Industrial Robot",
      description: "TODO: add a real description, tech stack, and media for this project.",
      tags: ["Robotics", "ROS"],
      media: null,
      github: null,
      demo: null,
      image: "/images/profile-1.png"
    },
    {
      title: "Legged Robot",
      description: "TODO: add a real description, tech stack, and media for this project.",
      tags: ["Robotics"],
      media: null,
      github: null,
      demo: null,
      image: "/images/profile-2.png"
    },
    {
      title: "LiDAR",
      description: "TODO: add a real description, tech stack, and media for this project.",
      tags: ["Sensing"],
      media: null,
      github: null,
      demo: null,
      image: "/images/profile-3.png"
    }
  ],
  awards: [
    {
      title: "Nationally Recognized in Top 1,200 Research Articles",
      description:
        "Selected among the top 1,200 research articles from over 1,68,000 registrations and 6,000+ submissions.",
      image: "/images/BSM.jpg"
    },
    {
      title: "Patent Filing Process",
      description:
        "Delivered a session on the Patent Filing Process at UIT RGPV Shivpuri, engaging researchers, innovators, and faculty on transforming innovative ideas into valuable intellectual property through effective patent filing practices.",
      image: "/images/patent.jpg"
    },
    {
      title: "Summer Industrial Training - 2025",
      description:
        "Served as a Resource Person at SIT-2025, conducting sessions on Robotics, ROS, AI/ML, Industrial Automation, Sensor Fusion, Linux, and Open-Source Technologies, empowering participants with practical skills and fostering curiosity, collaboration, and innovation.",
      image: "/images/sit.jpg"
    },
    {
      title: "Open-Source Robotics with ROS: Theory to Practice",
      description:
        "Conducted a hands-on ROS workshop covering robotics fundamentals, ROS architecture, Gazebo simulation, RViz visualization, sensor integration, navigation, and complete robotic workflows, connecting theory with practical implementation.",
      image: "/images/ROS.jpg"
    },
    {
      title: "CodeSrijan National Hackathon – AI for Bharat",
      description:
        "Coordinated CodeSrijan National Hackathon – AI for Bharat, managing teams, participants, mentors, judges, and logistics. Led execution, problem-solving, and collaboration, contributing to a large-scale national platform for innovation and real-world AI solutions.",
      image: "/images/codesrijan.jpg"
    },
    {
      title: "LaTeX for Engineers",
      description:
        "Supported the organization of “LaTeX for Engineers”, a technical documentation and academic writing program conducted by DIC, JUET Guna. Contributed to program coordination, participant engagement, and execution, promoting technical excellence, research culture, and professional academic communication.",
      image: "/images/latex.jpg"
    },
    {
      title: "Advisor – Badminton & Table Tennis",
      description:
        "Received Certificates of Appreciation from JUET Guna for serving as Advisor – Badminton & Table Tennis and Joint Secretary – Badminton. Contributed to sports leadership, event organization, teamwork, discipline, and promoting sportsmanship across the university community.",
      image: "/images/advisor.jpg"
    }
  ],
  // Featured record recognitions, shown right after the About section, each with a
  // certificate/photo or a video. Place the files in public/images/ or public/video/
  // using these exact names (case-sensitive).
  records: [
    {
      title: "News Telecast",
      description: "Maximum Patents Filed in a Single Day by an Individual in Asia",
      image: "/video/India_Tv.mp4"
    },
    {
      title: "Asia Book of Records",
      description: "Maximum Patents Filed in a Single Day by an Individual in Asia",
      image: "/images/ABR.JPG"
    },
    {
      title: "India Book of Records",
      description: "Maximum Patents Filed in a Single Day by an Individual in India",
      image: "/images/IBR.JPG"
    }
  ],
  conferences: [
    { name: "AIHC 2027" },
    { name: "ICMME 2025" },
    { name: "VIVIBHA 2024" },
    { name: "IArcSAS 2022" },
    { name: "NSSSLS 2024" },
    { name: "DSSSM 2024" }
  ],
  meetups: [
    { name: "ISRO" },
    { name: "SAG DRDO" },
    { name: "Indian Army" },
    { name: "Indian Air Force" },
    { name: "Galgotias University" },
    { name: "Amity University" },
    { name: "IISER Bhopal" }
  ],
  // letterUrl: link to a scanned/PDF recommendation letter from this organization, if you have one.
  // TODO: add the actual letter file/link for each — currently unset.
  recommendations: [
    { org: "Rospinot", quote: null, letterUrl: "/recommendations/rospinot.jpg"  },
    { org: "Jaiprakash Power Venture Ltd. (JPVL)", quote: null, letterUrl: "/recommendations/jpvl.jpg" },
    { org: "Orison Education India Ltd.", quote: null, letterUrl: "/recommendations/orison.jpeg" }
  ],
  blog: [
    {
      title: "Transitioning from ROS 1 to ROS 2: Enhancements and Practical Insights",
      url: "https://niteshpandey.in/blog-10.html",
      excerpt:
        "The evolution of the Robot Operating System (ROS) from version 1 to ROS 2 has brought significant improvements to robotics development."
    },
    {
      title: "Why ROS is Essential for Robotics Development",
      url: "https://niteshpandey.in/blog-9.html",
      excerpt:
        "Robot Operating System (ROS) is a powerful framework that allows seamless integration of hardware, sensors, and algorithms in robotics projects."
    },
    {
      title: "Integrating AI and Machine Learning in Industrial Automation",
      url: "https://niteshpandey.in/blog-8.html",
      excerpt:
        "AI and Machine Learning are transforming industrial automation by enhancing efficiency, precision, and decision-making."
    },
    {
      title: "Cybersecurity in Robotics – Protecting Autonomous Systems",
      url: "https://niteshpandey.in/blog-7.html",
      excerpt: "As robotics technology advances, so do the cybersecurity threats targeting autonomous systems."
    },
    {
      title: "Designing Autonomous Drones – From Concept to Deployment",
      url: "https://niteshpandey.in/blog-6.html",
      excerpt:
        "Autonomous drones are revolutionizing industries, from surveillance and inspection to environmental monitoring and disaster response."
    },
    {
      title: "The Journey of Patents – From Innovation to Legal Protection",
      url: "https://niteshpandey.in/blog-5.html",
      excerpt: "Innovation drives progress, but protecting intellectual property is just as crucial as creating it."
    },
    {
      title: "AutoCAD in Modern Engineering – Designing with Precision",
      url: "https://niteshpandey.in/blog-4.html",
      excerpt: "In the world of engineering and product design, precision is paramount."
    },
    {
      title: "The Need for Interdisciplinary Collaboration in Robotics",
      url: "https://niteshpandey.in/blog-3.html",
      excerpt: "Robotics is one of the most rapidly advancing fields, requiring the integration of multiple domains."
    },
    {
      title: "Research-Oriented Work and Crafting Impactful Research Papers",
      url: "https://niteshpandey.in/blog-2.html",
      excerpt: "Research is the foundation of progress in science, technology, and industry."
    },
    {
      title: "Engineers – Solvers of Real-World Problems, Not Participants in a Rat Race",
      url: "https://niteshpandey.in/blog-1.html",
      excerpt: "The true essence of engineering lies in solving real-world problems, not chasing titles."
    }
  ],
  // Only published, indexed (SCI / Scopus) papers are listed here — items still
  // "In progress" or "Under review" per the source tracker are excluded until published.
  publications: [
    {
      title:
        "Python‐Powered Structural Analysis: Modeling and Solving 2D Truss Systems With the “Anastruct” Module",
      index: "SCI",
      citation:
        "Dumka, P., Mishra, D. R., Chauhan, R., & Pandey, N. (2025). Python‐Powered Structural Analysis: Modeling and Solving 2D Truss Systems With the “Anastruct” Module. Computer Applications in Engineering Education, 33(5), e70072."
    },
    {
      title: "Investigating the Role of Geometry in Solar Water Heating: A Case Study of Cylindrical and Frustum Buckets",
      index: "SCI",
      citation:
        "Dumka, P., Pandey, N., Mishra, D. R., Atamurotov, F., Alsayah, A. M., & Khalilpoor, N. (2025). Investigating the Role of Geometry in Solar Water Heating: A Case Study of Cylindrical and Frustum Buckets. Energy Science & Engineering, 13(8), 4087-4100."
    },
    {
      title: "AI-Driven Robotic Arms in Industry 4.0: Harnessing IoT and Robotics for Smart Automation",
      index: "Scopus",
      citation:
        "Pandey, N., Mishra, R., & Gupta, P. (2026). AI-driven Robotic Arms in Industry 4.0: Harnessing IoT and Robotics for Smart Automation Simulation. In Modern Trends in Pervasive Intelligence (pp. 176-194). Bentham Science Publishers."
    },
    {
      title: "Conventional Solar Still Augmented with Saltwater Bottles: An Experimental Study",
      index: "Scopus",
      citation:
        "Dumka, P., Pandey, N., & Mishra, D. R. (2024). Conventional Solar Still Augmented with Saltwater Bottles: An Experimental Study. Journal of Solar Energy Research, 9(1), 1811-1821."
    },
    {
      title:
        "Investigating Barriers to Technology Adoption in Indian Agriculture: A Parallel Mediation Analysis of Awareness, Attitude, and Agronomic Practices",
      index: "Scopus",
      citation:
        "Shukla, A., Pandey, N., Raghuwanshi, J., & Srivastava, A. K. (2026). Investigating Barriers to Technology Adoption in Indian Agriculture: A Parallel Mediation Analysis of Awareness, Attitude, and Agronomic Practices. Discover Sustainability."
    },
    {
      title: "Performance Enhancement and Predictive Modelling of Sponge-Augmented Solar Still Using Ensemble Learning Techniques",
      index: "Scopus",
      citation:
        "Dumka, P., Pandey, N., Mishra, D. R., Mishra, R., & Chauhan, R. (2025). Performance Enhancement and Predictive Modelling of Sponge-Augmented Solar Stills Using Ensemble Learning Techniques. AI in Sustainable Energy and Environment, 1(1), 25-35."
    },
    {
      title: "Modelling and Optimization of Rankine Cycle Performance Using Classical Machine Learning: A Python-Based Approach",
      index: "Scopus",
      citation:
        "Dumka, P., Pandey, N., Mishra, D. R., Mishra, R., & Chauhan, R. (2026). Modelling and Optimization of Rankine Cycle Performance Using Classical Machine Learning: A Python-Based Approach. AI in Sustainable Energy and Environment, 1(2), 191-206."
    },
    {
      title: "Improving Solar Desalination Efficiency Using Hanging Wick Designs",
      index: "Scopus",
      citation:
        "Dumka, P., Pandey, N., Mishra, D. R., Chauhan, R., & Awad, M. M. (2025, November). Improving Solar Desalination Performance by Using Sagging Wick Designs. In 2025 International Conference on Future Telecommunications and Artificial Intelligence (IC-FTAI) (pp. 1-7). IEEE."
    }
  ]
};