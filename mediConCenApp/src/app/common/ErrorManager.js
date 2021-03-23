const ErrorManager = {
  solve(errorCode, navigation, alert) {
    if (errorCode === -9994 || errorCode === -9995) {
      alert.alert(
        "Token expired",
        "please login again",
        [
          {
            text: "ok",
            onPress: () => navigation.navigate('LoginPage'),
            style: "cancel",
          },
        ],
        {
          cancelable: false,
        }
      );
    } else {
      alert.alert(
        "Server error",
        "error code (" + errorCode + ") Please contact customer services if this happen all the time",
        [
          {
            text: "ok",
            style: "cancel",
          },
        ],
        {
          cancelable: false,
        }
      );
    }
  }
}

export default ErrorManager