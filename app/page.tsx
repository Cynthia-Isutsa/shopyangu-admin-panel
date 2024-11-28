import DashboardTabs from "@/components/dashboard/DashboardTabs";
import PageTitle from "@/components/PageTitle";


export default function Home() {
  return (
    <div className="flex flex-col gap-5 w-full px-10">
   
      <PageTitle title={`Shop Yangu Dashboard`} />
      <DashboardTabs />
      
  </div>
  );
}
