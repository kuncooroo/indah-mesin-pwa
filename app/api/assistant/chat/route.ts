import { jsonError, jsonOk } from "@/lib/api/response";
import {
  assistantService,
  type AssistantMessage,
} from "@/lib/services/assistant.service";
import { z } from "zod";

const chatSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(2000),
      }),
    )
    .min(1)
    .max(20),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = chatSchema.safeParse(body);

    if (!parsed.success) {
      return jsonError(parsed.error.issues[0]?.message ?? "Data tidak valid", 422);
    }

    const reply = await assistantService.reply(
      parsed.data.messages as AssistantMessage[],
    );

    return jsonOk({ reply });
  } catch (error) {
    console.error("[assistant/chat]", error);
    return jsonError("Asisten sedang tidak tersedia. Coba lagi nanti.", 500);
  }
}
