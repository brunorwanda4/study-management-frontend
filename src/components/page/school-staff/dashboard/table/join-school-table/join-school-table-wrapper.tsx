// src/components/page/school-staff/join-school-table-wrapper.tsx
'use client'; // <-- This component orchestrates client-side fetching

import useSWR from 'swr';
import { UserSchool } from "@/lib/utils/auth";
import { Locale } from "@/i18n";
import { GetAllSchoolJoinRequestBySchoolId } from "@/service/school/school-join-request.service"; // For response type
import JoinSchoolTableDisplay from './join-school-table';

// Define the expected type for the response data structure
type RequestsResponse = Awaited<ReturnType<typeof GetAllSchoolJoinRequestBySchoolId>>;

interface WrapperProps {
    lang: Locale;
    currentSchool: UserSchool;
    initialRequests: RequestsResponse; // Accept initial data fetched server-side
}

export default function JoinSchoolTableWrapper({ lang, currentSchool, initialRequests }: WrapperProps) {
    const apiUrl = `/api/school/${currentSchool.schoolId}/join-requests`;

    const {
        data: requestsData, // This data will update based on polling
        error,
        isLoading, // Tracks loading state for SWR fetches/revalidations
        mutate // Function to manually trigger revalidation
    } = useSWR<RequestsResponse>(
        apiUrl,       // API endpoint URL (used as cache key)
        fetcher,      // The function to fetch the data
        {
            fallbackData: initialRequests, // Seed SWR cache with server data
            refreshInterval: 10000, // Poll every 10 seconds (adjust as needed)
            revalidateOnFocus: true, // Revalidate when browser tab gets focus
            revalidateOnReconnect: true, // Revalidate on network reconnect
        }
    );

    // Handle SWR error state
    if (error) {
        console.error("SWR Error fetching join requests:", error);
        // Render the display component with an undefined data state, it should handle this
         return (
             <JoinSchoolTableDisplay
                lang={lang}
                currentSchool={currentSchool}
                requestsData={undefined}
                isLoading={false} // Error occurred, not loading anymore
            />
         );
    }

    // Pass the SWR-managed data and loading state to the display component
    // isLoading will be true during the initial client-side fetch *if* fallbackData wasn't sufficient
    // or during background revalidations.
    return (
        <JoinSchoolTableDisplay
            lang={lang}
            currentSchool={currentSchool}
            requestsData={requestsData}
            // Pass a combined loading state: true if SWR is loading AND we don't have initial data yet
            isLoading={isLoading}
            // You could potentially pass the `mutate` function down to the Dropdown
            // so actions (accept/reject) can trigger an immediate data refresh:
            // onActionComplete={mutate}
        />
    );
}