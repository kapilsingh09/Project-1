import React, { useState } from 'react'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from 'lucide-react';

const ReportHistory = () => {

  const [user] = useState({
    name: "Luffy",
    email: "Monkey.D@me.com",
    avatar: "",
    phone: "+91 9876543210",
    address: "East Blue, Goa Kingdom, Windmill Village",
    points: 1200,
    level: 3,
    rewards: [
      { id: 1, title: "Welcome Bonus", status: "Claimed" },
      { id: 2, title: "Weekly Login", status: "Available" },
      { id: 3, title: "Referral Reward", status: "Locked" },
    ],
    reports: {
      lastLogin: "2025-09-20 10:45 AM",
      totalLogins: 54,
      activeDays: 32,
      streak: 5,
      tasksCompleted: 18,
    },
    reportsHistory: [
      { id: 1, title: "Glass Waste Report #101", date: "2025-09-15", status: "Reviewed", reward: "+10 pts" },
      { id: 2, title: "Plastic Waste Report #102", date: "2025-09-17", status: "Approved", reward: "+20 pts" },
      { id: 3, title: "Organic Waste Report #103", date: "2025-09-18", status: "Rejected", reward: "0 pts" },
      { id: 4, title: "E-waste Report #104", date: "2025-09-21", status: "Pending", reward: "..." },
    ],
  });

  return (
    <div className="w-full max-w-full sm:max-w-2xl md:max-w-3xl mx-auto">
      <Card className="bg-white/5 border-white/20 backdrop-blur-lg rounded-2xl shadow-lg w-full">
        <CardHeader>
          <CardTitle className="text-lg">Your Reports History</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          {user.reportsHistory.map((report) => (
            <div
              key={report.id}
              className="flex flex-col sm:flex-row items-start sm:items-center cursor-pointer justify-between p-3 rounded-xl bg-white/10 border border-white/20 transition-all duration-200 hover:bg-white/20 hover:scale-[1.02] gap-2"
            >
              <div className="flex flex-col flex-1 min-w-0">
                <span className="font-medium text-white flex items-center gap-2 truncate">
                  <FileText className="w-4 h-4 text-blue-400 shrink-0" /> 
                  <span className="truncate">{report.title}</span>
                </span>
                <span className="text-white/50 text-xs">{report.date}</span>
              </div>
              <div className="flex flex-col items-start sm:items-end flex-shrink-0">
                <span
                  className={`text-xs px-3 py-1 rounded-full mb-1 ${
                    report.status === "Approved"
                      ? "bg-green-500/20 text-green-400 border border-green-500/40"
                      : report.status === "Reviewed"
                      ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/40"
                      : report.status === "Pending"
                      ? "bg-blue-500/20 text-blue-400 border border-blue-500/40"
                      : "bg-red-500/20 text-red-400 border border-red-500/40"
                  }`}
                >
                  {report.status}
                </span>
                <span className="text-xs text-white/70">{report.reward}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

export default ReportHistory
