import {
  Container,
  Box,
  Avatar,
  Typography,
  ToggleButton,
  Backdrop,
  CircularProgress,
  Button,
  Alert,
  Snackbar,
} from "@mui/material";
import { useEffect, useState } from "react";
import StarsIcon from "@mui/icons-material/Stars";
import { container } from "tsyringe";
import RecipesService from "@service/recipes";
import AuthService from "@service/auth";
import { useNavigate } from "react-router-dom";
import { MAIN_URL } from "@router/router";

const TagsPage = () => {
  const [checkedTags, setCheckedTags] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const recipesService = container.resolve(RecipesService);
    recipesService.getAllTags().then((tags) => {
      setTags(tags);
    });
  }, []);

  function onSumbit() {
    if (!checkedTags.length) {
      return setError(true);
    }

    const authService = container.resolve(AuthService);
    authService.addTags(checkedTags);
    navigate(MAIN_URL);
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
          Please click on tags
        </Alert>
      </Snackbar>
      <Backdrop
        open={tags?.length ? false : true}
        sx={{ color: "#fff", zIndex: 99 }}
      >
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
          <StarsIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Click interesting tags :)
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
          }}
        >
          {tags?.length ? (
            tags.map((tag) => {
              return (
                <ToggleButton
                  selected={checkedTags?.includes(tag)}
                  onChange={() => {
                    setCheckedTags((prevState) => {
                      const newState = [...prevState];
                      if (newState.includes(tag)) {
                        return newState.filter((t) => t != tag);
                      }
                      newState.push(tag);
                      return newState;
                    });
                  }}
                  value="check"
                >
                  {tag}
                </ToggleButton>
              );
            })
          ) : (
            <></>
          )}

          <Button fullWidth variant="contained" onClick={onSumbit}>
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default TagsPage;
