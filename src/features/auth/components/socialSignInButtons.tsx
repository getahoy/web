import {
  type SocialProviderId,
  socialProviderCatalog,
} from "../providers/catalog";

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
        <button
          key={provider.id}
          type="button"
          disabled={pending}
          onClick={() => onSelect(provider.id)}
          className="rounded-control border border-border p-2"
        >
          {provider.label}
        </button>
      ))}
    </div>
  );
}
