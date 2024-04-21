import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Join() {
  return (
    <>
      <Navbar />
      <Hero
        cName="hero"
        showOpportunities={true}
        showInspirations={false}
        // showImage={false}
        // HeroImg="https://images.collegedunia.com/public/college_data/images/campusimage/16115511209.jpg"
      />
      <Footer />
    </>
  );
}

export default Join;
