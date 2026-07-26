import {
  FaLaptopCode,
  FaDatabase,
  FaChartLine,
  FaCar,
  FaShip,
  FaBuilding,
  FaTruck,
  FaSchool,
  FaPrint,
  FaCog,
} from "react-icons/fa";
const experience = [
  {
    id: 1,
    icon: FaLaptopCode,
    color: "#3B82F6",
    role: "Full Stack Software Developer",
    company: "Independent / Remote Contracts",
    location: "Sweden",
    period: "February 2024 - Present",
    summary:
      "Develop modern, secure and scalable web applications for clients.",
    highlights: [
      "Develop full-stack applications using React, Python, Django and PostgreSQL.",
      "Design RESTful APIs and responsive user interfaces.",
      "Build scalable, secure and user-friendly web solutions.",
      "Collaborate with clients from concept through deployment.",
    ],
    technologies: [
      "React",
      "JavaScript",
      "Python",
      "Django",
      "PostgreSQL",
      "REST API",
      "Git",
    ],
  },
  {
    id: 2,
    icon: FaDatabase,
    color: "#10B981",
    role: "Information Systems Associate",
    company: "Budbee",
    location: "Sweden",
    period: "December 2022 - March 2024",
    summary:
      "Supported daily operations through information systems management.",
    highlights: [
      "Managed information systems to support daily operations.",
      "Maintained accurate data and system records.",
    ],
    technologies: ["Information Systems", "Data Management", "Operations"],
  },
  {
    id: 3,
    icon: FaChartLine,
    color: "#F59E0B",
    role: "Business Consultant",
    company: "MECANUS",
    location: "Buea, Cameroon",
    period: "July 2019 - December 2022",
    summary: "Business consulting and project advisory services.",
    highlights: [
      "Provided consulting for local and international clients.",
      "Supported project planning and business development.",
      "Improved operational efficiency.",
      "Worked closely with stakeholders throughout project lifecycles.",
    ],
    technologies: ["Consulting", "Business Analysis", "Project Management"],
  },

  {
    id: 4,
    icon: FaCar,
    color: "#8B5CF6",
    role: "Part-time Driving Instructor",
    company: "Transportstyrelsen",
    location: "Gothenburg, Sweden",
    period: "March 2015 - Present",
    summary:
      "Approved Driving Supervisor by the Swedish Transport Agency(Active)",
    highlights: [
      "Train learner drivers according to Swedish regulations.",
      "Promote defensive driving and road safety.",
      "Assess driving performance and readiness.",
    ],
    technologies: ["Training", "Coaching", "Communication"],
  },

  {
    id: 5,
    icon: FaShip,
    color: "#06B6D4",
    role: "Part-time Export Manager",
    company: "Nordtrafik AB Collaboration",
    location: "Gothenburg, Sweden",
    period: "May 2013 - November 2019",
    summary: "Export logistics and customer relationship management.",
    highlights: [
      "Managed export operations.",
      "Coordinated logistics activities.",
      "Handled customer and supplier relationships.",
      "Maintained export documentation.",
    ],
    technologies: ["Logistics", "Operations", "Supply Chain"],
  },

  {
    id: 6,
    icon: FaBuilding,
    color: "#8B5CF6",
    role: "Managing Partner & Accountant",
    company: "Sävenäs Hus & Hemtjänster HB",
    location: "Gothenburg, Sweden",
    period: "October 2012 - June 2018",
    summary:
      "Co-managed business operations while overseeing the company's financial management, accounting, and administrative functions.",

    highlights: [
      "Co-managed daily business operations and strategic planning.",
      "Maintained financial records, bookkeeping, and accounting processes.",
      "Prepared budgets, invoices, payroll, and financial reports.",
      "Oversaw planning, administration, and regulatory compliance.",
      "Built and maintained strong customer and stakeholder relationships.",
    ],

    technologies: [
      "Leadership",
      "Business Management",
      "Accounting",
      "Bookkeeping",
      "Budgeting",
      "Payroll",
      "Administration",
      "Planning",
    ],
  },

  {
    id: 7,
    icon: FaTruck,
    color: "#EF4444",
    role: "Courier",
    company: "VTD",
    location: "Sweden",
    period: "December 2009 - June 2013",
    summary: "Part-time distribution services.",
    highlights: [
      "Delivered parcels, letters, newspapers, and publications.",
      "Maintained excellent delivery reliability.",
    ],
    technologies: ["Customer Service", "Reliability"],
  },

  {
    id: 8,
    icon: FaSchool,
    color: "#10B981",
    role: "High School Economics Examiner",
    company: "Cameroon General Certificate Of Education Board",
    location: "Cameroon",
    period: "2007 - 2008",
    summary:
      "Assessed candidates' examination scripts in accordance with national group marking standards and examination guidelines.",
    highlights: [
      "Marked and evaluated examination scripts accurately and consistently.",
      "Applied national group marking schemes to ensure fairness and quality.",
      "Maintained confidentiality and integrity throughout the examination process.",
    ],
    technologies: ["Assessment", "Attention to Detail", "Communication"],
  },

  {
    id: 9,
    icon: FaSchool,
    color: "#10B981",
    role: "High School Economics Teacher",
    company: "Saint Joseph College, Sasse",
    location: "Cameroon",
    period: "September 2008 - June 2009",
    summary: "Economics teacher.",
    highlights: [
      "Prepared students for national examinations.",
      "Developed lesson plans.",
      "Delivered classroom instruction.",
    ],
    technologies: ["Teaching", "Leadership", "Public Speaking"],
  },

  {
    id: 10,
    icon: FaSchool,
    color: "#10B981",
    role: "Formator",
    company: "Bishop Rogan College, Small Soppo",
    location: "Cameroon",
    period: "September 2007 - June 2008",
    summary: "Minor Seminary High School Economics teacher.",
    highlights: [
      "Prepared Seminarians for national examinations.",
      "Developed lesson plans.",
      "Delivered classroom instruction.",
    ],
    technologies: ["Teaching", "Leadership", "Public Speaking"],
  },

  {
    id: 11,
    icon: FaPrint,
    color: "#F59E0B",
    role: "Founder & Proprietor",
    company: "E-PRINTS SARL",
    location: "Buea, Cameroon",
    period: "April 2006 - August 2009",
    summary:
      "Founded and owned an office support and document services business, providing printing, document preparation, and office stationery solutions while overseeing the company's strategic direction and financial management.",
    highlights: [
      "Established and managed a business offering typing, printing, scanning, photocopying, and document preparation services.",
      "Oversaw financial management, business operations, and strategic planning.",
      "Maintained strong customer relationships and ensured high-quality service delivery.",
      "Delegated and supervised day-to-day operational activities.",
    ],
    technologies: [
      "Business Management",
      "Entrepreneurship",
      "Customer Service",
      "Operations Management",
    ],
  },

  {
    id: 12,
    icon: FaCog,
    color: "#6B7280",
    role: "Operations Team",
    company: "Unity Co-operative Society (UNICS) Plc",
    location: "Cameroon",
    period: "September 2004 - June 2006",
    summary: "Operations support.",
    highlights: [
      "Supported business operations.",
      "Worked across operational departments.",
    ],
    technologies: ["Operations", "Administration"],
  },
];

export default experience;
