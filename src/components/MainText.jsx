import "./MainTextStyles.css";

const MainText = () => {
  return (
    <div className="maintext">
      <div className="text">
        <div1>
          <h3>
            About <span style={{ color: "#DF921C" }}>UniMart</span>
          </h3>
          <p>
          Discover Unimart, the student-centric marketplace fostering 
          sustainability and affordability on campus. Buy and sell 
          second-hand items with ease, creating connections and opportunities
           within our college community.
          </p>
        </div1>
        <div className="line"></div>
        <div2>
          <h3>
            Our <span style={{ color: "#DF921C" }}>Mission</span>
          </h3>
          <p>
          Our mission at Unimart is to promote a sustainable campus culture through the exchange of pre-loved goods. We aim to reduce waste, empower students, and foster affordability while embracing the principles of the circular economy.
          </p>
        </div2>
        <div className="line"></div>
        <div></div>
        <div3>
          <h3>
            About <span style={{ color: "#DF921C" }}>Us</span>
          </h3>
          <p>
          Unimart is a student-led initiative dedicated to building a vibrant marketplace for our college community. We're committed to providing a convenient platform for students to buy and sell second-hand items, promoting sustainability and campus connections.
          </p>
        </div3>
      </div>
    </div>
  );
};

export default MainText;
