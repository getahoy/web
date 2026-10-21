import { authCopy } from "../copy/authCopy";

type AccountSummaryProps = {
  name: string;
  email: string;
};

export function AccountSummary({ name, email }: AccountSummaryProps) {
  return (
    <dl className="flex flex-col gap-2">
      <dt className="text-muted-foreground text-sm">
        {authCopy["field.name"]}
      </dt>
      <dd>{name}</dd>
      <dt className="text-muted-foreground text-sm">
        {authCopy["field.email"]}
      </dt>
      <dd>{email}</dd>
    </dl>
  );
}
