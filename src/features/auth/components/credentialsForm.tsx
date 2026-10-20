import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { CredentialField } from "../forms/credentialFields";
import { FormError } from "./formError";

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
        <div key={field.name} className="flex flex-col gap-2">
          <Label htmlFor={field.name}>{field.label}</Label>
          <Input
            id={field.name}
            name={field.name}
            type={field.type}
            autoComplete={field.autoComplete}
            required
            disabled={pending}
          />
        </div>
      ))}
      <FormError message={errorMessage} />
      <Button type="submit" disabled={pending}>
        {pending ? "Please wait…" : submitLabel}
      </Button>
    </form>
  );
}
