CREATE TABLE "waitlist_signups" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"source" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "waitlist_signups_email_unique" UNIQUE("email"),
	CONSTRAINT "waitlist_signups_source_check" CHECK ("waitlist_signups"."source" in ('hero', 'cta')),
	CONSTRAINT "waitlist_signups_email_check" CHECK ("waitlist_signups"."email" = lower(btrim("waitlist_signups"."email")) and char_length("waitlist_signups"."email") <= 254)
);
