import { SignInScreen } from "@/features/auth/screens/signInScreen";
import { enabledSocialProviderIds } from "@/features/auth/server/socialProviders";

export default function SignInPage() {
  return <SignInScreen socialProviderIds={enabledSocialProviderIds} />;
}
