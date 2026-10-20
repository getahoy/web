import { Suspense } from "react";
import { RedirectIfSignedIn } from "@/features/auth/gates/redirect-if-signed-in";
import { SignUpScreen } from "@/features/auth/screens/sign-up-screen";

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
