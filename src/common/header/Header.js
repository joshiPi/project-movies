import {
  Button,
  Tabs,
  Tab,
  FormControl,
  Input,
  InputLabel,
} from "@material-ui/core";
import React, { useRef, useState } from "react";
import logo from "./logo.svg";
import "./Header.css";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const Header = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [userRegistered, setUserRegistered] = useState(false)

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  const loginFormSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.elements.username.value, e.target.elements.password.value)
    // const opts = {

    // }
  }
  const registerFormSubmit = (e) => {
    e.preventDefault();
    const opts = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Accept": "application/json;charset=UTF-8"
      },
      body: JSON.stringify({
        email_address: e.target.elements.email.value,
        first_name: e.target.elements.firstName.value, 
        last_name: e.target.elements.lastName.value,
        mobile_number: e.target.elements.contactNo.value,
        password: e.target.elements.password.value,
      })
    }
    fetch('/api/v1/signup', opts)
    .then(data => data.json())
    .then(data => {console.log(data);setUserRegistered(true);global.localStorage.setItem('user-registered', true)})
    .catch(e => {console.log(e)})
  }

  const Form = () => {
    return (
      <div>
      {tabValue === 0 && (
        <form className="login-form" onSubmit={(e) => loginFormSubmit(e)}>
            <FormControl
              style={{
                display: "block",
                paddingBottom: "20px",
                marginTop: "20px",
              }}
            >
              <InputLabel htmlFor="my-input">Username*</InputLabel>
              <Input
                id="input-required"
                name="username"
                key="my-input-1"
                required
              />
            </FormControl>
            <FormControl style={{ display: "block", paddingBottom: "40px" }}>
              <InputLabel htmlFor="my-input">Password*</InputLabel>
              <Input
                name="password"
                required
              />
            </FormControl>
            <Button variant="contained" color="primary" type="submit"> 
              LOGIN
            </Button>
          </form>
      )}
      {tabValue === 1 && (
          <form className="login-form" onSubmit={(e) => registerFormSubmit(e)}>
            <FormControl style={{ display: "block", paddingBottom: "20px" }}>
              <InputLabel htmlFor="my-input">First Name*</InputLabel>
              <Input required name="firstName" aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl style={{ display: "block", paddingBottom: "20px" }}>
              <InputLabel htmlFor="my-input">Last Name*</InputLabel>
              <Input required name="lastName" aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl style={{ display: "block", paddingBottom: "20px" }}>
              <InputLabel htmlFor="my-input">Email*</InputLabel>
              <Input required name="email" aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl style={{ display: "block", paddingBottom: "20px" }}>
              <InputLabel htmlFor="my-input">Password*</InputLabel>
              <Input required name="password" aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl style={{ display: "block", paddingBottom: "40px" }}>
              <InputLabel htmlFor="my-input">Contact No.*</InputLabel>
              <Input required name="contactNo" aria-describedby="my-helper-text" />
            </FormControl>
            <Button variant="contained" color="primary" type="submit">
              REGISTER
            </Button>
          </form>
        )}
      </div>
    )
  }
  const AuthenticationModal = () => {
    return (
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        shouldFocusAfterRender={false}
        preventScroll={false}
        ariaHideApp={false}
      >
        <Tabs value={tabValue} onChange={() => setTabValue(tabValue ? 0 : 1)}>
          <Tab label="LOGIN" />
          <Tab label="REGISTER" />
        </Tabs>
        <Form  key="my-super-form"/>
        {/* {tabValue === 0 && (
          <form className="login-form" onSubmit={(e) => {console.log(e);formSubmit(e)}}>
            <FormControl
              style={{
                display: "block",
                paddingBottom: "20px",
                marginTop: "20px",
              }}
            >
              <InputLabel htmlFor="my-input">Username*</InputLabel>
              <Input
                id="my-input"
                defaultValue={userName}
                key="user-input"
                onChange={(e) => setUserName(e.target.value)}
              />
            </FormControl>
            <FormControl style={{ display: "block", paddingBottom: "40px" }}>
              <InputLabel htmlFor="my-input">Password*</InputLabel>
              <Input
                id="my-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Button variant="contained" color="primary" onClick={loginHandler}> 
              LOGIN
            </Button>
          </form>
        )}
        {tabValue === 1 && (
          <div className="login-form">
            <FormControl style={{ display: "block", paddingBottom: "20px" }}>
              <InputLabel htmlFor="my-input">First Name*</InputLabel>
              <Input id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl style={{ display: "block", paddingBottom: "20px" }}>
              <InputLabel htmlFor="my-input">Last Name*</InputLabel>
              <Input id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl style={{ display: "block", paddingBottom: "20px" }}>
              <InputLabel htmlFor="my-input">Email*</InputLabel>
              <Input id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl style={{ display: "block", paddingBottom: "20px" }}>
              <InputLabel htmlFor="my-input">Password*</InputLabel>
              <Input id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            <FormControl style={{ display: "block", paddingBottom: "40px" }}>
              <InputLabel htmlFor="my-input">Contact No.*</InputLabel>
              <Input id="my-input" aria-describedby="my-helper-text" />
            </FormControl>
            <Button variant="contained" color="primary">
              REGISTER
            </Button>
          </div>
        )} */}
      </Modal>
    );
  };
  return (
    <div className="header">
      <div className="header__logo rotate linear infinite">
        <img className="header__logo--image" src={logo} />
      </div>
      <AuthenticationModal />
      <div className="header__buttons">
        <Button
          variant="contained"
          color="primary"
          style={{ marginRight: "8px" }}
        >
          Book Show
        </Button>
        <Button variant="contained" onClick={openModal}>
          LOGIN
        </Button>
        {false && <Button variant="contained">LOGOUT</Button>}
      </div>
    </div>
  );
};

export default Header;
