import Sidebar from "../../components/Sidebar";

export default function AboutPage() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">About this Dashboard</h1>

        <p className="mb-4">
          This dashboard visualizes the global and regional trends in renewable
          energy adoption from 1965 to 2024. It helps you explore how different
          regions and countries are progressing toward a sustainable energy
          future.
        </p>

        <p className="mb-4">
          The data used is based on international energy reports and reflects
          the share of total energy that comes from renewable sources such as
          solar, wind, hydro, and bioenergy.
        </p>

        <p className="mb-4">On the pages, you can view:</p>

        <ul className="list-disc list-inside mb-4">
          <li>Trends in renewable energy share by region</li>
          <li>Breakdowns by energy type (solar, wind, hydro, etc.)</li>
        </ul>

        <p className="mb-4">
          This app was created using <strong>Next.js</strong> and{" "}
          <strong>Recharts</strong>, with data pre-processed using{" "}
          <strong>Papaparse</strong>. It’s part of a portfolio project to
          explore data visualization for environmental awareness.
        </p>

        <p>Thank you for visiting!</p>
      </div>
    </div>
  );
}
