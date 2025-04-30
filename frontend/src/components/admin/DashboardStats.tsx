
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { PieChart, Pie, Cell, Legend } from "recharts";

// Mock data for charts
const bookingsByMonth = [
  { month: 'Jan', bookings: 25 },
  { month: 'Feb', bookings: 30 },
  { month: 'Mar', bookings: 35 },
  { month: 'Apr', bookings: 28 },
  { month: 'May', bookings: 32 },
  { month: 'Jun', bookings: 45 },
  { month: 'Jul', bookings: 50 },
  { month: 'Aug', bookings: 55 },
  { month: 'Sep', bookings: 40 },
  { month: 'Oct', bookings: 35 },
  { month: 'Nov', bookings: 30 },
  { month: 'Dec', bookings: 28 },
];

const statusData = [
  { name: 'Confirmed', value: 40, color: '#10b981' },
  { name: 'Pending', value: 15, color: '#f59e0b' },
  { name: 'Completed', value: 35, color: '#3b82f6' },
  { name: 'Cancelled', value: 10, color: '#ef4444' },
];

const DashboardStats = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">357</div>
            <p className="text-sm text-green-600 flex items-center mt-1">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 mr-1" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" 
                  clipRule="evenodd" 
                />
              </svg>
              12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Occupancy Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">78.3%</div>
            <p className="text-sm text-green-600 flex items-center mt-1">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 mr-1" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" 
                  clipRule="evenodd" 
                />
              </svg>
              5.2% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$128,450</div>
            <p className="text-sm text-green-600 flex items-center mt-1">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 mr-1" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" 
                  clipRule="evenodd" 
                />
              </svg>
              8.5% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Bookings by Month</CardTitle>
            <CardDescription>
              Number of bookings recorded each month in the current year.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bookingsByMonth} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value} bookings`, 'Bookings']} />
                <Bar dataKey="bookings" fill="#33C3F0" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Booking Status Distribution</CardTitle>
            <CardDescription>
              Current distribution of bookings by their status.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={90}
                  innerRadius={50}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} bookings`, 'Count']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardStats;
