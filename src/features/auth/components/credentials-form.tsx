import type { CredentialField } from "../forms/credential-fields";
import { FormError } from "./form-error";

type CredentialsFormProps = {
  fields: readonly CredentialField[];
  submitLabel: string;
  pending: boolean;
  errorMessage: string | null;
  onSubmit: (formData: FormData) => void;
};

export function CredentialsForm({
  fields,
  submitLabel,
  pending,
  errorMessage,
  onSubmit,
}: CredentialsFormProps) {
  return (
    <form action={onSubmit} aria-busy={pending} className="flex flex-col gap-4">
      {fields.map((field) => (
        <label key={field.name} className="flex flex-col gap-1">
          <span className="text-small">{field.label}</span>
          <input
            name={field.name}
            type={field.type}
            autoComplete={field.autoComplete}
            required
            disabled={pending}
            className="rounded-control border border-border p-2"
          />
        </label>
      ))}
      <FormError message={errorMessage} />
      <button
        type="submit"
        disabled={pending}
        className="rounded-control border border-border p-2"
      >
        {pending ? "Please wait…" : submitLabel}
      </button>
    </form>
  );
}
