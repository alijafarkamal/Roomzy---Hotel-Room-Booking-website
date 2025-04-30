
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BookingsList from "@/components/dashboard/BookingsList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">My Dashboard</h1>
            <p className="text-gray-600 mt-2">
              View and manage your bookings.
            </p>
          </div>

          <Tabs defaultValue="bookings" className="space-y-6">
            <div className="bg-white p-1 rounded-lg inline-block">
              <TabsList>
                <TabsTrigger value="bookings">My Bookings</TabsTrigger>
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="bookings" className="space-y-6">
              <BookingsList />
            </TabsContent>

            <TabsContent value="profile">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
                <p className="text-gray-600 mb-6">
                  This section is under development. You'll soon be able to view and edit your profile details here.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="preferences">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Your Preferences</h2>
                <p className="text-gray-600 mb-6">
                  This section is under development. You'll soon be able to set your preferences for room types, notifications, and more.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
