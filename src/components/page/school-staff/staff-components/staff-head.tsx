"use client"

import { Download } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { RegisterStaffDialog } from "./register-staff-dialog"

export function StaffHeader() {
  const [openRegisterDialog, setOpenRegisterDialog] = useState(false)
  const [selectedStaff, setSelectedStaff] = useState<any>(null)

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b  px-6">
      <h1 className="text-xl font-semibold">Staff Management</h1>
      <div className="ml-auto flex items-center gap-4">
        <Button variant="outline" size="sm" className="h-8 gap-1">
          <Download className="h-4 w-4" />
          Export
        </Button>
        <RegisterStaffDialog
          open={openRegisterDialog}
          onOpenChange={setOpenRegisterDialog}
          selectedStaff={selectedStaff}
        />
      </div>
    </header>
  )
}
