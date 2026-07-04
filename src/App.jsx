import "./App.css";
import { useEffect, useState } from "react";
import Navbar from "./components/navbar";
import profile from "./assets/profile.jpeg";
import { MdEmail } from "react-icons/md";
import { FaLinkedin, FaGithub, FaPhone, FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaMobileAlt, FaNodeJs, FaDatabase, FaGitAlt, FaCode, FaFire } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { SiExpress, SiPostman } from "react-icons/si";
import { FaBriefcase, FaAward } from "react-icons/fa";
import emailjs from "@emailjs/browser";

function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitStatus, setSubmitStatus] = useState("");

  useEffect(() => {
    const elements = document.querySelectorAll(".reveal-section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const sections = ["home", "about", "skills", "projects", "certifications", "education", "contact"]
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);

      const currentSection = sections.reduce(
        (closest, section) => {
          const sectionTop = section.getBoundingClientRect().top;
          if (sectionTop <= 140 && sectionTop > closest.top) {
            return { id: section.id, top: sectionTop };
          }
          return closest;
        },
        { id: "home", top: Infinity }
      );

      setActiveSection(currentSection.id);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleContactClick = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleNavClick = (id, event) => {
    event.preventDefault();
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required.";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address.";
    }

    if (!formData.message.trim()) {
      errors.message = "Message is required.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
    setSubmitMessage("");
    setSubmitStatus("");
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage("");
    setSubmitStatus("");

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error("Email service configuration is missing.");
      }

      await emailjs.send(serviceId, templateId, {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
      }, publicKey);

      setSubmitStatus("success");
      setSubmitMessage("Your message has been sent successfully. I will get back to you soon.");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setSubmitStatus("error");
      setSubmitMessage("Sorry, something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const skillGroups = [
    {
      title: "Frontend",
      skills: [
        { name: "HTML5", icon: <FaHtml5 /> },
        { name: "CSS3", icon: <FaCss3Alt /> },
        { name: "JavaScript (ES6+)", icon: <FaJsSquare /> },
        { name: "React.js", icon: <FaReact /> },
        { name: "Responsive Web Design", icon: <FaMobileAlt /> },
      ],
    },
    {
      title: "Backend",
      skills: [
        { name: "Node.js", icon: <FaNodeJs /> },
        { name: "Express.js", icon: <SiExpress /> },
        { name: "Firebase", icon: <FaFire /> },
      ],
    },
    {
      title: "Database",
      skills: [{ name: "MySQL", icon: <FaDatabase /> }],
    },
    {
      title: "Tools & Technologies",
      skills: [
        { name: "Git", icon: <FaGitAlt /> },
        { name: "GitHub", icon: <FaGithub /> },
        { name: "VS Code", icon: <FaCode /> },
        { name: "Postman", icon: <SiPostman /> },
      ],
    },
  ];

  return (
    <div className="portfolio-app">
      <Navbar activeSection={activeSection} onNavClick={handleNavClick} />

      <section className="hero reveal-section" id="home">
        <div className="hero-text">
          <h3>Hello, I'm 👋</h3>

          <h1>Chandana Arpula</h1>

          <h2>Full Stack Developer</h2>

          <p>
            Passionate Full Stack Developer and AI & ML student.
            I enjoy building responsive web applications using
            React, JavaScript, HTML, CSS and Node.js.
          </p>

          <div className="buttons">
            <button onClick={() => window.open("/resume.pdf", "_blank", "noopener,noreferrer")}>View Resume</button>
            <button className="contact-btn" onClick={handleContactClick}>Contact Me</button>
          </div>
        </div>

        <div className="hero-image">
          <img src={profile} alt="Profile" />
        </div>
      </section>

      <section className="contact-section reveal-section" id="about">
        <h2>About Me</h2>
        <p>
          I am Chandhana Arpula, an aspiring B.Tech student in Artificial Intelligence & Machine Learning with a Diploma in Electronics. I am a Full Stack Developer and currently working as a Backend Developer Intern, building responsive, user-friendly, and scalable web applications. I am passionate about learning new technologies, solving real-world problems, and continuously improving my technical skills. My goal is to become a skilled Software Engineer and contribute to innovative software solutions that create meaningful impact.
        </p>
      </section>

      <section className="contact-section skills-section reveal-section" id="skills">
        <h2>Technical Skills</h2>
        {skillGroups.map((group) => (
          <div className="skill-group" key={group.title}>
            <h3>{group.title}</h3>
            <div className="skills-grid">
              {group.skills.map((skill) => (
                <div className="skill-card" key={skill.name}>
                  <span className="skill-icon">{skill.icon}</span>
                  <span>{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="contact-section" id="projects">
        <h2>Projects</h2>

        <div className="project-card">
          <div className="experience-icon">
            <FaCode />
          </div>
          <div className="project-content">
            <h3>Online Complaint Management System</h3>
            <p className="experience-duration">December 2025 – June 2026</p>
            <ul>
              <li>Developed a web-based complaint management system to streamline complaint registration and tracking.</li>
              <li>Enabled users to submit complaints and monitor their complaint status online.</li>
              <li>Improved complaint handling, transparency, and response time through an organized workflow.</li>
              <li>Implemented backend data management for secure storage and retrieval of complaint records.</li>
            </ul>
            <p className="project-tech"><strong>Technologies:</strong> HTML5, CSS3, JavaScript, React.js, Node.js, Express.js, MySQL</p>
            <div className="project-links">
              <a href="#" className="certificate-btn">GitHub</a>
              <a href="#" className="certificate-btn">Live Demo</a>
            </div>
          </div>
        </div>

        <div className="project-card">
          <div className="experience-icon">
            <FaCode />
          </div>
          <div className="project-content">
            <h3>Smart Electricity Billing System</h3>
            <p className="experience-duration">February 2025 – June 2025</p>
            <ul>
              <li>Developed an automated electricity billing system to calculate and generate consumer bills.</li>
              <li>Recorded electricity usage data and generated accurate billing information.</li>
              <li>Reduced manual errors and improved billing efficiency through automation.</li>
              <li>Designed a structured database for efficient consumer and billing data management.</li>
            </ul>
            <p className="project-tech"><strong>Technologies:</strong> HTML5, CSS3, JavaScript, MySQL</p>
            <div className="project-links">
              <a href="#" className="certificate-btn">GitHub</a>
              <a href="#" className="certificate-btn">Live Demo</a>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-section" id="certifications">
        <h2>Certifications</h2>
        <div className="certifications-grid">
          <div className="certification-card">
            <div className="certification-icon"><FaAward /></div>
            <div className="certification-content">
              <h3>Artificial Intelligence Fundamentals</h3>
              <p><strong>Organization:</strong> IBM SkillsBuild</p>
              <p><strong>Completion Date:</strong> March 25, 2025</p>
              <a href="/certifications/artificial%20intelligence%20fundamentals.jpeg" className="certificate-btn" target="_blank" rel="noopener noreferrer">View Certificate</a>
            </div>
          </div>

          <div className="certification-card">
            <div className="certification-icon"><FaAward /></div>
            <div className="certification-content">
              <h3>Customer Engagement: Problem Solving and Process Controls</h3>
              <p><strong>Organization:</strong> IBM SkillsBuild</p>
              <p><strong>Completion Date:</strong> March 26, 2025</p>
              <a href="/certifications/customer%20engagement%20problem%20solving%20and%20process%20control.jpeg" className="certificate-btn" target="_blank" rel="noopener noreferrer">View Certificate</a>
            </div>
          </div>

          <div className="certification-card">
            <div className="certification-icon"><FaAward /></div>
            <div className="certification-content">
              <h3>Introduction to Internet of Things (IoT)</h3>
              <p><strong>Organization:</strong> NPTEL (IIT Kharagpur)</p>
              <p><strong>Achievement:</strong> Silver Badge</p>
              <p><strong>Duration:</strong> July 2025 – October 2025</p>
              <a href="/certifications/NPTEL%20iot.jpeg" className="certificate-btn" target="_blank" rel="noopener noreferrer">View Certificate</a>
            </div>
          </div>

          <div className="certification-card">
            <div className="certification-icon"><FaAward /></div>
            <div className="certification-content">
              <h3>Cloud Computing</h3>
              <p><strong>Organization:</strong> NPTEL (IIT Kharagpur)</p>
              <p><strong>Achievement:</strong> Elite Certificate</p>
              <p><strong>Duration:</strong> July 2025 – October 2025</p>
              <a href="/certifications/NPTEL%20cloud.jpeg" className="certificate-btn" target="_blank" rel="noopener noreferrer">View Certificate</a>
            </div>
          </div>

          <div className="certification-card">
            <div className="certification-icon"><FaAward /></div>
            <div className="certification-content">
              <h3>Programming in Java</h3>
              <p><strong>Organization:</strong> NPTEL (IIT Kharagpur)</p>
              <p><strong>Achievement:</strong> Gold Badge</p>
              <p><strong>Duration:</strong> January 2026 – April 2026</p>
              <a href="/certifications/NPTEL%20java.jpeg" className="certificate-btn" target="_blank" rel="noopener noreferrer">View Certificate</a>
            </div>
          </div>

          <div className="certification-card">
            <div className="certification-icon"><FaAward /></div>
            <div className="certification-content">
              <h3>Generative AI &amp; Agentic AI Workshop</h3>
              <p><strong>Organization:</strong> Lyntra Data</p>
              <p><strong>Certificate Type:</strong> Workshop Participation Certificate</p>
              <p><strong>Description:</strong> Successfully participated in a one-day Generative AI &amp; Agentic AI Workshop and gained practical knowledge of Generative AI, AI Agents, and modern AI applications.</p>
              <p><strong>Year:</strong> 2026</p>
              <a href="/certifications/gen%20ai%20certificate.jpeg" className="certificate-btn" target="_blank" rel="noopener noreferrer">View Certificate</a>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-section reveal-section" id="experience">
        <h2>Work Experience</h2>
        <div className="experience-card">
          <div className="experience-icon">
            <FaBriefcase />
          </div>
          <div className="experience-content">
            <h3>Full Stack Developer Intern</h3>
            <p className="experience-company">Sammridhi Anveshna Pvt. Ltd.</p>
            <p className="experience-duration">Present</p>
            <ul>
              <li>Working on a full-stack web application.</li>
              <li>Collaborating with the development team using Git and GitHub.</li>
              <li>Contributing to frontend and backend development tasks.</li>
              <li>Participating in documentation, technical stack analysis, and knowledge transfer sessions.</li>
              <li>Learning and working with React, Firebase, and modern project architecture.</li>
            </ul>
            <a href="#" className="certificate-btn">View Certificate</a>
          </div>
        </div>

        <div className="experience-card">
          <div className="experience-icon">
            <FaBriefcase />
          </div>
          <div className="experience-content">
            <h3>Industrial Trainee</h3>
            <p className="experience-company">Radiant Appliances and Electronics Pvt. Ltd.</p>
            <p className="experience-duration">June 2023 – November 2023</p>
            <ul>
              <li>Received practical training in electronics systems and device testing procedures.</li>
              <li>Assisted in TV sound quality testing and audio performance evaluation.</li>
              <li>Performed TV display inspection and screen quality verification.</li>
              <li>Gained hands-on experience in troubleshooting electronic components and quality control processes.</li>
              <li>Strengthened technical knowledge, teamwork, and problem-solving skills in a professional manufacturing environment.</li>
            </ul>
            <a href="/certifications/radiant.jpeg" className="certificate-btn" target="_blank" rel="noopener noreferrer">View Certificate</a>
          </div>
        </div>
      </section>

      <section className="contact-section" id="education">
        <h2>Education</h2>
        <div className="education-grid">
          <div className="education-card">
            <div className="education-icon"><FaBriefcase /></div>
            <div className="education-content">
              <h3>Bachelor of Technology (B.Tech) – Computer Science and Engineering (Artificial Intelligence & Machine Learning)</h3>
              <p><strong>Institution:</strong> AVN Institute of Engineering and Technology, Rangareddy, Hyderabad</p>
              <p><strong>Duration:</strong> 2024 – 2027 (Pursuing)</p>
              <p><strong>CGPA:</strong> 7.66</p>
            </div>
          </div>

          <div className="education-card">
            <div className="education-icon"><FaBriefcase /></div>
            <div className="education-content">
              <h3>Diploma in Electronics and Communication Engineering</h3>
              <p><strong>Institution:</strong> Kodada Institute of Technology and Science for Women, Kodad, Suryapet</p>
              <p><strong>Duration:</strong> 2021 – 2024</p>
              <p><strong>CGPA:</strong> 8.44</p>
            </div>
          </div>

          <div className="education-card">
            <div className="education-icon"><FaBriefcase /></div>
            <div className="education-content">
              <h3>Secondary School Certificate (SSC)</h3>
              <p><strong>Institution:</strong> Gitanjali Vidyaniketan, Khammam</p>
              <p><strong>Duration:</strong> 2011 – 2021</p>
              <p><strong>CGPA:</strong> 10.0</p>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <h2>Contact Me</h2>
        <div className="contact-links">
          <a href="mailto:chandhanaarpula@gmail.com">
            <MdEmail /> chandhanaarpula@gmail.com
          </a>
          <a href="https://www.linkedin.com/in/chandana-arpula" target="_blank" rel="noreferrer">
            <FaLinkedin /> LinkedIn
          </a>
          <a href="https://github.com/chandhanaarpula" target="_blank" rel="noreferrer">
            <FaGithub /> GitHub
          </a>
          <a href="tel:+1234567890">
            <FaPhone /> +91 9948434379
          </a>
          <a href="https://maps.google.com/?q=Your+Location" target="_blank" rel="noreferrer">
            <FaLocationDot /> Khammam,Telangana
          </a>
        </div>

        <form className="contact-form" onSubmit={handleFormSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your name"
            />
            {formErrors.name && <span className="form-error">{formErrors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Your email"
            />
            {formErrors.email && <span className="form-error">{formErrors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Your message"
            />
            {formErrors.message && <span className="form-error">{formErrors.message}</span>}
          </div>

          <button type="submit" className="contact-form-btn" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>

          {submitMessage && (
            <p className={`form-status ${submitStatus}`}>{submitMessage}</p>
          )}
        </form>
      </section>

      {showBackToTop && (
        <button type="button" className="back-to-top" onClick={scrollToTop} aria-label="Back to top">
          ↑
        </button>
      )}
    </div>
  );
}

export default App;