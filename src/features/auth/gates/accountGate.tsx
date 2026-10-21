import { redirect } from "next/navigation";
import { SIGN_IN_PATH } from "../routes";
import { AccountScreen } from "../screens/accountScreen";
import { getCurrentSession } from "../server/getCurrentSession";

export async function AccountGate() {
  const session = await getCurrentSession();
  if (!session) redirect(SIGN_IN_PATH);
  return <AccountScreen name={session.user.name} email={session.user.email} />;
}
