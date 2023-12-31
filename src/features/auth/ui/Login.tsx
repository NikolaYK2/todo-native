import React from "react";
import {useLogin} from "features/auth/lib/useLogin";
import {Text, View} from "react-native";
import {LoginProps} from "common/type/Navigation";


export const Login = ({route, navigation}: LoginProps) => {
  const {formik, isLoggedIn, captchaSelect} = useLogin();


  // if (isLoggedIn) {
  //   return <Navigate to="/"/>;
  // }
  // if (isLoggedIn) {
  //   navigation.navigate('Home')
  // }
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Forma!</Text>
      {/*
          <form onSubmit={formik.handleSubmit}>
            <View>
              <View style={{backgroundColor: "#1976D2"}}>
                <Text>
                  To log in get registered
                  <a href={"https://social-network.samuraijs.com/"} target={"_blank"} rel="noreferrer">
                    {" "}
                    here
                  </a>
                </Text>
                <Text>or use common test account credentials:</Text>
                <Text>Email: free@samuraijs.com</Text>
                <Text>Password: free</Text>
              </View>
              <View style={{backgroundColor: "brown"}}>
                <View>
                  <TextField label="Email" margin="normal" {...formik.getFieldProps("email")} />
                  <Text>Input</Text>
                  <div style={{ height: "30px" }}>{formik.errors.email ? formik.errors.email : null}</div>
                  <View style={{height: 30}}>
                    {formik.touched.email && formik.errors.email ? formik.errors.email : null}
                  </View>

                  <Text>Input</Text>

                  <TextField
                    type="password"
                    label="Password"
                    autoComplete="off"
                    margin="normal"
                    {...formik.getFieldProps("password")}
                  />
                  <div style={{ height: "30px" }}>{formik.errors.password ? formik.errors.password : null}</div>
                  <View style={{height: 30}}>
                    {formik.touched.password && formik.errors.password ? formik.errors.password : null}
                  </View>
                  <Text>chekbox</Text>
                  <FormControlLabel
                    sx={{ svg: { color: "#1976D2" } }}
                    label={"Remember me"}
                    control={<Checkbox {...formik.getFieldProps("rememberMe")} checked={formik.values.rememberMe} />}
                  />
                  {captchaSelect && (
                    <>
                      <View>
                        <img src={`${captchaSelect}`} alt=""/>
                      </View>
                      <Text>Input</Text>
                      <TextField
                        type="text"
                        label="Captcha"
                        style={{ margin: "0 0 10px" }}
                        {...formik.getFieldProps("captcha")}
                      />
                    </>
                  )}
                </View>
                <Text>Button Login</Text>
                <Button type={"submit"} variant={"contained"} color={"primary"}>
                  Login
                </Button>
              </View>
            </View>
          </form>
*/}
    </View>
  );
};
