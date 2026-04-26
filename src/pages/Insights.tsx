import { useMemo } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { getActivities } from "@/lib/activity";

const MODULE_LABELS = {
  flights: "Flights",
  hotels: "Hotels",
  trains: "Trains",
  cabs: "Cabs",
  bus: "Buses",
  holidays: "Holidays",
} as const;

export default function Insights() {
  const { theme } = useTheme();
  const isDark = theme !== "light";
  const activities = getActivities();

  const metrics = useMemo(() => {
    const searches = activities.filter((a) => a.type === "search");
    const bookings = activities.filter((a) => a.type === "booking");
    const cancels = activities.filter((a) => a.type === "cancel");
    const totalValue = bookings.reduce((sum, item) => sum + (item.amount || 0), 0);
    const averageValue = bookings.length ? Math.round(totalValue / bookings.length) : 0;

    const byModule = activities.reduce<Record<string, number>>((acc, item) => {
      acc[item.module] = (acc[item.module] || 0) + 1;
      return acc;
    }, {});

    const topModule = Object.entries(byModule).sort((a, b) => b[1] - a[1])[0];

    return {
      searches: searches.length,
      bookings: bookings.length,
      cancels: cancels.length,
      averageValue,
      byModule,
      topModule: topModule ? MODULE_LABELS[topModule[0] as keyof typeof MODULE_LABELS] : "N/A",
    };
  }, [activities]);

  const maxCount = Math.max(1, ...Object.values(metrics.byModule));

  return (
    <div
      className="min-h-screen px-4 sm:px-6 md:px-12 lg:px-20 pt-80 sm:pt-60 md:pt-36 lg:pt-40 pb-20"
      style={{
        background: isDark
          ? "#0b0c32"
          : "radial-gradient(125% 125% at 50% 90%, #fff 40%, #6366f1 100%)",
      }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className={`absolute -top-24 -left-10 h-64 w-64 rounded-full blur-3xl ${
            isDark ? "bg-indigo-500/20" : "bg-indigo-300/50"
          }`}
        />
        <div
          className={`absolute top-52 right-0 h-72 w-72 rounded-full blur-3xl ${
            isDark ? "bg-violet-500/20" : "bg-violet-300/40"
          }`}
        />
      </div>
      <div className="max-w-6xl mx-auto">
        <h1 className={`text-3xl md:text-4xl font-bold mb-2 ${isDark ? "text-gray-100" : "text-gray-800"}`}>
          Travel Insights
        </h1>
        <p className={`mb-8 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
          Quick analysis of your activity in WanderWise.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
          <MetricCard title="Searches" value={metrics.searches} icon="🔎" isDark={isDark} />
          <MetricCard title="Bookings" value={metrics.bookings} icon="✈️" isDark={isDark} />
          <MetricCard title="Avg Booking Value" value={`₹${metrics.averageValue}`} icon="💸" isDark={isDark} />
          <MetricCard title="Top Module" value={metrics.topModule} icon="📊" isDark={isDark} />
        </div>

        <div
          className={`rounded-3xl p-5 md:p-6 mb-8 backdrop-blur-md transition duration-300 hover:-translate-y-0.5 ${
            isDark
              ? "bg-[#15173a]/85 text-gray-100 border border-indigo-800/40"
              : "bg-white/90 border border-indigo-100 shadow-xl shadow-indigo-100/40"
          }`}
        >
          <h2 className="text-lg md:text-xl font-semibold mb-4">Module Usage</h2>
          <div className="space-y-3">
            {Object.entries(MODULE_LABELS).map(([moduleKey, label]) => {
              const count = metrics.byModule[moduleKey] || 0;
              const width = Math.max(5, Math.round((count / maxCount) * 100));
              return (
                <div key={moduleKey}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{label}</span>
                    <span>{count}</span>
                  </div>
                  <div className={`h-2.5 rounded-full overflow-hidden ${isDark ? "bg-[#24275f]" : "bg-indigo-100"}`}>
                    <div
                      className={`h-2.5 rounded-full transition-all duration-500 ${
                        isDark ? "bg-gradient-to-r from-indigo-400 to-violet-400" : "bg-gradient-to-r from-indigo-500 to-violet-500"
                      }`}
                      style={{ width: `${width}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div
          className={`rounded-3xl p-5 md:p-6 backdrop-blur-md ${
            isDark
              ? "bg-[#15173a]/85 text-gray-100 border border-indigo-800/40"
              : "bg-white/90 border border-indigo-100 shadow-xl shadow-indigo-100/40"
          }`}
        >
          <h2 className="text-lg md:text-xl font-semibold mb-4">Recent Activity</h2>
          {activities.length === 0 ? (
            <p className={`rounded-xl px-4 py-6 text-center ${isDark ? "bg-[#1d2050] text-gray-400" : "bg-indigo-50 text-gray-500"}`}>
              No activity yet. Search flights or make a booking to populate insights.
            </p>
          ) : (
            <div className="space-y-3">
              {activities.slice(0, 8).map((item) => (
                <div
                  key={item.id}
                  className={`rounded-xl px-4 py-3 text-sm transition duration-300 hover:-translate-y-0.5 ${
                    isDark
                      ? "bg-[#1d2050] text-gray-200 hover:bg-[#23275f]"
                      : "bg-indigo-50 text-gray-700 hover:bg-indigo-100"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-3">
                    <span className="font-medium">{item.summary}</span>
                    <span className={`text-xs sm:text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                      {new Date(item.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function MetricCard({
  title,
  value,
  icon,
  isDark,
}: {
  title: string;
  value: string | number;
  icon: string;
  isDark: boolean;
}) {
  return (
    <div
      className={`rounded-2xl p-5 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:shadow-lg ${
        isDark
          ? "bg-[#15173a]/85 text-gray-100 border border-indigo-800/40 hover:shadow-indigo-900/30"
          : "bg-white/95 border border-indigo-100 hover:shadow-indigo-200/50"
      }`}
    >
      <p className={`text-sm flex items-center gap-2 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
        <span>{icon}</span>
        <span>{title}</span>
      </p>
      <p className="text-2xl md:text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}
