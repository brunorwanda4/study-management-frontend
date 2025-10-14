"use client";

import { useRealtimeImproved } from "@/lib/hooks/useRealtimeImproved";
import { SectorModel } from "@/lib/schema/admin/sectorSchema";
import { authContext } from "@/lib/utils/auth-context";
import apiRequest from "@/service/api-client";
import { useEffect, useState } from "react";

export default function SectorsTableTest() {
  const [sectors, setSectors] = useState<SectorModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string>("");

  // Fetch initial sectors
  useEffect(() => {
    const fetchSectors = async () => {
      const auth = await authContext();
      try {
        setError(null);
        setDebugInfo("Starting to fetch sectors...");

        const response = await apiRequest<void, SectorModel[]>(
          "get",
          "/sectors",
          undefined,
          {
            token: auth?.token,
          },
        );

        if (response.data) {
          setSectors(response.data);
          setDebugInfo(`Successfully fetched ${response.data.length} sectors`);
        } else if (response.error) {
          setError(response.error);
          setDebugInfo(`Error: ${response.error}`);
          console.error("Failed to fetch sectors:", response.error);
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        setError(errorMessage);
        setDebugInfo(`Fetch error: ${errorMessage}`);
        console.error("Failed to fetch sectors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSectors();
  }, []);

  // Real-time updates using hook only
  const {
    isConnected,
    error: realtimeError,
    connect,
    disconnect,
  } = useRealtimeImproved<SectorModel>(
    "sector",
    (newSector) => {
      console.log("📨 Sector created:", newSector);
      setSectors((prev) => {
        const exists = prev.some(
          (s) =>
            s.id === newSector.id ||
            s._id === newSector.id ||
            s._id === newSector._id,
        );
        return exists ? prev : [...prev, newSector];
      });
    },
    (updatedSector) => {
      console.log("📨 Sector updated:", updatedSector);
      setSectors((prev) =>
        prev.map((sector) => {
          const sectorId = sector.id || sector._id;
          const updatedId = updatedSector.id || updatedSector._id;
          return sectorId === updatedId ? updatedSector : sector;
        }),
      );
    },
    (deletedId) => {
      console.log("📨 Sector deleted:", deletedId);
      setSectors((prev) =>
        prev.filter((sector) => {
          const sectorId = sector.id || sector._id;
          return sectorId !== deletedId;
        }),
      );
    },
  );

  // Test manual connection
  const testConnection = async () => {
    setDebugInfo("Testing manual connection...");
    try {
      await connect();
      setDebugInfo("Manual connection attempt completed");
    } catch (error) {
      setDebugInfo(`Manual connection failed: ${error}`);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-lg">Loading sectors...</div>
      </div>
    );
  }

  if (error || realtimeError) {
    return (
      <div className="bg-base-100 rounded-lg border border-red-300 p-4">
        <div className="flex items-center gap-2 text-red-800">
          <span>❌</span>
          <span>Error loading sectors: {error || realtimeError}</span>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-lg border p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">Sectors Table (Real-time Test)</h2>
        <div className="flex items-center gap-2">
          <div
            className={`h-3 w-3 rounded-full ${
              isConnected ? "animate-pulse bg-green-500" : "bg-red-500"
            }`}
          ></div>
          <span className="text-sm">
            {isConnected ? "Live" : "Disconnected"}
          </span>
          <button
            onClick={testConnection}
            className="ml-2 rounded bg-blue-500 px-2 py-1 text-xs text-white hover:bg-blue-600"
          >
            Test Connect
          </button>
          <button
            onClick={disconnect}
            className="rounded bg-gray-500 px-2 py-1 text-xs text-white hover:bg-gray-600"
          >
            Disconnect
          </button>
        </div>
      </div>

      {/* Debug Info */}
      <div className="mb-4 rounded p-2 text-sm">
        <div className="font-mono text-xs">{debugInfo}</div>
        <div>Total sectors: {sectors.length}</div>
        <div>
          Connection status: {isConnected ? "Connected" : "Disconnected"}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="border-base-content/30 min-w-full border-collapse border">
          <thead>
            <tr className="bg-base-100">
              <th className="border-base-content/30 border px-4 py-2 text-left">
                Name
              </th>
              <th className="border-base-content/30 border px-4 py-2 text-left">
                Username
              </th>
              <th className="border-base-content/30 border px-4 py-2 text-left">
                Country
              </th>
              <th className="border-base-content/30 border px-4 py-2 text-left">
                Type
              </th>
              <th className="border-base-content/30 border px-4 py-2 text-left">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {sectors.map((sector) => (
              <tr
                key={sector.id || sector._id}
                className="hover:bg-base-100/50"
              >
                <td className="border-base-content/30 border px-4 py-2">
                  {sector.name}
                </td>
                <td className="border-base-content/30 border px-4 py-2">
                  {sector.username}
                </td>
                <td className="border-base-content/30 border px-4 py-2">
                  {sector.country}
                </td>
                <td className="border-base-content/30 border px-4 py-2 capitalize">
                  {sector.type}
                </td>
                <td className="border-base-content/30 border px-4 py-2">
                  {sector.disable ? (
                    <span className="text-red-600">Disabled</span>
                  ) : (
                    <span className="text-green-600">Active</span>
                  )}
                </td>
              </tr>
            ))}
            {sectors.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="border-base-content/30 text-base-content border px-4 py-4 text-center"
                >
                  No sectors found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
