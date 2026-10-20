import { Suspense } from "react";
import { RedirectIfSignedIn } from "@/features/auth/gates/redirect-if-signed-in";
import { SignInScreen } from "@/features/auth/screens/sign-in-screen";

export default function SignInPage() {
  return (
    <>
      <SignInScreen />
      <Suspense fallback={null}>
        <RedirectIfSignedIn />
      </Suspense>
    </>
  );
}
