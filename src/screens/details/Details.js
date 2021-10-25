import React, { useEffect, useState } from "react";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import "./Details.css";
import Header from "../../common/header/Header";

const Details = () => {
  const [movie, setMovie] = useState("");
  useEffect(() => {
    const id = window.location.pathname.split("/").pop();
    fetch(`/api/v1/movies/${id}`)
      .then((data) => data.json())
      .then((data) => setMovie(data))
      .catch((error) => console.log(error));
  }, []);
  return (
    <div>
      <Header />
      <div className="section-left">
        <Typography className="back-link">
          <Link to={"/"}>&#60; Back to Movie Details</Link>
        </Typography>
        {!!movie && (
          <img className="movie-img" src={movie.poster_url} alt="poster" />
        )}
      </div>
      <div className="middle-section">
        <Typography type="h2" variant={"headline"}>{movie.title}</Typography>
      </div>
    </div>
  );
};

export default Details;
