import { Box } from "@mui/system";
import Layout from "../layout/Layout";
import { Container } from "@mui/system";
import { Button, TextField, Typography, useTheme } from "@mui/material";
import { useContext, useState, useEffect } from "react";
import { userContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../../utilities/userAuthAxios";
import gamesforfree3 from "../../assets/gamesforfree3.png";
import gamesforfree1 from "../../assets/gamesforfree1.png";

export default function LoginPage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const { signInUser } = useContext(userContext);
  const [errorMessage, setErrorMessage] = useState(null);
  const [userLoginInfo, setUserLoginInfo] = useState({
    email: "",
    password: "",
    login: true,
  });

  
  const onSubmitLogin = async (e, userData) => {
    e.preventDefault();
    const response = await userLogin(userData);

    if (response.success === true) {
      signInUser(response);
      navigate("/");
    } else {
      setErrorMessage("ERROR! Sorry the credentials you are using are invalid");
    }
  };
  const onChangeEmail = (e) => {
    setUserLoginInfo((prevState) => ({ ...prevState, email: e.target.value }));
  };
  const onChangePassword = (e) => {
    setUserLoginInfo((prevState) => ({
      ...prevState,
      password: e.target.value,
    }));
  };

  const onClickNavigateToSignUp = () => {
    navigate("/signup");
  };

  return (
    <Layout>
      <form onSubmit={(e) => onSubmitLogin(e, userLoginInfo)}>
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
              style={{ width: "100vw", maxWidth: "400px" }}
              src={gamesforfree1}
              alt="gameimg"
            ></img>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "400px",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
              backgroundColor: theme.palette.primary.light,
            }}
          >
            {errorMessage && (
              <Typography sx={{ textAlign: "center", color: "red" }}>
                {errorMessage}
              </Typography>
            )}
            {!errorMessage && (
              <img
                style={{ maxWidth: "50px", borderRadius: "100%" }}
                src={gamesforfree3}
                alt="gameimg"
              ></img>
            )}
            {!errorMessage && (
              <Typography
                sx={{
                  textAlign: "center",
                  color: theme.palette.primary.extraLight,
                }}
              >
                Log in to FreeToGame
              </Typography>
            )}
            <TextField
              onChange={onChangeEmail}
              type="email"
              label="Email Address"
              InputProps={{ sx: { color: "white" } }}
              InputLabelProps={{ sx: { color: "white" } }}
              sx={{
                color: "white",
                backgroundColor: "primary.dark",
                borderRadius: "10px",
                height: "56px",
                width: "80%",
              }}
              required
            />
            <TextField
              onChange={onChangePassword}
              type="password"
              label="Password"
              InputProps={{ sx: { color: "white" } }}
              InputLabelProps={{ sx: { color: "white" } }}
              sx={{
                color: "white",
                backgroundColor: "primary.dark",
                borderRadius: "10px",
                height: "56px",
                width: "80%",
              }}
              required
            />
            <Button
              type="submit"
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: "white",
                height: "56px",
                width: "80%",
                borderRadius: "10px",
              }}
            >
              Login
            </Button>
            <Button
              size="small"
              sx={{
                backgroundColor: "primary",
                color: theme.palette.secondary.main,
              }}
            >
              Forgot Password?
            </Button>
            <Button
              size="small"
              onClick={onClickNavigateToSignUp}
              sx={{
                backgroundColor: "primary",
                color: theme.palette.secondary.main,
              }}
            >
              Create Account
            </Button>
          </Box>
        </Container>
      </form>
    </Layout>
  );
}
