import * as React from "react";
import {useCallback} from "react";
import {StatusType} from "app/model/appReducer";
import {authThunk} from "features/auth/model/authReducer";
import {useAppDispatch, useAppSelector} from "app/model/store";
import {Text} from "react-native";

export function ButtonAppBar() {
  const status = useAppSelector<StatusType>((state) => state.app.status);
  const isLoggedIn = useAppSelector<boolean>((state) => state.auth.isLoggedIn);
  const dispatch = useAppDispatch();

  const logoutHandle = useCallback(() => {
    dispatch(authThunk.authLogout());
  }, [dispatch]);

  return (
    <Text>ButtonBar</Text>
    // <Box sx={{ flexGrow: 1}}>
    //   <ErrorSnackbar />
    //   <AppBar position="static" style={{ backgroundColor: "brown", position: 'relative'}}>
    //     <Toolbar>
    //       <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
    //         <MenuIcon />
    //       </IconButton>
    //       <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
    //         News
    //       </Typography>
    //       {isLoggedIn && (
    //         <Button color="inherit" onClick={logoutHandle}>
    //           Log out
    //         </Button>
    //       )}
    //     </Toolbar>
    //     {status === "loading" && (
    //       <LinearProgress style={{ position: "absolute", left: "0", bottom: "-3px", height:'3px', width: '100%' }} />
    //     )}
    //   </AppBar>
    // </Box>
  );
}
