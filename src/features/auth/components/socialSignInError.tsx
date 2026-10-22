import { socialErrorMessage } from "@getahoy/lib";
import { useSearchParams } from "next/navigation";
import { FormError } from "./formError";

type SocialSignInErrorProps = {
  hidden: boolean;
};

export function SocialSignInError({ hidden }: SocialSignInErrorProps) {
  const callbackError = useSearchParams().get("error");
  if (hidden || !callbackError) return null;
  return <FormError message={socialErrorMessage(callbackError)} />;
}
