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

  test("投稿から2時間後なら『2時間前』と表示される", () => {
    vi.setSystemTime(new Date("2026-06-30T12:00:00"));

    const result = formatRelativeTime("2026-06-30T10:00:00");

    expect(result).toBe("2時間前");
  });

  test("投稿から3日後なら『3日前』と表示される", () => {
    vi.setSystemTime(new Date("2026-06-30T12:00:00"));

    const result = formatRelativeTime("2026-06-27T11:30:00");

    expect(result).toBe("3日前");
  });

  test("投稿から2ヶ月後なら、絶対日付（例：2026/4/30）で表示される", () => {
    vi.setSystemTime(new Date("2026-06-30T12:00:00"));

    const result = formatRelativeTime("2026-04-30T11:30:00");

    expect(result).toBe("2026/4/30");
  });
  test("投稿から60以内なら『たった今』と表示される", () => {
    vi.setSystemTime(new Date("2026-06-30T12:00:00"));

    const result = formatRelativeTime("2026-06-30T11:59:50");

    expect(result).toBe("たった今");
  });
  test("未来の時刻でもマイナスにならない", () => {
    vi.setSystemTime(new Date("2026-06-30T12:00:00"));

    const result = formatRelativeTime("2026-06-30T12:00:10");

    expect(result).toBe("たった今");
  });
});
