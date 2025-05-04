import { Button } from "@/components/ui/button";
import { SchoolJoinRequestDto } from "@/lib/schema/school/school-join-school/school-join-request.schema";
import { ColumnDef } from "@tanstack/react-table";

 const SchoolJoinRequestTableColumns = (
    handleAccept: (request: SchoolJoinRequestDto) => void,
    handleReject: (request: SchoolJoinRequestDto) => void
  ): ColumnDef<SchoolJoinRequestDto>[] => [
    // {
    //   id: "select",
    //   header: ({ table }) => (
    //     <Checkbox
    //       checked={
    //         table.getIsAllPageRowsSelected() ||
    //         (table.getIsSomePageRowsSelected() && "indeterminate")
    //       }
    //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //       aria-label="Select all"
    //     />
    //   ),
    //   cell: ({ row }) => (
    //     <Checkbox
    //       checked={row.getIsSelected()}
    //       onCheckedChange={(value) => row.toggleSelected(!!value)}
    //       aria-label="Select row"
    //     />
    //   ),
    //   enableSorting: false,
    //   enableHiding: false,
    // },
    // {
    //   header: "Role",
    //   accessorKey: "role",
    //   cell: ({ row }) => (
    //     <div className="font-medium">{getRoleLabel(row.getValue("role"))}</div>
    //   ),
    //   meta: {
    //     filterVariant: "select",
    //     filterOptions: SchoolStaffRoles, // Pass roles for filter dropdown
    //   },
    //   filterFn: "equals", // Use 'equals' for exact match on select
    // },
    {
      header: "Name",
      accessorKey: "name",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("name") ?? "N/A"}</div>
      ),
      // Filtering handled by Global Filter
    },
    {
      header: "Email",
      accessorKey: "email",
      cell: ({ row }) => (
        <div className="text-sm  ">
          {row.getValue("email") ?? "N/A"}
        </div>
      ),
      // Filtering handled by Global Filter
    },
    {
      header: "Phone",
      accessorKey: "phone",
      cell: ({ row }) => (
        <div className="text-sm  ">
          {row.getValue("phone") ?? "N/A"}
        </div>
      ),
      // Filtering handled by Global Filter
    },
    // {
    //   header: "User Link",
    //   accessorKey: "userId",
    //   cell: ({ row }) => {
    //     const userId = row.getValue("userId");
    //     return userId ? (
    //       // Adjust href path as per your routing structure
    //       <Link href={`/admin/users/${userId}`} passHref>
    //         <Button variant="link" size="sm" className="p-0 h-auto">
    //           <UserIcon className="mr-1 h-4 w-4" /> Profile
    //         </Button>
    //       </Link>
    //     ) : (
    //       <span className="text-xs  ">Guest</span>
    //     );
    //   },
    //   enableSorting: false,
    //   enableColumnFilter: false,
    // },
    // {
    //   header: "Status",
    //   accessorKey: "status",
    //   cell: ({ row }) => {
    //     const status = row.getValue("status") as string;
    //     // Optional: Add styling based on status
    //     let colorClass = " ";
    //     if (status === "approved") colorClass = "text-green-600";
    //     if (status === "rejected") colorClass = "text-red-600";
    //     if (status === "pending") colorClass = "text-yellow-600";
  
    //     return (
    //       <div className={cn("font-medium capitalize", colorClass)}>{status}</div>
    //     );
    //   },
    //   meta: {
    //     filterVariant: "select",
    //   },
    //   filterFn: "equals",
    // },
    // {
    //   header: "Requested On",
    //   accessorKey: "createAt", // Corrected accessorKey
    //   cell: ({ row }) => {
    //     const dateVal = row.getValue("createAt");
    //     return (
    //       <div className="text-sm  ">
    //         {dateVal ? new Date(dateVal as string).toLocaleDateString() : "N/A"}
    //       </div>

    //     );
    //   },
    //   // You might want to add sorting but filtering by date range client-side is complex
    //   enableColumnFilter: false, // Disable column filter for simplicity, use sorting
    // },
    //  {
    //   header: "Last Updated",
    //   accessorKey: "updatedAt",
    //   cell: ({ row }) => {
    //       const dateVal = row.getValue("updatedAt");
    //       return (
    //           <div className="text-sm  ">
    //               {dateVal ? new Date(dateVal as string).toLocaleDateString() : "N/A"}
    //           </div>
    //       );
    //   },
    //    enableColumnFilter: false, // Disable column filter for simplicity, use sorting
    // },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const request = row.original;
        const status = request.status;
  
        // Only show actions if the status is 'pending'
        if (status !== "pending") {
          return <span className="text-xs  ">Processed</span>;
        }
  
        return (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="border-green-500 text-green-600 hover:bg-green-50 hover:text-green-700"
              onClick={() => handleAccept(request)}
            >
              Accept
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-red-500 text-red-600 hover:bg-red-50 hover:text-red-700"
              onClick={() => handleReject(request)}
            >
              Reject
            </Button>
          </div>
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
  ];

  export default SchoolJoinRequestTableColumns