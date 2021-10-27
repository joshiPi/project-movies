import React, { useState, useEffect } from "react";
import {encode} from 'querystring';
import Header from "../../common/header/Header";
import {
  GridListTileBar,
  GridListTile,
  GridList,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  InputLabel,
  Input,
  Select,
  MenuItem,
  TextField,
  Button,
  Checkbox,
  ListItemText,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [data, setData] = useState(null);
  const [dataRelease, setDataRelease] = useState(null);
  const [callAgain, setCallAgain] = useState(true);
  useEffect(() => {
    (function () {
      fetch("/api/v1/movies")
        .then((data) => data.json())
        .then((data) => setData(data.movies))
        .catch((err) => console.log(err));
    })();
  }, []);
  const [genres, setGenres] = useState([]);
  useEffect(() => {
    (function () {
      fetch("/api/v1/genres?limit=999")
        .then((data) => data.json())
        .then((data) => setGenres(data.genres))
        .catch((err) => console.log(err));
    })();
  }, []);
  const [artists, setArtist] = useState([]);
  useEffect(() => {
    (function () {
      fetch("/api/v1/artists?limit=999")
        .then((data) => data.json())
        .then((data) => setArtist(data.artists))
        .catch((err) => console.log(err));
    })();
  }, []);
  useEffect(() => {
    (function () {
      const opts = {
        params: {
          genre: filterGenres.toString(),
          artists: filterArtist.toString(),
          title: movieName,
          start_date: releaseDate,
          end_dat: releaseDateEnd,
        },
      };
      console.log(encode(opts.params))
      fetch(`/api/v1/movies?${encode(opts.params)}`)
        .then((data) => data.json())
        .then((data) => setDataRelease(data.movies))
        .catch((err) => console.log(err));
    })();
  }, [callAgain]);
  const [filterGenres, setFilterGenres] = useState([]);
  const [filterArtist, setFilterArtist] = useState([]);
  const [movieName, setMovieName] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [releaseDateEnd, setReleaseDateEnd] = useState("");

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setFilterGenres(
      // On autofill we get a the stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const handleChangeArtist = (event) => {
    const {
      target: { value },
    } = event;
    setFilterArtist(
      // On autofill we get a the stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  return (
    <div className="home">
      <Header />
      <div className="heading">Upcoming Movies</div>
      <div className="home-movies-root" style={{ width: "100%" }}>
        {data && (
          <GridList className="gridList" cellHeight={250}>
            {data &&
              data
                .filter((m) => m.status === "RELEASED")
                .map((tile) => (
                  <Link
                    to={`/movie/${tile.id}`}
                    style={{ width: "inherit", height: "inherit" }} key={tile.id}

                  >
                    <GridListTile style={{ width: "inherit" }}>
                      <img
                        className="grid-image"
                        src={tile.poster_url}
                        alt={tile.title}
                      />
                      <GridListTileBar title={tile.title} />
                    </GridListTile>
                  </Link>
                ))}
          </GridList>
        )}
      </div>
      <div className="upcoming-movies">
        <div className="filtered-movie-section">
          {dataRelease && (
            <GridList cellHeight={350} cols={4}>
              {dataRelease &&
                // data.filter(m => m.status === 'PUBLISHED')
                dataRelease
                  // .filter((m) => m.status === "PUBLISHED")
                  .map((tile) => (
                    <Link
                      to={`/movie/${tile.id}`}
                      style={{ width: "inherit", height: "inherit" }}
                      key={tile.id}
                    >
                      <GridListTile
                        style={{ margin: "16px 16px 0 0" }}
                      >
                        <img src={tile.poster_url} alt={tile.title} />
                        <GridListTileBar title={tile.title} />
                      </GridListTile>
                    </Link>
                  ))}
            </GridList>
          )}
        </div>
        <div className="filter-movies" style={{ minWidth: "240px" }}>
          <Card>
            <CardContent>
              <CardHeader title={"FIND MOVIES BY:"} />
              <FormControl fullWidth style={{ padding: "10px 0" }}>
                <InputLabel htmlFor="my-input">Movie Name</InputLabel>
                <Input
                  required
                  name="firstName"
                  aria-describedby="my-helper-text"
                  value={movieName}
                  onChange={(e) => setMovieName(e.target.value)}
                />
              </FormControl>
              <FormControl fullWidth style={{ padding: "10px 0" }}>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  Genres
                </InputLabel>
                <Select
                  multiple
                  labelid="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={filterGenres}
                  onChange={handleChange}
                  renderValue={(selected) => selected.join(", ")}
                  label="Genres"
                >
                  {genres.map((genre) => (
                    <MenuItem key={genre.id} value={genre.genre}>
                      <Checkbox
                        checked={filterGenres.indexOf(genre.genre) > -1}
                      />
                      <ListItemText primary={genre.genre} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth style={{ padding: "10px 0" }}>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  Artists
                </InputLabel>
                <Select
                  labelid="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  multiple
                  value={filterArtist}
                  renderValue={(selected) => selected.join(", ")}
                  onChange={handleChangeArtist}
                  label="Genres"
                >
                  {artists.map((artist) => (
                    <MenuItem
                      key={artist.id}
                      value={artist.first_name + " " + artist.last_name}
                    >
                      <Checkbox
                        checked={
                          filterArtist.indexOf(
                            artist.first_name + " " + artist.last_name
                          ) > -1
                        }
                      />
                      <ListItemText
                        primary={artist.first_name + " " + artist.last_name}
                      />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl style={{ display: "block", padding: "20px 0" }}>
                <TextField
                  fullWidth
                  id="standard-number"
                  label="Release Start Date"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="standard"
                  onChange={(e) => setReleaseDate(e.target.value)}
                />
              </FormControl>
              <FormControl style={{ display: "block", paddingBottom: "20px" }}>
                <TextField
                  fullWidth
                  id="standard-number"
                  label="Release End Date"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="standard"
                  onChange={(e) => setReleaseDateEnd(e.target.value)}
                />
              </FormControl>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                onClick={() => setCallAgain(!callAgain)}
              >
                APPLY
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
