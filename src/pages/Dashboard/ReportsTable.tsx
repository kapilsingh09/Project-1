import React from 'react'
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

type WasteReport = {
  id: string;
  location: string;
  type: string;
  status: string;
  date: string;
  reporter: string;
};

type ReportsTableProps = {
  filteredReports: WasteReport[];
  getStatusBadge: (status: string) => React.ReactNode;
};

const ReportsTable: React.FC<ReportsTableProps> = ({ filteredReports, getStatusBadge }) => {
  return (
    <div>
       <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="shadow-card border-0">
                <CardHeader>
                  <CardTitle>Waste Reports</CardTitle>
                  <CardDescription>
                    Recent waste reports from the community
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-4 font-semibold">ID</th>
                          <th className="text-left p-4 font-semibold">Location</th>
                          <th className="text-left p-4 font-semibold">Type</th>
                          <th className="text-left p-4 font-semibold">Status</th>
                          <th className="text-left p-4 font-semibold">Date</th>
                          <th className="text-left p-4 font-semibold">Reporter</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredReports.map((report, index) => (
                          <motion.tr
                            key={report.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className="border-b hover:bg-muted/50 transition-colors"
                          >
                            <td className="p-4 font-mono text-sm">{report.id}</td>
                            <td className="p-4">
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                {report.location}
                              </div>
                            </td>
                            <td className="p-4">{report.type}</td>
                            <td className="p-4">{getStatusBadge(report.status)}</td>
                            <td className="p-4 text-muted-foreground">{report.date}</td>
                            <td className="p-4">{report.reporter}</td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
    </div>
  )
}

export default ReportsTable
