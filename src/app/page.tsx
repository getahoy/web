import { redirect } from "next/navigation";
import { ACCOUNT_PATH } from "@/features/auth/routes";

export default function Home() {
  redirect(ACCOUNT_PATH);
}
