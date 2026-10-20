import { Suspense } from "react";
import { RedirectIfSignedIn } from "@/features/auth/gates/redirectIfSignedIn";
import { SignUpScreen } from "@/features/auth/screens/signUpScreen";

export default function SignUpPage() {
  return (
    <>
      <SignUpScreen />
      <Suspense fallback={null}>
        <RedirectIfSignedIn />
      </Suspense>
    </>
  );
}
