// Featured projects. Text here overrides GitHub data.
// To serve images from Cloudinary, upload each screenshot and set its publicId
// (for example "portfolio/tastyhub"). Until then the local fallback is used.
const projects = [
  {
    github: "Tarh-Tastyhub",
    featured: true,
    order: 1,
    title: "Tarh TastyHub",
    category: "Full Stack",
    highlight: "Restaurant ordering",
    description:
      "A restaurant and food ordering application with Stripe payments and media stored on AWS S3.",
    image: {
      publicId: null,
      fallback: "/images/projects/tastyhub.png",
      alt: "Screenshot of the TastyHub home page",
    },
    demo: "https://tarh-tastyhub-4071346c00af.herokuapp.com",
    technologies: [
      "Python",
      "Django",
      "PostgreSQL",
      "JavaScript",
      "Stripe",
      "AWS S3",
    ],
  },
  {
    github: "Riders-Club-Project",
    featured: true,
    order: 2,
    title: "Riders Club",
    category: "Full Stack",
    highlight: "Community website",
    description:
      "A website for a bicycle and motorcycle club, built with Django and PostgreSQL using Agile practices.",
    image: {
      publicId: null,
      fallback: "/images/projects/riders.png",
      alt: "Screenshot of the Riders Club home page",
    },
    demo: "https://riders-club-project-013aecf05a65.herokuapp.com",
    technologies: [
      "Python",
      "Django",
      "PostgreSQL",
      "JavaScript",
      "HTML",
      "CSS",
    ],
  },
  {
    github: "Ekpaw-Spicies",
    featured: true,
    order: 3,
    title: "Ekpaw Spices",
    category: "Python",
    highlight: "Cloud data management",
    description:
      "A Python application that manages and reports business data through the Google Sheets API.",
    image: {
      publicId: null,
      fallback: "/images/projects/ekpaw.png",
      alt: "Screenshot of the Ekpaw Spices application",
    },
    demo: "https://ekpaw-spicies-e70a831cb30f.herokuapp.com",
    technologies: ["Python", "Google Sheets API", "Google Cloud"],
  },
  {
    github: "Eyongtarh-portfolio",
    featured: true,
    order: 4,
    title: "Developer Portfolio",
    category: "Frontend",
    highlight: "This website",
    description:
      "My personal portfolio, built with React and Vite with a focus on performance and accessibility.",
    image: {
      publicId: null,
      fallback: "/images/projects/portfolio.png",
      alt: "Screenshot of this portfolio's hero section",
    },
    demo: "https://eyongtarh.com",
    technologies: ["React", "JavaScript", "Vite", "Framer Motion", "CSS"],
  },
];

export default projects;
