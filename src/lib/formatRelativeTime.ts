export const formatRelativeTime = (createdAt: string): string => {
  // 「今」と「投稿時刻」の差を、ミリ秒で計算する
  const diffMs = Date.now() - new Date(createdAt).getTime();

  const diffSeconds = Math.floor(diffMs / 1000);
  // ミリ秒を「分」に変換（切り捨て）
  const diffMinutes = Math.floor(diffMs / (60 * 1000));
  // ミリ秒を「時間」に変換
  const diffHours = Math.floor(diffMs / (60 * 60 * 1000));
  // ミリ秒を「日」に変換
  const diffDays = Math.floor(diffMs / (24 * 60 * 60 * 1000));

  if (diffSeconds < 60) return `たった今`;
  if (diffMinutes < 60) return `${diffMinutes}分前`;
  if (diffHours < 24) return `${diffHours}時間前`;
  if (diffDays < 30) return `${diffDays}日前`;

  // 1ヶ月以上前なら、絶対的な日付を表示
  return new Date(createdAt).toLocaleDateString("ja-JP");
};
