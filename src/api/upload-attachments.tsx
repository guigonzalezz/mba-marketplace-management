import { api } from "../utils/axios";
import { Attachment } from "./types/attachment";

export interface UploadAttachmentsBody {
  files: FormData;
}

export async function uploadAttachments({
  files,
}: UploadAttachmentsBody): Promise<{ attachments: Attachment[] }> {
  const attachments = await api.post<{ attachments: Attachment[] }>(
    "/attachments",
    files,
  );

  return attachments.data;
}
