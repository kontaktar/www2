import fetch from "lib/fetchJson";

export const bypassWarningMessage = `WARNING! BYPASSING FIREBASE`;

export const isBypassingFirebase =
  process.env.NODE_ENV === "development" &&
  process.env.FIREBASE_EMULATOR === "1";

// export const signInToFirebaseWithPhoneNumber = (
//   phoneNumber: string,
//   setVerificationCodeSent: (b: boolean) => void,
//   setErrorMessage: (m: string) => void,
//   setLoading: (b: boolean) => void,
//   router
// ): void => {
//   firebase.auth().settings.appVerificationDisabledForTesting =
//     process.env.FIREBASE_EMULATOR === "1";

//   const appVerifier = (window as any).recaptchaVerifier;
//   firebase
//     .auth()
//     .signInWithPhoneNumber(phoneNumber, appVerifier)
//     .then((confirmationResult) => {
//       (window as any).confirmationResult = confirmationResult;
//       setVerificationCodeSent(true);
//     })
//     .catch((error) => {
//       if (error.code === "auth/captcha-check-failed") {
//         setErrorMessage(verificationErrors.CAPTCHA_CHECK_FAILED);
//         router.reload();
//       } else if (error.code === "auth/invalid-phone-number") {
//         // TODO: Move this validation to formik/yup
//         setErrorMessage(verificationErrors.INVALID_PHONE_NUMBER);
//       } else if (error.code === "auth/too-many-requests") {
//         setErrorMessage(verificationErrors.TOO_MANY_REQUESTS);
//       } else if (error.code === "auth/network-request-failed") {
//         setErrorMessage("TURN ON THE FIREBASE EMULATOR");
//         debugError(`NETWORK REQUEST FAILED - ${error} - CODE: ${error.code}`);
//       } else {
//         setErrorMessage(
//           `Villa kom upp, skilaboð ekki send. ${error} - CODE: ${error?.code}`
//         );
//       }
//       setLoading(false);
//       debugError(`PhoneNumberForm Error: ${error}`);
//     });
// };

export const getEmulatorVerificationCode = async (
  phoneNumber: string
): Promise<string> => {
  const response = await fetch(
    `http://${process.env.FIRESTORE_EMULATOR_HOST}/emulator/v1/projects/${process.env.FIREBASE_PROJECT_ID}/verificationCodes`
  );
  const { code } = response.verificationCodes
    .reverse()
    .find((v) => v.phoneNumber === phoneNumber);

  return code;
};
