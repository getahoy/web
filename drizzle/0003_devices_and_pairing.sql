CREATE TABLE "device_code" (
	"id" text PRIMARY KEY NOT NULL,
	"device_code" text NOT NULL,
	"user_code" text NOT NULL,
	"user_id" text,
	"expires_at" timestamp NOT NULL,
	"status" text NOT NULL,
	"last_polled_at" timestamp,
	"polling_interval" integer,
	"client_id" text,
	"scope" text,
	CONSTRAINT "device_code_device_code_unique" UNIQUE("device_code"),
	CONSTRAINT "device_code_user_code_unique" UNIQUE("user_code")
);
--> statement-breakpoint
CREATE TABLE "device_links" (
	"phone_id" uuid NOT NULL,
	"desktop_id" uuid NOT NULL,
	"paired_at" timestamp with time zone DEFAULT now() NOT NULL,
	"revoked_at" timestamp with time zone,
	CONSTRAINT "device_links_phone_id_desktop_id_pk" PRIMARY KEY("phone_id","desktop_id")
);
--> statement-breakpoint
CREATE TABLE "devices" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"kind" text NOT NULL,
	"platform" text NOT NULL,
	"platform_version" text,
	"app_version" text NOT NULL,
	"protocol_version" integer NOT NULL,
	"public_key" "bytea" NOT NULL,
	"display_name" text NOT NULL,
	"capabilities" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"last_seen_at" timestamp with time zone,
	"revoked_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "devices_kind_check" CHECK ("devices"."kind" in ('desktop', 'phone')),
	CONSTRAINT "devices_platform_check" CHECK ("devices"."platform" in ('macos', 'windows', 'linux', 'ios', 'android'))
);
--> statement-breakpoint
CREATE TABLE "pairing_claims" (
	"user_code" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"phone_id" uuid NOT NULL,
	"desktop_public_key" "bytea" NOT NULL,
	"proof" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "device_code" ADD CONSTRAINT "device_code_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "device_links" ADD CONSTRAINT "device_links_phone_id_devices_id_fk" FOREIGN KEY ("phone_id") REFERENCES "public"."devices"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "device_links" ADD CONSTRAINT "device_links_desktop_id_devices_id_fk" FOREIGN KEY ("desktop_id") REFERENCES "public"."devices"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "devices" ADD CONSTRAINT "devices_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pairing_claims" ADD CONSTRAINT "pairing_claims_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pairing_claims" ADD CONSTRAINT "pairing_claims_phone_id_devices_id_fk" FOREIGN KEY ("phone_id") REFERENCES "public"."devices"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "devices_user_id_idx" ON "devices" USING btree ("user_id") WHERE "devices"."revoked_at" is null;--> statement-breakpoint
CREATE UNIQUE INDEX "devices_user_public_key_idx" ON "devices" USING btree ("user_id","public_key") WHERE "devices"."revoked_at" is null;--> statement-breakpoint
CREATE INDEX "pairing_claims_created_at_idx" ON "pairing_claims" USING btree ("created_at");