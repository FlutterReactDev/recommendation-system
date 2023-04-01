import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link, useNavigate } from "react-router-dom";
import { FC, useState } from "react";
import { Backdrop, MenuItem } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { container } from "tsyringe";
import AuthService from "@service/auth";
import { CircularProgress } from "@mui/material";
import { HOME_URL } from "@router/router";

const REGISTER_FORM_SCHEMA = Yup.object({
  name: Yup.string().required().label("Name"),
  email: Yup.string().email().required().label("E-mail"),
  password: Yup.string().required().min(5).label("Password"),
  gender: Yup.mixed()
    .required()
    .oneOf(["male", "female", "other"])
    .label("Gender"),
  age: Yup.number().required().label("Age"),
});

export type RegisterFormData = Yup.InferType<typeof REGISTER_FORM_SCHEMA>;

const RegisterPage: FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(REGISTER_FORM_SCHEMA),
  });

  async function onSumbit(data: RegisterFormData) {
    const authService = container.resolve(AuthService);
    setLoading(true);

    try {
      await authService.register(data);
      navigate(HOME_URL);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  async function signUpwithGoogle() {
    const authService = container.resolve(AuthService);
    setLoading(true);

    try {
      await authService.registerWithGoogle();
     
      navigate(HOME_URL);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container component="main" maxWidth="xs">
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
          Sign up
        </Typography>
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  name="name"
                  error={errors.name ? true : false}
                  helperText={errors.name?.message}
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  margin="normal"
                  autoFocus
                />
              );
            }}
          />

          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  error={errors.password ? true : false}
                  helperText={errors.password?.message}
                  required
                  fullWidth
                  margin="normal"
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              );
            }}
          />

          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                error={errors.email ? true : false}
                helperText={errors.email?.message}
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            )}
          />

          <Controller
            control={control}
            name="gender"
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                error={errors.gender ? true : false}
                select
                fullWidth
                margin="normal"
                label="Gender"
                required
                helperText={errors.gender?.message}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </TextField>
            )}
          />

          <Controller
            control={control}
            name="age"
            render={({ field }) => (
              <TextField
                {...field}
                error={errors.age ? true : false}
                helperText={errors.age?.message && "Age must be a `number`"}
                required
                fullWidth
                name="age"
                margin="normal"
                label="Age"
                id="age"
              />
            )}
          />

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={signUpwithGoogle}
          >
            Sign Up with Google
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit(onSumbit)}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/login">Already have an account? Sign in</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterPage;
