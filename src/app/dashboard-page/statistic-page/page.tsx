import AppAreaChart from "@/components/dashboard/AppAreaChart";
import AppBarChart from "@/components/dashboard/AppBarChart";
import AppPieChart from "@/components/dashboard/AppPieChart";
import TransactionsPage from "../transaction-page/page";

export default function StatisticDashboardPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
      <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2">
        <AppBarChart />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2">
        <AppAreaChart />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg">
        <TransactionsPage />
      </div>
      <div className="bg-primary-foreground p-4 rounded-lg">
        <AppPieChart />
      </div>
    </div>
  );
}
