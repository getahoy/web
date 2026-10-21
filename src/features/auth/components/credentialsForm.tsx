import type { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authCopy } from "../copy/authCopy";
import type { CredentialField } from "../forms/credentialFields";
import { FormError } from "./formError";

type CredentialsFormProps<Name extends string> = {
  fields: readonly CredentialField<Name>[];
  values: Partial<Record<Name, string>>;
  submitLabel: string;
  pending: boolean;
  errorMessage: string | null;
  onChange: (name: Name, text: string) => void;
  onSubmit: () => void;
};

export function CredentialsForm<Name extends string>({
  fields,
  values,
  submitLabel,
  pending,
  errorMessage,
  onChange,
  onSubmit,
}: CredentialsFormProps<Name>) {
  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form
      onSubmit={submitForm}
      aria-busy={pending}
      className="flex flex-col gap-4"
    >
      {fields.map((field) => (
        <div key={field.name} className="flex flex-col gap-2">
          <Label htmlFor={field.name}>{field.label}</Label>
          <Input
            id={field.name}
            name={field.name}
            type={field.type}
            autoComplete={field.autoComplete}
            value={values[field.name] ?? ""}
            onChange={(event) => onChange(field.name, event.target.value)}
            disabled={pending}
          />
        </div>
      ))}
      <FormError message={errorMessage} />
      <Button type="submit" disabled={pending}>
        {pending ? authCopy["form.pending"] : submitLabel}
      </Button>
    </form>
  );
}
