import {
  type SocialProviderId,
  socialProviderCatalog,
} from "../providers/catalog";

type SocialSignInButtonsProps = {
  pending: boolean;
  onSelect: (provider: SocialProviderId) => void;
};

export function SocialSignInButtons({
  pending,
  onSelect,
}: SocialSignInButtonsProps) {
  return (
    <div className="flex flex-col gap-2">
      {socialProviderCatalog.map((provider) => (
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
