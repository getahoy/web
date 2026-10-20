import { Suspense } from "react";
import { RedirectIfSignedIn } from "@/features/auth/gates/redirectIfSignedIn";
import { SignInScreen } from "@/features/auth/screens/signInScreen";

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
