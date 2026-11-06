CREATE TABLE "command_history" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"phone_id" uuid,
	"desktop_id" uuid,
	"phone_key" "bytea" NOT NULL,
	"mac_key" "bytea" NOT NULL,
	"mac_name" text NOT NULL,
	"heard" text NOT NULL,
	"did" text,
	"status" text NOT NULL,
	"app" text,
	"via" text,
	"reason" text,
	"timings" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"follow_ups" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"rev" integer NOT NULL,
	"started_at" timestamp with time zone NOT NULL,
	"finished_at" timestamp with time zone,
	"deleted_at" timestamp with time zone,
	CONSTRAINT "command_history_status_check" CHECK ("command_history"."status" in ('running', 'done', 'choice', 'failed', 'blocked', 'cancelled')),
	CONSTRAINT "command_history_via_check" CHECK ("command_history"."via" in ('rules', 'ai')),
	CONSTRAINT "command_history_reason_check" CHECK ("command_history"."reason" in ('macUnreachable', 'noAnswer', 'nothingHeard', 'transcribeFailed', 'unknownApp', 'nothingSelected', 'targetNotFound', 'blockedApp', 'screenChanged', 'offline', 'other'))
);
--> statement-breakpoint
CREATE TABLE "history_settings" (
	"user_id" text PRIMARY KEY NOT NULL,
	"keep_history" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE "problem_reports" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"history_id" uuid NOT NULL,
	"snapshot" jsonb NOT NULL,
	"note" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "problem_reports_note_check" CHECK (char_length("problem_reports"."note") <= 500)
);
--> statement-breakpoint
ALTER TABLE "command_history" ADD CONSTRAINT "command_history_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "command_history" ADD CONSTRAINT "command_history_phone_id_devices_id_fk" FOREIGN KEY ("phone_id") REFERENCES "public"."devices"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "command_history" ADD CONSTRAINT "command_history_desktop_id_devices_id_fk" FOREIGN KEY ("desktop_id") REFERENCES "public"."devices"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "history_settings" ADD CONSTRAINT "history_settings_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "problem_reports" ADD CONSTRAINT "problem_reports_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "command_history_user_started_idx" ON "command_history" USING btree ("user_id","started_at" DESC NULLS LAST) WHERE "command_history"."deleted_at" is null;--> statement-breakpoint
CREATE INDEX "command_history_user_mac_started_idx" ON "command_history" USING btree ("user_id","mac_key","started_at" DESC NULLS LAST) WHERE "command_history"."deleted_at" is null;