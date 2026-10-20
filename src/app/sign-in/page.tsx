import { Suspense } from "react";
import { RedirectIfSignedIn } from "@/features/auth/gates/redirectIfSignedIn";
import { SignInScreen } from "@/features/auth/screens/signInScreen";
import { enabledSocialProviderIds } from "@/features/auth/server/socialProviders";

export default function SignInPage() {
  return (
    <>
      <SignInScreen socialProviderIds={enabledSocialProviderIds} />
      <Suspense fallback={null}>
        <RedirectIfSignedIn />
      </Suspense>
    </>
  );
}
