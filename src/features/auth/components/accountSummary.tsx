type AccountSummaryProps = {
  name: string;
  email: string;
};

export function AccountSummary({ name, email }: AccountSummaryProps) {
  return (
    <dl className="flex flex-col gap-2">
      <dt className="text-small text-muted">Name</dt>
      <dd>{name}</dd>
      <dt className="text-small text-muted">Email</dt>
      <dd>{email}</dd>
    </dl>
  );
}
