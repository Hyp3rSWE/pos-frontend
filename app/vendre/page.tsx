"use client";
import MySidebar from "../../components/sidebar";
import AppTable from "@/components/table/table";

export default function Stock() {
  return (
    <div className="h-full w-full">
      <MySidebar />
      <div className="ml-48 p-4">
        <AppTable />
      </div>

      <h1>This is the stock page!!</h1>
    </div>
  );
}
