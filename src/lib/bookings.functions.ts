import { createServerFn } from "@tanstack/react-start";
import { bookingSchema, bookingMessage } from "./booking-schema";

// Purpose-built public enquiry submission; no reads or arbitrary email sends.
export const submitBooking = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => bookingSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("booking_requests").insert({
      id: data.id, name: data.name, contact: data.contact,
      preferred_date: data.preferredDate, departure: data.departure,
      participants: data.participants, weight80: data.weight80,
      total: Object.values(data.participants).reduce((a, b) => a + b, 0),
      message: bookingMessage(data),
    });
    if (error && error.code !== "23505") {
      throw new Error("送信内容を保存できませんでした。時間をおいて再度お試しください。");
    }
    return { saved: true };
  });