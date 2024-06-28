import React from "react";
import Navbar from "../components/Navbar";
import AboutImg from "../assets/unipal_logo.png";
import Footer from "../components/Footer";
import "./About.css";

const About = () => {
  return (
    <>
      <Navbar />
      <div className="hero">
        <img className="HeroImg" src={AboutImg} alt="About Hero Image" />
        <div className="hero-text">
          <h1>
            Revolutionizing <span style={{ color: "#DF921C" }}>E-Commerce</span>
          </h1>
          <p>Greetings! Welcome to UniPal Thapar University</p>
          <p>
            the vibrant marketplace designed by students, for students
          </p>
          <p>Join us at UniPal and discover a treasure trove of gently used items,</p>
          <p> from textbooks to furniture, all at student-friendly prices.</p>
          <a href="/" className="show">Explore</a>
        </div>
      </div>
      <div className="maintext">
        <div className="text">
          <div className="text-section1">
            <h3>
              About <span style={{ color: "#DF921C" }}>UniPal</span>
            </h3>
            <p>
              Discover UniPal, the student-centric marketplace fostering sustainability and affordability on campus. Buy and sell second-hand items with ease, creating connections and opportunities within our college community.
            </p>
          </div>
          <div className="line"></div>
          <div className="text-section2">
            <h3>
              Our <span style={{ color: "#DF921C" }}>Mission</span>
            </h3>
            <p>
              Our mission at UniPal is to promote a sustainable campus culture through the exchange of pre-loved goods. We aim to reduce waste, empower students, and foster affordability while embracing the principles of the circular economy.
            </p>
          </div>
          <div className="line"></div>
          <div className="text-section3">
            <h3>
              About <span style={{ color: "#DF921C" }}>Us</span>
            </h3>
            <p>
              UniPal is a student-led initiative dedicated to building a vibrant marketplace for our college community. We're committed to providing a convenient platform for students to buy and sell second-hand items, promoting sustainability and campus connections.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
