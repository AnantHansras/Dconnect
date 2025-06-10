import { formatDistanceToNow } from "date-fns";
import { Phone, Building2, Search, Filter } from "lucide-react";
import { useState, useEffect } from "react";
import { fetchAllApplications, fetchAllConnections } from "../services/connectionAPI";


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

export default function Application() {
  //const connections = fakeConnections;
  const [connections, setConnections] = useState([]);
  useEffect(() => {
    const fetchConnections = async () => {
        try {
          const response = await fetchAllApplications();
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
            <h1 className="text-3xl font-bold tracking-tight">Application</h1>
            <p className="text-gray-500 mt-1">
              Manage and view all application by jobseekers for companies.
            </p>
          </div>
          
        </div>

        <div className="bg-white border px-0 rounded-md shadow-md">
          <div className="px-6 py-4 border-b flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">All Applications</h2>
              <p className="text-gray-500 text-sm">Showing {connections.length} total applications</p>
            </div>
            <span className="text-xs border px-2 py-1 rounded text-gray-600">Updated just now</span>
          </div>
          <div className="px-2 py-2 overflow-x-auto">
            {connections.length === 0 ? (
              <div className="text-center py-10">
                <div className="rounded-full bg-gray-100 p-6 inline-block mb-4">
                  <Building2 className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold">No applications found</h3>
                <p className="text-gray-500 max-w-md mx-auto mt-2">
                  There are no applications in the system yet. Applications will appear here once they are created.
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
