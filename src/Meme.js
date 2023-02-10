import React from "react";

export default function Meme() {

  let [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    randomImage: "../images/placeholder.jpg",
  });

  let [allMeme, setAllMeme] = React.useState([]);

  React.useEffect(function () {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((data) => setAllMeme(data.data.memes));
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevmeme) => {
      return {
        ...prevmeme,
        [name]: value,
      };
    });
  }

  function randomImage() {
    let data = allMeme;
    let randomNumber = Math.floor(Math.random() * data.length);
    let url = allMeme[randomNumber].url;
    setMeme((prevMeme) => {
      return {
        ...prevMeme,
        randomImage: url,
      };
    });
  }
  return (
    <main>
      <div className="form">
        <input
          type="text"
          name="topText"
          value={meme.topText}
          placeholder="Top text"
          className="form--input"
          onChange={handleChange}
        />
        <input
          type="text"
          name="bottomText"
          value={meme.bottomText}
          placeholder="Bottom text"
          className="form--input"
          onChange={handleChange}
        />
      </div>
      <div className="button-div">
        <button onClick={randomImage} className="form--button">
          Get a new meme image 🖼
        </button>
      </div>
      <div className="img-div">
        <img className="meme-image" src={meme.randomImage} alt="meme-img" />
        <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2>
      </div>
    </main>
  );
}
