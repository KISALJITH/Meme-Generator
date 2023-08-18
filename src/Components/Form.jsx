import React from "react";
import "./Form-styles.css";
import memeData from "./memeData";
import html2canvas from "html2canvas";

function Form() {
  //------------------------------------------------------------------------------------------------------------------
  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
  });
  const [allMemeImages, setAllMemeImages] = React.useState([]);

  React.useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setAllMemeImages(data.data.memes));
  }, []);

  function imageGenerator() {
    const randomNumber = Math.floor(Math.random() * allMemeImages.length);
    const url = allMemeImages[randomNumber].url;
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
    }));
  }

  function downloadImg() {
    const toDownload = document.getElementById("image-divv");
    console.log(html2canvas(toDownload));
    html2canvas(toDownload, {
      logging: true,
      letterRendering: 1,
      allowTaint: false,
      useCORS: true,
    }).then(function (canvas) {
      const link = document.createElement("a");
      link.download = "meme.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  }

  function handleUploadImg(event) {
    console.log(event.target.files);
    setMeme((prev) => ({
      ...prev,
      randomImage: URL.createObjectURL(event.target.files[0]),
    }));
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }
  //-----------------------------------------------------------------------------------------------------------------------------

  return (
    <div className="form-outer">
      <div className="input-feilds">
        <label>First quoate</label>
        <label>Second quoate quoate</label>
        <input
          className="text"
          type="text"
          placeholder="Enter first line of quote"
          name="topText"
          value={meme.topText}
          onChange={handleChange}
        />
        <input
          className="text"
          type="text"
          placeholder="Enter second line of quote"
          name="bottomText"
          value={meme.bottomText}
          onChange={handleChange}
        />

        <button className="get-image-btn" onClick={imageGenerator}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-upload"
            viewBox="0 0 16 16"
          >
            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
            <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z" />
          </svg>
          Get new Image
        </button>

        <input
          className="custom-file-input"
          type="file"
          accept=".png, .jpg, .jpeg"
          onChange={handleUploadImg}
        />
      </div>

      <div className="image-div" id="image-divv">
        <img src={meme.randomImage} className="meme--image" id="image1" />
        <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2>
      </div>

      <button className="download-btn" onClick={downloadImg}>
        Download Image
      </button>
    </div>
  );
}

export default Form;
