CREATE TABLE "email_event" (
	"id" text PRIMARY KEY NOT NULL,
	"message_id" text NOT NULL,
	"provider" text NOT NULL,
	"provider_event_id" text NOT NULL,
	"type" text NOT NULL,
	"occurred_at" timestamp with time zone NOT NULL,
	"received_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "email_event_provider_event_unique" UNIQUE("provider","provider_event_id"),
	CONSTRAINT "email_event_type_check" CHECK ("email_event"."type" in ('delivered', 'delivery_delayed', 'bounced', 'complained'))
);
--> statement-breakpoint
CREATE TABLE "email_message" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"kind" text NOT NULL,
	"recipient_email" text NOT NULL,
	"template_key" text NOT NULL,
	"template_version" integer NOT NULL,
	"status" text DEFAULT 'queued' NOT NULL,
	"provider" text NOT NULL,
	"provider_message_id" text,
	"idempotency_key" text NOT NULL,
	"attempt_count" integer DEFAULT 0 NOT NULL,
	"last_attempt_at" timestamp with time zone,
	"next_attempt_at" timestamp with time zone,
	"last_error_code" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"sent_at" timestamp with time zone,
	"delivered_at" timestamp with time zone,
	CONSTRAINT "email_message_provider_message_id_unique" UNIQUE("provider_message_id"),
	CONSTRAINT "email_message_idempotency_key_unique" UNIQUE("idempotency_key"),
	CONSTRAINT "email_message_kind_check" CHECK ("email_message"."kind" in ('email_verification', 'email_otp', 'password_reset', 'email_change')),
	CONSTRAINT "email_message_status_check" CHECK ("email_message"."status" in ('queued', 'sending', 'sent', 'delivered', 'failed', 'bounced', 'complained', 'suppressed')),
	CONSTRAINT "email_message_attempt_count_check" CHECK ("email_message"."attempt_count" >= 0),
	CONSTRAINT "email_message_template_version_check" CHECK ("email_message"."template_version" >= 1)
);
--> statement-breakpoint
CREATE TABLE "email_suppression" (
	"email_hash" text PRIMARY KEY NOT NULL,
	"reason" text NOT NULL,
	"source_message_id" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "email_suppression_reason_check" CHECK ("email_suppression"."reason" in ('hard_bounce', 'complaint', 'manual'))
);
--> statement-breakpoint
ALTER TABLE "email_event" ADD CONSTRAINT "email_event_message_id_email_message_id_fk" FOREIGN KEY ("message_id") REFERENCES "public"."email_message"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "email_message" ADD CONSTRAINT "email_message_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "email_suppression" ADD CONSTRAINT "email_suppression_source_message_id_email_message_id_fk" FOREIGN KEY ("source_message_id") REFERENCES "public"."email_message"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "email_event_message_id_idx" ON "email_event" USING btree ("message_id");--> statement-breakpoint
CREATE INDEX "email_message_user_id_idx" ON "email_message" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "email_message_created_at_idx" ON "email_message" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "email_message_resend_limit_idx" ON "email_message" USING btree ("recipient_email","kind","created_at") WHERE "email_message"."status" <> 'suppressed';