import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Star,
  Gift,
  LogOut,
  Activity,
  CalendarDays,
  Clock,
  FileText,
  User as UserIcon,
  User,
} from "lucide-react";
import { motion } from "framer-motion";
import ReportHistory from "./ReportHistory";

export default function ProfilePage() {
  // Dummy user data
  const [user] = useState({
    name: "Luffy",
    email: "Monkey.D@me.com",
    avatar: "",
    phone: "+91 9876543210",
    address: "East Blue, Goa Kingdom, Windmill Village",
    points: 0,
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
      { id: 1, title: "Spam Report #101", date: "2025-09-15", status: "Reviewed", reward: "+50 pts" },
      { id: 2, title: "Bug Report #102", date: "2025-09-17", status: "Approved", reward: "+100 pts" },
      { id: 3, title: "Content Report #103", date: "2025-09-18", status: "Rejected", reward: "0 pts" },
      { id: 4, title: "Spam Report #104", date: "2025-09-21", status: "Pending", reward: "..." },
    ],
  });

  return (
    <div className="min-h-screen flex flex-col items-center p-6 sm:p-10 text-white">
      {/* Profile Header */}
      <div className="w-full max-w-3xl">
        <Card className="bg-white/5 border-white/20 backdrop-blur-lg rounded-2xl shadow-xl">
          <CardHeader className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <Avatar className="w-20 h-20 border-2 border-white/20">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="bg-gray-700 text-xl flex items-center justify-center">
                {/* <UserIcon className="w-8 h-8 text-white/70" /> */}
                <CardTitle className="text-2xl font-bold">{user.name.charAt(0)}</CardTitle>
              </AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left">
              <CardTitle className="text-2xl font-bold">{user.name}</CardTitle>
              <p className="text-white/60 text-sm">{user.email}</p>
              <p className="text-white/60 text-sm ">
                {user.address ? user.address : user.phone}
              </p>
              <p className="text-white/60 text-sm mt-1">{user.phone}</p>
            </div>
            <div className="sm:ml-auto">
              <Button
                variant="outline"
                className="text-white border-white/30 hover:bg-red-600/80 hover:text-white transition-all duration-200"
              >
                <User />
                Logout
              </Button>
            </div>
          </CardHeader>
        </Card>
      </div>

      {/* Reports History Section */}
      <div className="w-full max-w-3xl mt-6">
    <ReportHistory />
      </div>
      {/* Points & Progress */}
      <div className="w-full max-w-3xl mt-6">
        <Card className="bg-white/5 border-white/20 backdrop-blur-lg rounded-2xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg">Earnings Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/70 text-sm mb-2">
              Points:{" "}
              <span className="text-white font-semibold">{user.points}</span>
              {"  "}
              <span className="ml-4 text-xs text-white/50">
                (1 report = 20 points)
              </span>
            </p>
            <p className="text-white/70 text-sm mb-2">
              Money Earned:{" "}
              <span className="text-white font-semibold">
                ₹{((user.points / 20) * 0).toFixed(2)}
              </span>
              <span className="ml-4 text-xs text-white/50">
                {/* ({user.points} points × ₹1 per point = ₹{user.points}) */}
              </span>
            </p>
            <Progress
              value={((user.points % 200) / 200) * 100}
              className="h-3 bg-white/10"
            />
            <p className="text-xs text-white/50 mt-2">
              {user.points % 200} / 200 points to next ₹200 payout
            </p>

            <div className="flex justify-end mt-4">
              <Button
                className="bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg px-6 py-2 transition-all duration-200"
                disabled={user.points < 1200}
                onClick={() => {
                  // You can implement your withdraw logic here
                  alert(
                    user.points >= 1200
                      ? "Withdrawal request submitted!"
                      : "You need at least 200 points to withdraw."
                  );
                }}
              >
                Withdraw ₹{Math.floor(user.points / 200) * 200}
              </Button>
            </div>
            {user.points < 1200 && (
              <p className="text-xs text-red-400 mt-2">
                Minimum 1200 points required to withdraw.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Rewards Section */}
      {/* <div className="w-full max-w-3xl mt-6">
        <Card className="bg-white/5 border-white/20 backdrop-blur-lg rounded-2xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg">Your Rewards</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {user.rewards.map((reward) => (
              <div
                key={reward.id}
                className="flex items-center justify-between p-3 rounded-xl bg-white/10 border border-white/20"
              >
                <div className="flex items-center gap-3">
                  <Gift className="w-5 h-5 text-pink-400" />
                  <span className="text-white">{reward.title}</span>
                </div>
                <span
                  className={`text-sm px-3 py-1 rounded-full ${
                    reward.status === "Claimed"
                      ? "bg-green-500/20 text-green-400 border border-green-500/40"
                      : reward.status === "Available"
                      ? "bg-blue-500/20 text-blue-400 border border-blue-500/40"
                      : "bg-gray-500/20 text-gray-400 border border-gray-500/40"
                  }`}
                >
                  {reward.status}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div> */}

      {/* Reports / Status Section */}
      <div className="w-full max-w-3xl mt-6">
        <Card className="bg-white/5 border-white/20 backdrop-blur-lg rounded-2xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg">User Status & Reports</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-blue-400" />
              <span>Last Login: {user.reports.lastLogin}</span>
            </div>
            <div className="flex items-center gap-3">
              <Activity className="w-5 h-5 text-green-400" />
              <span>Total Logins: {user.reports.totalLogins}</span>
            </div>
            <div className="flex items-center gap-3">
              <CalendarDays className="w-5 h-5 text-yellow-400" />
              <span>Active Days: {user.reports.activeDays}</span>
            </div>
            <div className="flex items-center gap-3">
              <Star className="w-5 h-5 text-orange-400" />
              <span>Current Streak: {user.reports.streak} days</span>
            </div>
            <div className="flex items-center gap-3">
              <Gift className="w-5 h-5 text-pink-400" />
              <span>Tasks Completed: {user.reports.tasksCompleted}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
