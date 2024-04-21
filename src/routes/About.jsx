import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import AboutImg from "../assets/yellowlogo.png";
import Footer from "../components/Footer";
import MainText from "../components/MainText";

function About() {
  return (
    <>
      <Navbar />
      <Hero
        cName="hero"
        HeroImg={AboutImg}
        title="Revolutionizing"
        title1="E-Commerce"
        text="Greetings! Welcome to UniMart Thapar University"
        text1=" the vibrant marketplace designed by students, for students"
        text2="Join us at Unimart and discover a treasure trove of 
        gently "
        text3="used items, from textbooks to furniture, all at student-friendly prices."
        buttonText="Explore"
        url="/"
        btnClass="show"
        showOpportunities={false}// Set to true or false based on your requirements
        showInspirations={false}
        showImage={true}
      />
      <MainText />
      <Footer />
    </>
  );
}

export default About;
