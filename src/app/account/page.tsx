import { Suspense } from "react";
import { AuthScreenLayout } from "@/features/auth/components/authScreenLayout";
import { authCopy } from "@/features/auth/copy/authCopy";
import { AccountGate } from "@/features/auth/gates/accountGate";

export default function AccountPage() {
  return (
    <AuthScreenLayout title={authCopy["account.title"]}>
      <Suspense
        fallback={<p aria-busy="true">{authCopy["account.loading"]}</p>}
      >
        <AccountGate />
      </Suspense>
    </AuthScreenLayout>
  );
}
