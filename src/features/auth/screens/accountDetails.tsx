import { redirect } from "next/navigation";
import { AccountSummary } from "../components/accountSummary";
import { SignOutButton } from "../components/signOutButton";
import { SIGN_IN_PATH } from "../routes";
import { getCurrentSession } from "../server/getCurrentSession";

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
