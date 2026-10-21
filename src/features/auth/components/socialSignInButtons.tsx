import { Button } from "@/components/ui/button";
import {
  type SocialProviderId,
  socialProviderCatalog,
} from "../providers/socialProviderCatalog";

type SocialSignInButtonsProps = {
  providerIds: readonly SocialProviderId[];
  pending: boolean;
  onSelect: (provider: SocialProviderId) => void;
};

export function SocialSignInButtons({
  providerIds,
  pending,
  onSelect,
}: SocialSignInButtonsProps) {
  const providers = socialProviderCatalog.filter((provider) =>
    providerIds.includes(provider.id),
  );
  if (providers.length === 0) return null;

  return (
    <div className="flex flex-col gap-2">
      {providers.map((provider) => (
        <Button
          key={provider.id}
          type="button"
          variant="outline"
          disabled={pending}
          onClick={() => onSelect(provider.id)}
        >
          {provider.label}
        </Button>
      ))}
    </div>
  );
}
