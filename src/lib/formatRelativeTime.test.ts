import { formatRelativeTime } from "./formatRelativeTime";

describe("formatRelativeTime", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  test("投稿から30分後なら「30分前」と表示される", () => {
    vi.setSystemTime(new Date("2026-06-30T12:00:00"));

    const result = formatRelativeTime("2026-06-30T11:30:00");

    expect(result).toBe("30分前");
  });
});
