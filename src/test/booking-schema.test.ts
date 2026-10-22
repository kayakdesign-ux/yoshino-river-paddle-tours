import { describe, expect, it } from "vitest";
import { bookingSchema, bookingMessage } from "@/lib/booking-schema";

const valid = { id: "279a6fbc-529f-4147-ade2-5e31ce5d52c6", name: "テスト", contact: "09012345678", preferredDate: "2027-07-10", departure: "09:30", participants: { s1a: 1, s1k: 0, s2a: 0, s2p: 0, pa: 0, pk: 0 }, weight80: 0 };
describe("booking validation", () => {
  it("accepts 09:30 departure", () => expect(bookingSchema.safeParse(valid).success).toBe(true));
  it("accepts 13:30 departure", () => expect(bookingSchema.safeParse({ ...valid, departure: "13:30" }).success).toBe(true));
  it("rejects other departures", () => expect(bookingSchema.safeParse({ ...valid, departure: "09:45" }).success).toBe(false));
  it("requires matching tandem counts", () => expect(bookingSchema.safeParse({ ...valid, participants: { ...valid.participants, s2a: 1 } }).success).toBe(false));
  it("includes complete enquiry in stored message", () => {
    const message = bookingMessage(bookingSchema.parse(valid));
    expect(message).toContain("連絡先：09012345678");
    expect(message).toContain("合計：1人");
  });
  it("rejects empty contact", () => expect(bookingSchema.safeParse({ ...valid, contact: "" }).success).toBe(false));
});