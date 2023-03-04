import { Button, FormControl, TextField, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserRoleContext } from "../../contexts/UserRoleContext";
import { editRoleName } from "../../services/RoleServices";

export default function EditUserRoleForm() {
  const [setUserRoles, URL] = useContext(UserRoleContext);
  const userRoleData = useLocation();
  const navigate = useNavigate();

  const [currentRole, setCurrentRole] = useState(userRoleData.state.role[0]);

  console.log(userRoleData.state);

  function handleRoleName(e) {
    setCurrentRole({ ...currentRole, roleName: e.target.roleName.value });
  }

  async function handleEdit(e) {
    editRoleName(e, setUserRoles, URL, currentRole);
    navigate("/user/role/list");
  }

  return (
    <Container maxWidth="lg" sx={{ margin: "0 auto", paddingBottom: 5 }}>
      <Typography variant="h3" sx={{ marginBottom: 3, marginTop: 10 }}>
        EDIT USER ROLE
      </Typography>
      {currentRole && (
        <Box maxWidth="md" sx={{ margin: "0 auto" }}>
          <FormControl
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <TextField
              name="roleName"
              label="Role name"
              variant="filled"
              defaultValue={currentRole.roleName}
              onChange={handleRoleName}
            />
            <TextField
              name="roleId"
              label="Role id"
              variant="filled"
              defaultValue={currentRole.roleId}
            />
          </FormControl>
          <Link to={"/user/role/list"}>
            <Button>BACK</Button>
          </Link>
          <Button
            type="submit"
            variant="contained"
            sx={{ marginTop: 2 }}
            color="success"
            onClick={handleEdit}
          ></Button>
        </Box>
      )}
    </Container>
  );
}
