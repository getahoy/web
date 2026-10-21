import { useSearchParams } from "next/navigation";
import { socialErrorMessage } from "../errors/socialErrorMessage";
import { FormError } from "./formError";

export function SocialSignInError() {
  const callbackError = useSearchParams().get("error");
  if (!callbackError) return null;
  return <FormError message={socialErrorMessage(callbackError)} />;
}
