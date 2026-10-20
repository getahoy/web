import { redirect } from "next/navigation";
import { ACCOUNT_PATH } from "../routes";
import { getCurrentSession } from "../server/getCurrentSession";

export async function RedirectIfSignedIn() {
  const session = await getCurrentSession();
  if (session) redirect(ACCOUNT_PATH);
  return null;
}
