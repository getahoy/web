import { Suspense } from "react";
import { AuthScreenLayout } from "@/features/auth/components/auth-screen-layout";
import { AccountDetails } from "@/features/auth/screens/account-details";

export default function AccountPage() {
  return (
    <AuthScreenLayout title="Your account">
      <Suspense fallback={<p aria-busy="true">Loading your account…</p>}>
        <AccountDetails />
      </Suspense>
    </AuthScreenLayout>
  );
}
