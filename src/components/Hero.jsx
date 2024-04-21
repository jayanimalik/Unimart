import "./HeroStyles.css";

function Hero(props) {
  return (
    <>
      <div className={props.cName}>
        {props.showImage && <img className="HeroImg" src={props.HeroImg} />}
        <div className="hero-text">
          <h1>
            {props.title} <span style={{ color: "#DF921C" }}>University</span>
          </h1>
          <h1>
            {props.title1}{" "}
          </h1>
          <p>{props.text}</p>
          <p>{props.text1}</p>
          <p>{props.text2}</p>
          <p>{props.text3}</p>
          <p>{props.text4}</p>
          <a href={props.url} className={props.btnClass}>
            {props.buttonText}
          </a>
        </div>
      </div>
    </>
  );
}

export default Hero;
