ALTER TABLE "device_links" ADD COLUMN "revoked_by" uuid;--> statement-breakpoint
ALTER TABLE "device_links" ADD COLUMN "revoke_reason" text;--> statement-breakpoint
ALTER TABLE "device_links" ADD CONSTRAINT "device_links_revoked_by_devices_id_fk" FOREIGN KEY ("revoked_by") REFERENCES "public"."devices"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "device_links" ADD CONSTRAINT "device_links_revoke_reason_check" CHECK ("device_links"."revoke_reason" in ('removed', 'replaced', 'signed_out'));