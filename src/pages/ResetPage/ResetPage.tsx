import { yupResolver } from "@hookform/resolvers/yup";
import {
  Container,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Backdrop,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import * as Yup from "yup";
import { container } from "tsyringe";
import AuthService from "@service/auth";
import { Link } from "react-router-dom";
import { LOGIN_URL } from "@router/router";
const RESET_FORM_DATA = Yup.object({
  email: Yup.string().email().required().label("E-mail"),
});
export type ResetFormData = Yup.InferType<typeof RESET_FORM_DATA>;
const ResetPage: FC = () => {
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ResetFormData>({
    resolver: yupResolver(RESET_FORM_DATA),
  });

  async function onSumbit(data: ResetFormData) {
    const authService = container.resolve(AuthService);
    setLoading(true);
    try {
      await authService.resetPassword(data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
      setOpenSnackbar(true);
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => {
          setOpenSnackbar(false);
        }}
      >
        <Alert
          onClose={() => {
            setOpenSnackbar(false);
          }}
          severity="success"
          sx={{ width: "100%" }}
        >
          Password reset send to your e-mail, please check :)
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
          Reset Password
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit(onSumbit)}
          >
            Reset
          </Button>
          <Link to={LOGIN_URL}>Go back</Link>
        </Box>
      </Box>
    </Container>
  );
};

export default ResetPage;
