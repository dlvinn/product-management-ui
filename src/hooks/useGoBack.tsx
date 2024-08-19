import { useRouter } from "next/navigation";

export function useGoBack() {
  const router = useRouter();

  const goBack = () => {
    if (typeof window !== "undefined") {
      router.back();
    }
  };

  return { goBack };
}
