import {
  Box,
  Button,
  Container,
  Input,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import Layout from "../layout/Layout";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { userSignUp } from "../../utilities/userAuthAxios";
import gamesforfree1 from "../../assets/gamesforfree1.png";
import gamesforfree3 from "../../assets/gamesforfree3.png";

export default function Signup() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [errorMessage, setErrorMessage] = useState("");

  // single state object for user registration.
  const [userRegistrationInfo, setUserRegistrationInfo] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    confirmPassword: "",
    profile_pic: "",
    signup: true, // This will be sent to the backed so that it knows what action needs to be done.
  });

  const onSubmitSignIn = async (e, userInfo) => {
    e.preventDefault();
    // console.log(userInfo)
    if (userInfo.password !== userInfo.confirmPassword) {
      setErrorMessage("Password does not match each other");
      return;
    }
    // If successfully created an user account, then go to login page, else show error message
    const response = await userSignUp(userInfo);
    if (response.success.success === true) {
      setErrorMessage("Successfully created!");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } else if (response.success.message === "The given username must be set") {
      setErrorMessage("Enter valid");
    } 
    else if (response.success.message.includes("duplicate")) {
      setErrorMessage("Account already exist");
    }
  };

  const onChangeEmail = (e) => {
    //functional update that takes the callback with a previous state as an argument, then return a new object with the updated property.
    setUserRegistrationInfo((prevState) => ({
      ...prevState,
      email: e.target.value,
    }));
  };

  const onChangeFirstName = (e) => {
    setUserRegistrationInfo((prevState) => ({
      ...prevState,
      first_name: e.target.value,
    }));
  };
  const onChangeLastName = (e) => {
    setUserRegistrationInfo((prevState) => ({
      ...prevState,
      last_name: e.target.value,
    }));
  };

  const onChangePassword = (e) => {
    setUserRegistrationInfo((prevState) => ({
      ...prevState,
      password: e.target.value,
    }));
  };
  const onChangeConfirmPassword = (e) => {
    setUserRegistrationInfo((prevState) => ({
      ...prevState,
      confirmPassword: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    setUserRegistrationInfo((prevState) => ({
      ...prevState,
      profile_pic: e.target.files[0],
    }));
  };

  const onClickNavigateToLoginPage = () => {
    navigate("/login");
  };

  return (
    <Layout>
      {/* Callback funciton with two arguments, that is called when form receives a submit event */}
      <form style={{width:'100%'}} onSubmit={(e) => onSubmitSignIn(e, userRegistrationInfo)}>
        <Container
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            flexWrap: "wrap",
            my: 5,
          }}
        >
          <Box
            sx={{
              [theme.breakpoints.down("md")]: {
                display: "none",
              },
            }}
          >
            <img
              style={{ width: "100vw", maxWidth: "400px", height:'100%' }}
              src={gamesforfree1}
              alt="gameimg"
            ></img>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              maxWidth:'500px',
              gap: 1,
              backgroundColor: theme.palette.primary.light,
            }}
          >
            {/* If error message is null, then show create my account message, else show error message */}
            {!errorMessage && (
              <Typography
                sx={{
                  textAlign: "center",
                  marginTop:'10px',
                  color: theme.palette.primary.extraLight,
                }}
              >
                Create My Account!
              </Typography>
            )}
            {errorMessage && (
              <Typography sx={{ textAlign: "center", color: "red" }}>
                {errorMessage}
              </Typography>
            )}
            <TextField
              onChange={onChangeEmail}
              type="email"
              label="Email Address"
              InputProps={{ sx: { color: "white" } }}
              InputLabelProps={{
                sx: { color: theme.palette.primary.extraLight },
              }}
              sx={{
                color: "white",
                backgroundColor: "primary.dark",
                borderRadius: "10px",
                width: "70%",
              }}
              size="small"
              required
            />
            <TextField
              onChange={onChangeFirstName}
              InputProps={{ sx: { color: "white" } }}
              InputLabelProps={{
                sx: { color: theme.palette.primary.extraLight },
              }}
              label="Fisrt Name"
              sx={{
                color: "white",
                backgroundColor: "primary.dark",
                borderRadius: "10px",
                width: "70%",
              }}
              size="small"
              required
            />
            <TextField
              onChange={onChangeLastName}
              InputProps={{ sx: { color: "white" } }}
              InputLabelProps={{
                sx: { color: theme.palette.primary.extraLight },
              }}
              label="Last Name"
              sx={{
                color: "white",
                backgroundColor: "primary.dark",
                borderRadius: "10px",
                width: "70%",
              }}
              size="small"
              required
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <TextField
                type="password"
                onChange={onChangePassword}
                InputProps={{ sx: { color: "white" } }}
                InputLabelProps={{
                  sx: { color: theme.palette.primary.extraLight },
                }}
                label="Password"
                sx={{
                  color: "white",
                  backgroundColor: "primary.dark",
                  borderRadius: "10px",
                  width: "45%",
                }}
                size="small"
                required
              />
              <TextField
                type="password"
                onChange={onChangeConfirmPassword}
                InputProps={{ sx: { color: "white" } }}
                InputLabelProps={{
                  sx: { color: theme.palette.primary.extraLight },
                }}
                label="Confirm Password"
                sx={{
                  color: "white",
                  backgroundColor: "primary.dark",
                  borderRadius: "10px",
                  width: "45%",
                }}
                size="small"
                required
              />
            </Box>
            <Box
              sx={{
                my: 2,
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{ width: "70%", display: "flex", justifyContent: "center" }}
              >
                <label htmlFor="profilePicture">
                  <Input
                    onChange={handleFileChange}
                    accept="image/*"
                    id="profilePicture"
                    name="profilePicture"
                    type="file"
                    style={{
                      opacity: 0.5,
                    }}
                  />
                  <Button
                    variant="contained"
                    component="span"
                    sx={{
                      color: theme.palette.primary.extraLight,
                      zIndex: 1,
                    }}
                  >
                    Upload Profile Picture
                  </Button>
                </label>
              </Box>
            </Box>

            <Button
              type="submit"
              variant="contained"
              size="small"
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.extraLight,
                width: "70%",
                borderRadius: "10px",
              }}
            >
              Create Account
            </Button>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography sx={{ color: theme.palette.primary.extraLight }}>
                Already a member?
              </Typography>
              <Button
                onClick={onClickNavigateToLoginPage}
                sx={{
                  backgroundColor: "primary",
                  color: theme.palette.secondary.main,
                }}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Container>
      </form>
    </Layout>
  );
}
