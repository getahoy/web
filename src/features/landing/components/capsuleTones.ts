export type CapsuleTone = "light" | "night";

type ToneClasses = {
  shell: string;
  shellInvalid: string;
  input: string;
  button: string;
  success: string;
  check: string;
  error: string;
  note: string;
  focus: string;
};

export const capsuleTones: Record<CapsuleTone, ToneClasses> = {
  light: {
    shell:
      "xs:border-rope xs:bg-paper xs:focus-within:border-signal xs:focus-within:shadow-float xs:focus-within:ring-4 xs:focus-within:ring-signal-mist",
    shellInvalid: "xs:border-flare xs:bg-paper",
    input:
      "border-rope bg-paper text-ink placeholder:text-fog focus-visible:border-signal focus-visible:ring-signal-mist aria-invalid:border-flare",
    button: "bg-ink text-white hover:bg-ink",
    success: "border-rope bg-paper text-ink",
    check: "bg-kelp text-paper",
    error: "text-flare",
    note: "text-driftwood",
    focus: "focus-visible:outline-signal",
  },
  night: {
    shell:
      "xs:border-night-rope xs:bg-night-raised xs:focus-within:border-night-signal xs:focus-within:shadow-float xs:focus-within:ring-4 xs:focus-within:ring-night-signal-mist",
    shellInvalid: "xs:border-night-flare xs:bg-night-raised",
    input:
      "border-night-rope bg-night-raised text-sailcloth placeholder:text-fog focus-visible:border-night-signal focus-visible:ring-night-signal-mist aria-invalid:border-night-flare",
    button: "bg-sailcloth text-ink hover:bg-sailcloth",
    success: "border-night-rope bg-night-raised text-sailcloth",
    check: "bg-night-kelp text-night-raised",
    error: "text-night-flare",
    note: "text-night-driftwood",
    focus: "focus-visible:outline-night-signal",
  },
};
