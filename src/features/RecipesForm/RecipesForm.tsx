import { yupResolver } from "@hookform/resolvers/yup";
import {
  Alert,
  Avatar,
  Backdrop,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { container } from "tsyringe";
import RecipesService from "@service/recipes";
import { FirebaseError } from "firebase/app";
import { set } from "react-hook-form/dist/utils";
export const RECIPES_FORM_SCHEMA = Yup.object({
  name: Yup.string().required().label("Title"),
  imgUrl: Yup.string().required().label("Preview"),
  tags: Yup.array().of(Yup.string()).required().label("Tags"),
  description: Yup.string().required().label("Description"),
});
export type RecipesFormData = Yup.InferType<typeof RECIPES_FORM_SCHEMA>;
const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

const RecipesForm = () => {
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [tags, setTags] = useState<string[]>();

  useEffect(() => {
    const recipesService = container.resolve(RecipesService);

    recipesService.getAllTags().then((tags) => {
      setTags(tags);
    });
  }, []);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RecipesFormData>({
    resolver: yupResolver(RECIPES_FORM_SCHEMA),
  });

  async function onSubmit(data: RecipesFormData) {
    const recipesService = container.resolve(RecipesService);
    setLoading(true);
    try {
      await recipesService.postRecipe(data);
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(true);
        setErrorMessage(e.message);
      }
    } finally {
      setLoading(false);
      setOpenSnackbar(true);
    }
  }
  return (
    <Container component="main" maxWidth="lg">
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
          Recipe successful created, and post to DB :)
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
          justifyContent: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <CreateIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create
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
            name="description"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                error={errors.description ? true : false}
                helperText={errors.description?.message}
                required
                fullWidth
                id="description"
                label="Description"
                name="description"
              />
            )}
          />

          <Controller
            name="imgUrl"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                error={errors.imgUrl ? true : false}
                helperText={errors.imgUrl?.message}
                required
                fullWidth
                id="description"
                label="Image url"
                name="imgUrl"
              />
            )}
          />

          <Controller
            name="tags"
            control={control}
            defaultValue={[]}
            render={({ field }) => {
              return (
                <FormControl sx={{ width: 300 }} margin="normal">
                  <InputLabel>Tags</InputLabel>
                  <Select
                    multiple
                    {...field}
                    input={
                      <OutlinedInput id="select-multiple-chip" label="Chip" />
                    }
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                  >
                    {tags?.length &&
                      tags.map((tag) => (
                        <MenuItem key={tag} value={tag}>
                          {tag}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              );
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit(onSubmit)}
          >
            Create
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default RecipesForm;
