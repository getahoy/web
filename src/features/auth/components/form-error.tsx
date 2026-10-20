type FormErrorProps = {
  message: string | null;
};

export function FormError({ message }: FormErrorProps) {
  return (
    <p
      role="alert"
      aria-live="polite"
      className="min-h-6 text-small text-danger"
    >
      {message}
    </p>
  );
}
