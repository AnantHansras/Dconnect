import { formatDistanceToNow } from "date-fns";
import { Phone, Building2, Search, Filter } from "lucide-react";
import { useState, useEffect } from "react";
import { fetchAllConnections } from "../services/connectionAPI";
// Fake data for preview
const fakeConnections = [
  {
    _id: "1",
    companyName: "Tech Innovations Inc.",
    companyPhone: "+1 (555) 123-4567",
    jobSeekerName: "Alex Johnson",
    jobSeekerPhone: "+1 (555) 987-6543",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
  {
    _id: "2",
    companyName: "Global Solutions Ltd.",
    companyPhone: "+1 (555) 222-3333",
    jobSeekerName: "Sam Williams",
    jobSeekerPhone: "+1 (555) 444-5555",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
  },
  {
    _id: "3",
    companyName: "Creative Designs Co.",
    companyPhone: "+1 (555) 777-8888",
    jobSeekerName: "Jamie Taylor",
    jobSeekerPhone: "+1 (555) 999-0000",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
  },
  {
    _id: "4",
    companyName: "Nexus Enterprises",
    companyPhone: "+1 (555) 111-2222",
    jobSeekerName: "Morgan Lee",
    jobSeekerPhone: "+1 (555) 333-4444",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
  },
  {
    _id: "5",
    companyName: "Future Systems",
    companyPhone: "+1 (555) 666-7777",
    jobSeekerName: "Riley Chen",
    jobSeekerPhone: "+1 (555) 888-9999",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14),
  },
];

function getInitials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function getAvatarColor(name) {
  const colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-teal-500",
  ];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
}

export default function AllConnections() {
  //const connections = fakeConnections;
  const [connections, setConnections] = useState([]);
  useEffect(() => {
    const fetchConnections = async () => {
        try {
          const response = await fetchAllConnections(token);
          if (response && response.data) {
            setConnections(response.data);
          } else {
            console.error("Failed to fetch connections");
          }
        } catch (error) {
          console.error("Error fetching connections:", error);
        }
        }
    fetchConnections();
    }
    , []);
  return (
    <div className="container mx-auto py-6 px-0 md:px-6 lg:px-8 pt-24">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 px-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Connections</h1>
            <p className="text-gray-500 mt-1">
              Manage and view all connections between companies and job seekers.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="search"
                placeholder="Search connections..."
                className="pl-8 pr-4 py-2 border rounded-md w-full md:w-[250px] lg:w-[300px] focus:outline-none focus:ring"
              />
            </div>
          </div>
        </div>

        <div className="bg-white border px-0 rounded-md shadow-md">
          <div className="px-6 py-4 border-b flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">All Connections</h2>
              <p className="text-gray-500 text-sm">Showing {connections.length} total connections</p>
            </div>
            <span className="text-xs border px-2 py-1 rounded text-gray-600">Updated just now</span>
          </div>
          <div className="px-2 py-2 overflow-x-auto">
            {connections.length === 0 ? (
              <div className="text-center py-10">
                <div className="rounded-full bg-gray-100 p-6 inline-block mb-4">
                  <Building2 className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold">No connections found</h3>
                <p className="text-gray-500 max-w-md mx-auto mt-2">
                  There are no connections in the system yet. Connections will appear here once they are created.
                </p>
              </div>
            ) : (
              <table className="w-full text-sm text-left ">
                <thead>
                  <tr className="border-b">
                    <th className="p-3 w-[190px] md:w-[250px]">Company</th>
                    <th className="p-3 hidden md:table-cell">Company Phone</th>
                    <th className="p-3">Job Seeker</th>
                    <th className="p-3 hidden md:table-cell">Job Seeker Phone</th>
                    <th className="p-3 text-right">Created</th>
                  </tr>
                </thead>
                <tbody>
                  {connections.map((conn) => (
                    <tr key={conn._id} className="border-b hover:bg-gray-50 group">
                      <td className="p-3 font-medium">
                        <div className="flex items-center gap-3">
                          <div className="hidden sm:flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-700 text-sm font-bold">
                            {getInitials(conn.companyName)}
                          </div>
                          <div>
                            <div>{conn.companyName}</div>
                            <div className="text-xs text-gray-500 md:hidden">{conn.companyPhone}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-3 hidden md:table-cell">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-400" />
                          {conn.companyPhone}
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <div className={`hidden sm:flex h-8 w-8 items-center justify-center rounded-full text-white ${getAvatarColor(conn.jobSeekerName)} text-sm font-bold`}>
                            {getInitials(conn.jobSeekerName)}
                          </div>
                          <div>
                            <div>{conn.jobSeekerName}</div>
                            <div className="text-xs text-gray-500 md:hidden">{conn.jobSeekerPhone}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-3 hidden md:table-cell">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-400" />
                          {conn.jobSeekerPhone}
                        </div>
                      </td>
                      <td className="p-3 text-right">
                        <span className="text-xs md:bg-gray-100 px-2 py-1 rounded">
                          {formatDistanceToNow(new Date(conn.createdAt), { addSuffix: true })}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
