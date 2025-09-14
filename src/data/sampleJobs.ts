import { Job } from "@/types/job";

const getRandomDate = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * days));
  return date;
};

export const sampleJobs: Job[] = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    salaryMin: 120000,
    salaryMax: 160000,
    type: "Full-time",
    description: `We are seeking a highly skilled Senior Frontend Developer to join our dynamic team. In this role, you will be responsible for developing and maintaining cutting-edge web applications using modern JavaScript frameworks.

Key Responsibilities:
• Develop responsive and interactive user interfaces using React, TypeScript, and modern CSS
• Collaborate with UX/UI designers to implement pixel-perfect designs
• Optimize applications for maximum speed and scalability
• Write clean, maintainable, and well-documented code
• Participate in code reviews and mentor junior developers
• Work closely with backend developers to integrate APIs
• Stay up-to-date with the latest frontend technologies and best practices

Requirements:
• 5+ years of experience in frontend development
• Expert knowledge of React, TypeScript, and modern JavaScript (ES6+)
• Experience with state management libraries (Redux, Zustand, etc.)
• Proficiency in HTML5, CSS3, and responsive design principles
• Experience with build tools and bundlers (Webpack, Vite, etc.)
• Knowledge of testing frameworks (Jest, React Testing Library)
• Experience with version control systems (Git)
• Strong problem-solving skills and attention to detail

Nice to Have:
• Experience with Next.js or other React frameworks
• Knowledge of GraphQL and Apollo Client
• Experience with design systems and component libraries
• Familiarity with cloud platforms (AWS, GCP, Azure)`,
    benefits: ["Health Insurance", "Dental Insurance", "401K", "Paid Time Off", "Stock Options"],
    postedDate: getRandomDate(14),
    companyLogo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=64&h=64&fit=crop&crop=center"
  },
  {
    id: "2", 
    title: "Product Manager",
    company: "InnovateLabs",
    location: "New York, NY",
    salaryMin: 110000,
    salaryMax: 140000,
    type: "Full-time",
    description: `Join our product team as a Product Manager where you'll drive the strategy and execution of our core products. You'll work cross-functionally with engineering, design, and business teams to deliver exceptional user experiences.

Key Responsibilities:
• Define product roadmaps and prioritize features based on user feedback and business goals
• Conduct market research and competitive analysis
• Work closely with engineering teams to deliver high-quality products
• Analyze product metrics and user data to drive decision-making
• Collaborate with design teams to create intuitive user experiences
• Communicate product vision and strategy to stakeholders
• Manage product launches and go-to-market strategies

Requirements:
• 3+ years of product management experience
• Strong analytical and problem-solving skills
• Experience with product management tools (Jira, Figma, Analytics tools)
• Excellent communication and leadership skills
• Understanding of software development processes
• Bachelor's degree in Business, Engineering, or related field

What We Offer:
• Competitive salary and equity package
• Comprehensive health, dental, and vision insurance
• Flexible work arrangements
• Professional development opportunities
• Collaborative and innovative work environment`,
    benefits: ["Health Insurance", "Dental Insurance", "401K", "Paid Time Off", "Flexible Schedule", "Stock Options"],
    postedDate: getRandomDate(14),
    companyLogo: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=64&h=64&fit=crop&crop=center"
  },
  {
    id: "3",
    title: "Data Scientist",
    company: "DataFlow Analytics", 
    location: "Remote",
    salaryMin: 95000,
    salaryMax: 130000,
    type: "Full-time",
    description: `We're looking for a passionate Data Scientist to join our analytics team. You'll work on challenging problems involving large datasets and machine learning models to drive business insights.

Key Responsibilities:
• Develop and deploy machine learning models for various business use cases
• Analyze large datasets to identify trends and patterns
• Create data visualizations and reports for stakeholders
• Collaborate with engineering teams to productionize models
• Design and conduct A/B tests to measure product improvements
• Clean and preprocess data from various sources
• Stay current with latest developments in data science and ML

Requirements:
• 2+ years of experience in data science or related field
• Strong programming skills in Python and SQL
• Experience with machine learning libraries (scikit-learn, pandas, numpy)
• Knowledge of statistical analysis and hypothesis testing
• Experience with data visualization tools (Matplotlib, Seaborn, Plotly)
• Understanding of database systems and data warehousing
• Master's degree in Data Science, Statistics, Computer Science, or related field preferred

Benefits:
• Fully remote work environment
• Flexible working hours
• Learning and development budget
• Top-tier health and dental coverage
• Retirement planning with company matching`,
    benefits: ["Remote Work", "Health Insurance", "Dental Insurance", "401K", "Flexible Schedule", "Paid Training"],
    postedDate: getRandomDate(14),
    companyLogo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=64&h=64&fit=crop&crop=center"
  },
  {
    id: "4",
    title: "UX/UI Designer",
    company: "DesignStudio Pro",
    location: "Austin, TX", 
    salaryMin: 75000,
    salaryMax: 95000,
    type: "Full-time",
    description: `Join our creative team as a UX/UI Designer where you'll craft beautiful and intuitive user experiences for our digital products. We're looking for someone passionate about user-centered design.

Key Responsibilities:
• Create wireframes, prototypes, and high-fidelity designs
• Conduct user research and usability testing
• Collaborate with product managers and developers
• Maintain and evolve our design system
• Present design concepts to stakeholders
• Ensure designs are accessible and meet WCAG standards
• Stay up-to-date with design trends and best practices

Requirements:
• 3+ years of UX/UI design experience
• Proficiency in design tools (Figma, Sketch, Adobe Creative Suite)
• Strong portfolio demonstrating design thinking process
• Understanding of front-end development constraints
• Experience with user research methodologies
• Knowledge of design systems and component libraries
• Bachelor's degree in Design, HCI, or related field

Why Join Us:
• Creative and collaborative work environment
• Opportunity to work on diverse projects
• Professional growth and mentorship opportunities
• Comprehensive benefits package
• Flexible PTO policy`,
    benefits: ["Health Insurance", "Dental Insurance", "Paid Time Off", "Paid Training", "Flexible Schedule"],
    postedDate: getRandomDate(14),
    companyLogo: "https://images.unsplash.com/photo-1558655146-364adaf25c24?w=64&h=64&fit=crop&crop=center"
  },
  {
    id: "5",
    title: "DevOps Engineer", 
    company: "CloudTech Solutions",
    location: "Seattle, WA",
    salaryMin: 105000,
    salaryMax: 135000,
    type: "Full-time",
    description: `We're seeking a skilled DevOps Engineer to help us build and maintain scalable infrastructure. You'll work with cutting-edge cloud technologies and automation tools.

Key Responsibilities:
• Design and implement CI/CD pipelines
• Manage cloud infrastructure (AWS, GCP, Azure)
• Automate deployment and monitoring processes
• Ensure system security and compliance
• Troubleshoot production issues and optimize performance
• Collaborate with development teams on deployment strategies
• Implement infrastructure as code practices

Requirements:
• 3+ years of DevOps or Site Reliability Engineering experience
• Strong knowledge of cloud platforms (AWS preferred)
• Experience with containerization (Docker, Kubernetes)
• Proficiency in scripting languages (Python, Bash, etc.)
• Knowledge of infrastructure as code tools (Terraform, CloudFormation)
• Experience with monitoring and logging tools
• Understanding of networking and security principles

Benefits Package:
• Competitive salary with performance bonuses
• Comprehensive health, dental, and vision coverage
• 401(k) with company matching
• Flexible work arrangements
• Professional development budget
• Stock options program`,
    benefits: ["Health Insurance", "Dental Insurance", "401K", "Paid Time Off", "Stock Options", "Remote Work"],
    postedDate: getRandomDate(14),
    companyLogo: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=64&h=64&fit=crop&crop=center"
  },
  {
    id: "6",
    title: "Marketing Coordinator",
    company: "BrandBooster Agency",
    location: "Chicago, IL",
    salaryMin: 45000,
    salaryMax: 60000,
    type: "Full-time", 
    description: `Join our dynamic marketing team as a Marketing Coordinator. You'll support various marketing initiatives and help drive brand awareness for our clients.

Key Responsibilities:
• Assist in developing and executing marketing campaigns
• Create content for social media platforms
• Coordinate events and promotional activities
• Analyze marketing metrics and prepare reports
• Support email marketing campaigns
• Collaborate with design team on marketing materials
• Maintain marketing databases and CRM systems

Requirements:
• 1-2 years of marketing experience or recent graduate
• Strong written and verbal communication skills
• Experience with social media platforms and analytics
• Knowledge of marketing automation tools
• Basic understanding of SEO and content marketing
• Proficiency in Microsoft Office and Google Workspace
• Bachelor's degree in Marketing, Communications, or related field

What We Offer:
• Entry-level position with growth opportunities
• Comprehensive training program
• Health and dental insurance
• Paid time off and holidays
• Fun and creative work environment
• Career advancement opportunities`,
    benefits: ["Health Insurance", "Dental Insurance", "Paid Time Off", "Paid Training"],
    postedDate: getRandomDate(14),
    companyLogo: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=64&h=64&fit=crop&crop=center"
  }
];