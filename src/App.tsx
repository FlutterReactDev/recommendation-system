import useAuthInfo from "@hooks/useAuthInfo";
import { Divider } from "@mui/material";
import { Button } from "@mui/material";

const App = () => {
  const { user, logout } = useAuthInfo();

  return (
    <div>
      <Button onClick={logout} variant="contained">
        Logout
      </Button>
    </div>
  );
};

export default App;
