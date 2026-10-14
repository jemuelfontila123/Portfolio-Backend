import covidImage from "../assets/covid.png";
import examImage from "../assets/exam.png";
import irccImage from "../assets/ircc.png";

const projects = [
  {
    id: 1,
    title: "QR Scanning for Vaccination Records",
    image: covidImage,
    description:
      "A web and mobile application that generates and verifies QR codes for COVID-19 vaccination records. It allows establishments to quickly check whether an individual is vaccinated before entry.",
    role: "Full-Stack Developer",
    outcome:
      "Developed a secure and efficient system for generating and scanning vaccination QR codes, providing quick vaccination status verification for establishments.",
  },
  {
    id: 2,
    title: "Online Examination System",
    image: examImage,
    description:
      "A web-based examination system developed for our university that allows students to take exams online with features such as secure login, timed assessments, automated grading, and result management.",
    role: "Full-Stack Developer",
    outcome:
      "Created an online examination platform that simplified exam administration and provided students with an accessible and user-friendly way to complete assessments.",
  },
  {
    id: 3,
    title: "Non-Express Entry Community",
    image: irccImage,
    description:
      "A community platform where individuals applying through non-Express Entry immigration pathways can share application progress, timelines, experiences, questions, and helpful information with other applicants.",
    role: "Full-Stack Developer",
    outcome:
      "Built a community-focused platform that allows users to share application updates and compare immigration timelines while helping applicants stay informed throughout their application process.",
  },
];

export default projects;