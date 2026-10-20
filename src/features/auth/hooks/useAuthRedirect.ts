import { useRouter } from "next/navigation";

export function useAuthRedirect() {
  const router = useRouter();
  return (path: string) => {
    router.replace(path);
    router.refresh();
  };
}
