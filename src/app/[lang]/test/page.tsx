"use client";

import SectorsTableTest from "@/components/test/sectors-table-test";
import { useEffect, useState } from "react";

export default function RealtimeTestPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [connectionStatus, setConnectionStatus] =
    useState<string>("Disconnected");
  const [eventSource, setEventSource] = useState<EventSource | null>(null);

  // Connect to SSE for event monitoring
  const connectToSSE = () => {
    try {
      setConnectionStatus("Connecting...");

      const es = new EventSource("http://localhost:4646/events/stream");

      es.onopen = () => {
        setConnectionStatus("Connected");
        console.log("✅ SSE Connection opened");
      };

      es.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log("📨 Received event:", data);

          setEvents((prev) =>
            [
              ...prev,
              {
                ...data,
                receivedAt: new Date().toLocaleTimeString(),
              },
            ].slice(-10),
          );
        } catch (error) {
          console.error("Error parsing event:", error);
        }
      };

      es.onerror = (error) => {
        setConnectionStatus("Error - Check console");
        console.error("❌ SSE Error:", error);
      };

      setEventSource(es);
    } catch (error) {
      console.error("❌ Failed to create EventSource:", error);
      setConnectionStatus("Failed to connect");
    }
  };

  // Disconnect from SSE
  const disconnectFromSSE = () => {
    if (eventSource) {
      eventSource.close();
      setEventSource(null);
      setConnectionStatus("Disconnected");
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, [eventSource]);

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-6">
      <h1 className="text-2xl font-bold">Real-time Test Dashboard</h1>

      {/* Connection Status */}
      <div className="rounded-lg border p-4">
        <h2 className="mb-2 text-lg font-semibold">Event Monitor Connection</h2>
        <div className="flex items-center gap-4">
          <div
            className={`h-3 w-3 rounded-full ${
              connectionStatus === "Connected"
                ? "animate-pulse bg-green-500"
                : connectionStatus === "Connecting..."
                  ? "bg-yellow-500"
                  : "bg-red-500"
            }`}
          ></div>
          <span>Status: {connectionStatus}</span>
          {!eventSource ? (
            <button
              type="button"
              onClick={connectToSSE}
              className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              Start Event Monitor
            </button>
          ) : (
            <button
              type="button"
              onClick={disconnectFromSSE}
              className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            >
              Stop Monitor
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Sectors Table */}
        <div>
          <SectorsTableTest />
        </div>

        {/* Event Log */}
        <div className="rounded-lg border p-4">
          <h2 className="mb-2 text-lg font-semibold">
            Real-time Events ({events.length})
          </h2>
          <div className="max-h-96 space-y-2 overflow-y-auto">
            {events.length === 0 ? (
              <p className="text-gray-500">No events received yet...</p>
            ) : (
              events
                .map((event, index) => (
                  <div key={index} className="bg-base-100 rounded border p-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="font-medium">{event.entity_type}</span>
                        <span className="mx-2">•</span>
                        <span
                          className={`rounded px-2 py-1 text-xs ${
                            event.event_type === "created"
                              ? "bg-green-100 text-green-800"
                              : event.event_type === "updated"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {event.event_type}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {event.receivedAt}
                      </span>
                    </div>
                    {event.entity_id && (
                      <div className="mt-1 text-sm text-gray-600">
                        ID: {event.entity_id}
                      </div>
                    )}
                    {event.data && event.data.name && (
                      <div className="text-sm text-gray-600">
                        Name: {event.data.name}
                      </div>
                    )}
                  </div>
                ))
                .reverse()
            )}
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-base-300 rounded-lg border p-4">
        <h2 className="mb-2 text-lg font-semibold">Testing Instructions</h2>
        <ol className="list-inside list-decimal space-y-2">
          <li>
            <strong>Start Event Monitor</strong> - Click the button above to
            start monitoring events
          </li>
          <li>
            <strong>Open your main app</strong> - Go to your sectors page in
            another tab/window
          </li>
          <li>
            <strong>Perform actions</strong> - Create, update, or delete sectors
            in your main app
          </li>
          <li>
            <strong>Watch for updates</strong> - Events should appear here and
            the table should update automatically
          </li>
          <li>
            <strong>Check console</strong> - Open browser console (F12) to see
            detailed logs
          </li>
        </ol>

        <div className="bg-base-200 mt-4 rounded border border-yellow-300 p-3">
          <strong>Note:</strong> If you don't see events, check:
          <ul className="mt-1 ml-4 list-inside list-disc">
            <li>Backend server is running on port 4646</li>
            <li>Your browser console for any errors</li>
            <li>Network tab to see if SSE connection is established</li>
            <li>Backend logs to see if events are being broadcast</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
