import { describe, expect, it } from "vitest";
import { bookingSchema, bookingMessage } from "@/lib/booking-schema";

const valid = { id: "279a6fbc-529f-4147-ade2-5e31ce5d52c6", name: "テスト", contact: "09012345678", preferredDate: "2027-07-10", departure: "09:45", participants: { s1a: 1, s1k: 0, s2a: 0, s2p: 0, pa: 0, pk: 0 }, weight80: 0 };
const ok = (o: object) => bookingSchema.safeParse({ ...valid, ...o }).success;
describe("booking validation", () => {
  it("summer (7/10) morning is 9:45", () => expect(ok({})).toBe(true));
  it("summer end (9/30) morning is 9:45", () => expect(ok({ preferredDate: "2027-09-30" })).toBe(true));
  it("summer rejects 10:45", () => expect(ok({ departure: "10:45" })).toBe(false));
  it("7/9 morning is 10:45", () => expect(ok({ preferredDate: "2027-07-09", departure: "10:45" })).toBe(true));
  it("10/1 rejects 9:45", () => expect(ok({ preferredDate: "2027-10-01" })).toBe(false));
  it("13:30 any season", () => expect(ok({ preferredDate: "2027-04-01", departure: "13:30" })).toBe(true));
  it("rejects 9:30", () => expect(ok({ departure: "09:30" })).toBe(false));
  it("rejects outside 4/1-11/30", () => {
    expect(ok({ preferredDate: "2027-03-31", departure: "10:45" })).toBe(false);
    expect(ok({ preferredDate: "2027-12-01", departure: "10:45" })).toBe(false);
    expect(ok({ preferredDate: "2027-11-30", departure: "10:45" })).toBe(true);
  });
  it("requires matching tandem counts", () => expect(ok({ participants: { ...valid.participants, s2a: 1 } })).toBe(false));
  it("includes complete enquiry in stored message", () => {
    const message = bookingMessage(bookingSchema.parse(valid));
    expect(message).toContain("連絡先：09012345678");
    expect(message).toContain("合計：1人");
  });
  it("rejects empty contact", () => expect(ok({ contact: "" })).toBe(false));
});
