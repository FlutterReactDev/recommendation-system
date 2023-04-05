import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useForm, Controller, set } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { HOME_URL, RESET_URL } from "@router/router";
import { container } from "tsyringe";
import AuthService from "@service/auth";
import { Alert, Backdrop, CircularProgress, Snackbar } from "@mui/material";
import { FirebaseError } from "firebase/app";
import { FirestoreErrorCode } from "firebase/firestore";
import { AuthError, AuthErrorCodes } from "firebase/auth";

const LOGIN_FORM_SCHEMA = Yup.object({
  email: Yup.string().email().required().label("E-mail"),
  password: Yup.string().min(5).required().label("Password"),
});

export type LoginFormData = Yup.InferType<typeof LOGIN_FORM_SCHEMA>;

const LoginPage: FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(LOGIN_FORM_SCHEMA),
  });

  async function onSumbit(data: LoginFormData) {
    const authService = container.resolve(AuthService);
    setLoading(true);
    try {
      await authService.login(data);
      navigate(HOME_URL);
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(true);
        setErrorMessage(e.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function signInWithGoogle() {
    const authService = container.resolve(AuthService);
    setLoading(true);

    try {
      await authService.registerWithGoogle();
      navigate(HOME_URL);
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(true);
        setErrorMessage(e.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <Snackbar
        open={error}
        autoHideDuration={6000}
        onClose={() => {
          setError(false);
        }}
      >
        <Alert
          onClose={() => {
            setError(false);
          }}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
      <Backdrop open={loading} sx={{ color: "#fff", zIndex: 99 }}>
        <CircularProgress color="primary" />
      </Backdrop>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <Controller
            control={control}
            name="email"
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                error={errors.email ? true : false}
                helperText={errors.email?.message}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                error={errors.email ? true : false}
                helperText={errors.email?.message}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            )}
          />

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={signInWithGoogle}
          >
            Sign In with Google
          </Button>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit(onSumbit)}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to={RESET_URL}>Forgot password?</Link>
            </Grid>
            <Grid item>
              <Link to="/register">{"Don't have an account? Sign Up"}</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
