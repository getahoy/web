import { SignUpScreen } from "@/features/auth/screens/signUpScreen";
import { enabledSocialProviderIds } from "@/features/auth/server/socialProviders";

export default function SignUpPage() {
  return <SignUpScreen socialProviderIds={enabledSocialProviderIds} />;
}
