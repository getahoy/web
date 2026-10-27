import { AUDIO_UPLOAD_FIELD, MAX_AUDIO_UPLOAD_BYTES } from "@getahoy/protocol";

const FORM_OVERHEAD_BYTES = 16 * 1024;

export type AudioUpload =
  | { outcome: "file"; file: File }
  | { outcome: "missing" }
  | { outcome: "tooLarge" };

export async function readAudio(request: Request): Promise<AudioUpload> {
  const declared = Number(request.headers.get("content-length") ?? 0);
  if (declared > MAX_AUDIO_UPLOAD_BYTES + FORM_OVERHEAD_BYTES) {
    return { outcome: "tooLarge" };
  }
  const form = await request.formData().catch(() => null);
  const file = form?.get(AUDIO_UPLOAD_FIELD);
  if (!(file instanceof File) || file.size === 0) return { outcome: "missing" };
  if (file.size > MAX_AUDIO_UPLOAD_BYTES) return { outcome: "tooLarge" };
  return { outcome: "file", file };
}
