import React, { useState, useEffect } from "react";
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
  FormHelperText,
  Input,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@material-ui/core";
import {Link} from 'react-router-dom'
import "./Home.css";

const Home = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    (function () {
      fetch("/api/v1/movies")
        .then((data) => data.json())
        .then((data) => setData(data.movies))
        .catch((err) => console.log(err));
    })();
  }, []);
  // useEffect(() => {

  // })
  const [age, setAge] = React.useState("");
  const [username, setUsername] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <div className="home">
      <Header />
      <div className="heading">Upcoming Movies</div>
      <div className="home-movies-root" style={{ width: "100%" }}>
        {data && (
          <GridList className="gridList" cellHeight={250}>
            {data &&
              data.filter(m => m.status === 'RELEASED').map((tile) => (
                <Link to={`/movie/${tile.id}`} style={{ width: 'inherit', height: 'inherit'}}>
                <GridListTile key={tile.id} style={{ width: "inherit" }}>
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
          {data && (
            <GridList cellHeight={350} cols={4}>
              {data &&
                // data.filter(m => m.status === 'PUBLISHED')
                data.map((tile) => (
                  <Link to={`/movie/${tile.id}`} style={{ width: 'inherit', height: 'inherit'}}>
                  <GridListTile
                    key={tile.id}
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
        <div className="filter-movies">
          <Card>
            <CardContent>
              <CardHeader title={"FIND MOVIES BY:"} />
              <FormControl fullWidth>
                <InputLabel htmlFor="my-input">Movie Name</InputLabel>
                <Input
                  required
                  name="firstName"
                  aria-describedby="my-helper-text"
                />
              </FormControl>
              <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  Age
                </InputLabel>
                <Select
                  labelid="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={age}
                  onChange={handleChange}
                  label="Genres"
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  Age
                </InputLabel>
                <Select
                  labelid="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={age}
                  onChange={handleChange}
                  label="Genres"
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
              <FormControl style={{ display: "block", paddingBottom: "20px" }}>
                <TextField
                  id="standard-number"
                  label="Release Start Date"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="standard"
                />
              </FormControl>
              <FormControl style={{ display: "block", paddingBottom: "20px" }}>
                <TextField
                  id="standard-number"
                  label="Release End Date"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="standard"
                />
              </FormControl>
              <Button variant="contained" color="primary" type="submit">
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
