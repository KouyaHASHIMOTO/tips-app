export const SettingsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-xl font-bold mb-6">設定</h1>
          <div className="border-b border-gray-200 pb-6">
            <h2 className="text-lg font-semibold mb-4">
              プロフィールアイコンの変更
            </h2>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold">
                ?
              </div>
              <input
                type="file"
                accept="image/*"
                className="text-sm text-gray-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
