type FormErrorProps = {
  message: string | null;
};

export function FormError({ message }: FormErrorProps) {
  return (
    <p
      role="alert"
      aria-live="polite"
      className="min-h-5 text-destructive text-sm"
    >
      {message}
    </p>
  );
}
