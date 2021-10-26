import React, { useEffect, useState } from "react";
import {
  Typography,
  GridList,
  GridListTile,
  GridListTileBar,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import YouTube from "react-youtube";
import "./Details.css";
import Header from "../../common/header/Header";
import StarBorderIcon from "@material-ui/icons/StarBorder";

const Details = () => {
  // const classes = useStyles();
  const [movie, setMovie] = useState("");
  const [stars, setStars] = useState(0);
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
      <div className="details">
        <div className="left-section">
          <Typography className="back-link">
            <Link to={"/"}>&#60; Back to Movie Details</Link>
          </Typography>
          {!!movie && (
            <img className="movie-img" src={movie.poster_url} alt="poster" />
          )}
        </div>
        <div className="middle-section">
          <Typography type="h2" variant={"headline"}>
            {movie.title}
          </Typography>
          <div>
            <div>
              <Typography inline style={{ fontWeight: 600 }}>
                Genres:{" "}
              </Typography>
              {!!movie &&
                movie.genres.map((i, index) => (
                  <Typography inline key={index}>
                    {i + ", "}
                  </Typography>
                ))}
            </div>
            <div>
              <Typography inline style={{ fontWeight: 600 }}>
                Duration:{" "}
              </Typography>
              {!!movie && <Typography inline>{movie.duration}</Typography>}
            </div>
            <div>
              <Typography inline style={{ fontWeight: 600 }}>
                Release Date:{" "}
              </Typography>
              {!!movie && <Typography inline>{movie.release_date}</Typography>}
            </div>
            <div>
              <Typography inline style={{ fontWeight: 600 }}>
                Rating:{" "}
              </Typography>
              {!!movie && <Typography inline>{movie.rating}</Typography>}
            </div>
            <div style={{ marginTop: "16px" }}>
              <Typography inline style={{ fontWeight: 600 }}>
                Plot:{" "}
              </Typography>
              {!!movie && (
                <Typography inline>
                  <span>
                    <a href={movie.wiki_url}>(Wiki Link)</a>
                  </span>
                  {movie.storyline}
                </Typography>
              )}
            </div>
            <div style={{ marginTop: "16px" }}>
              <Typography style={{ fontWeight: 600 }}>Trailer:</Typography>
              {movie && (
                <YouTube videoId={movie.trailer_url.split("=").pop()} />
              )}
            </div>
          </div>
        </div>
        <div className="right-section">
          <div>
            <Typography style={{ fontWeight: 600 }}>
              Rate this movie:{" "}
            </Typography>
            <StarBorderIcon
              onClick={() => setStars(1)}
              nativeColor={stars >= 1 && stars != 0 ? "yellow" : "black"}
            />
            <StarBorderIcon
              onClick={() => setStars(2)}
              nativeColor={stars >= 2 && stars != 0 ? "yellow" : "black"}
            />
            <StarBorderIcon
              onClick={() => setStars(3)}
              nativeColor={stars >= 3 && stars != 0 ? "yellow" : "black"}
            />
            <StarBorderIcon
              onClick={() => setStars(4)}
              nativeColor={stars >= 4 && stars != 0 ? "yellow" : "black"}
            />
            <StarBorderIcon
              onClick={() => setStars(5)}
              nativeColor={stars >= 5 && stars != 0 ? "yellow" : "black"}
            />
          </div>
          <div style={{ marginTop: "16px" }}>
            <Typography inline style={{ fontWeight: 600 }}>
              Artists:{" "}
            </Typography>
            {movie && !!movie.artists.length && (
              <GridList className="gridList details-gridList" style={{ marginTop: "16px" }}>
                {movie.artists.map((tile) => (
                  <GridListTile
                    key={tile.id}
                    style={{ width: "inherit" }}
                    cols={2}
                  >
                    <img
                      className="grid-image"
                      src={tile.profile_url}
                      alt={tile.first_name + tile.last_name}
                    />
                    <GridListTileBar
                      title={tile.first_name + " " + tile.last_name}
                    />
                  </GridListTile>
                ))}
              </GridList>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
