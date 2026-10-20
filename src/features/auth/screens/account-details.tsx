import { redirect } from "next/navigation";
import { AccountSummary } from "../components/account-summary";
import { SignOutButton } from "../components/sign-out-button";
import { SIGN_IN_PATH } from "../routes";
import { getCurrentSession } from "../server/get-current-session";

export async function AccountDetails() {
  const session = await getCurrentSession();
  if (!session) redirect(SIGN_IN_PATH);
  return (
    <>
      <AccountSummary name={session.user.name} email={session.user.email} />
      <SignOutButton />
    </>
  );
}
