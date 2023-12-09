// import * as React from "react";
// import { useDispatch } from "react-redux";
// import { useAppSelector } from "app/model/store";
// import { appAction } from "app/model/appReducer";
//
// const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
//   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });
//
// export function ErrorSnackbar() {
//   // const [open, setOpen] = React.useState(true);
//   const error = useAppSelector<string | null>((state) => state.app.error);
//
//   const dispatch = useDispatch();
//
//   const isOpen = error !== null;
//
//   const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
//     if (reason === "clickaway") {
//       return;
//     }
//     dispatch(appAction.setError({ error: null }));
//     // dispatch(setAppErrorAC(null));
//     // setOpen(false);
//   };
//
//   return (
//     <Snackbar open={isOpen} autoHideDuration={7000} onClose={handleClose}>
//       <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
//         {error}
//       </Alert>
//     </Snackbar>
//   );
// }
