
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DashboardStats from "@/components/admin/DashboardStats";
import RoomManagement from "@/components/admin/RoomManagement";
import BookingManagement from "@/components/admin/BookingManagement";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

const Admin = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">
              Manage rooms, bookings, and view reports.
            </p>
          </div>

          <Tabs defaultValue="dashboard" className="space-y-6">
            <div className="bg-white p-1 rounded-lg inline-block">
              <TabsList>
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="rooms">Room Management</TabsTrigger>
                <TabsTrigger value="bookings">Booking Management</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="dashboard" className="space-y-6">
              <DashboardStats />
            </TabsContent>

            <TabsContent value="rooms" className="space-y-6">
              <RoomManagement />
            </TabsContent>

            <TabsContent value="bookings" className="space-y-6">
              <BookingManagement />
            </TabsContent>

            <TabsContent value="reports">
              <Card className="p-8">
                <h2 className="text-xl font-semibold mb-4">Detailed Reports</h2>
                <p className="text-gray-600 mb-6">
                  This section is under development. You'll soon be able to view and export detailed reports on occupancy, revenue, and more.
                </p>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
