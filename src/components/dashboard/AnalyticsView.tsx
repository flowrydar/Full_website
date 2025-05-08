import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnalyticsResponse, VisitorData } from '@/api/routes/analytics';

interface AnalyticsViewProps {
  analyticsData: AnalyticsResponse;
}

const AnalyticsView = ({ analyticsData }: AnalyticsViewProps) => {
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-wedding-gold/20 bg-black/60 backdrop-blur-sm shadow-lg hover:border-wedding-gold/40 transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl text-white">{analyticsData.totalVisitors}</CardTitle>
            <CardDescription className="text-wedding-lilac-light">Total Visitors</CardDescription>
          </CardHeader>
        </Card>
        
        <Card className="border-wedding-gold/20 bg-black/60 backdrop-blur-sm shadow-lg hover:border-wedding-gold/40 transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl text-white">{analyticsData.totalPageViews}</CardTitle>
            <CardDescription className="text-wedding-lilac-light">Page Views</CardDescription>
          </CardHeader>
        </Card>
        
        <Card className="border-wedding-gold/20 bg-black/60 backdrop-blur-sm shadow-lg hover:border-wedding-gold/40 transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl text-white">{(analyticsData.totalPageViews / analyticsData.totalVisitors).toFixed(2)}</CardTitle>
            <CardDescription className="text-wedding-lilac-light">Pages per Visit</CardDescription>
          </CardHeader>
        </Card>
        
        <Card className="border-wedding-gold/20 bg-black/60 backdrop-blur-sm shadow-lg hover:border-wedding-gold/40 transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl text-white">{analyticsData.deviceBreakdown.mobile}</CardTitle>
            <CardDescription className="text-wedding-lilac-light">Mobile Visitors</CardDescription>
          </CardHeader>
        </Card>
      </div>
      
      <Tabs defaultValue="traffic" className="space-y-4">
        <TabsList className="bg-black border border-wedding-gold/30 p-1 rounded-lg">
          <TabsTrigger value="traffic" className="data-[state=active]:bg-wedding-gold/20 data-[state=active]:text-wedding-gold text-wedding-lilac hover:text-white">Traffic Overview</TabsTrigger>
          <TabsTrigger value="devices" className="data-[state=active]:bg-wedding-gold/20 data-[state=active]:text-wedding-gold text-wedding-lilac hover:text-white">Device Breakdown</TabsTrigger>
          <TabsTrigger value="pages" className="data-[state=active]:bg-wedding-gold/20 data-[state=active]:text-wedding-gold text-wedding-lilac hover:text-white">Top Pages</TabsTrigger>
        </TabsList>
        
        <TabsContent value="traffic" className="space-y-4">
          <Card className="border-wedding-gold/20 bg-black/60 backdrop-blur-sm shadow-lg">
            <CardHeader className="border-b border-wedding-gold/10 pb-4">
              <CardTitle className="text-wedding-gold font-serif">Website Traffic</CardTitle>
              <CardDescription className="text-wedding-lilac-light">Daily visitors over the past 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border border-wedding-gold/10 rounded-md my-4 bg-black/30">
                <p className="text-wedding-lilac">Traffic chart would appear here</p>
                {/* In a real implementation, you'd use Recharts or another charting library here */}
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow className="border-b-wedding-gold/20">
                    <TableHead className="text-wedding-lilac">Date</TableHead>
                    <TableHead className="text-wedding-lilac">Visitors</TableHead>
                    <TableHead className="text-wedding-lilac">Page Views</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {analyticsData.dailyVisitors.slice(0, 10).map((day, index) => (
                    <TableRow key={index} className="border-b-wedding-gold/10 hover:bg-wedding-gold/5">
                      <TableCell className="text-white">{day.date}</TableCell>
                      <TableCell className="text-white">{day.visitors}</TableCell>
                      <TableCell className="text-white">{day.pageViews}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="devices" className="space-y-4">
          <Card className="border-wedding-gold/20 bg-black/60 backdrop-blur-sm shadow-lg">
            <CardHeader className="border-b border-wedding-gold/10 pb-4">
              <CardTitle className="text-wedding-gold font-serif">Device Breakdown</CardTitle>
              <CardDescription className="text-wedding-lilac-light">Distribution of visitors by device type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border border-wedding-gold/10 rounded-md my-4 bg-black/30">
                <p className="text-wedding-lilac">Device breakdown chart would appear here</p>
                {/* In a real implementation, you'd use Recharts or another charting library here */}
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow className="border-b-wedding-gold/20">
                    <TableHead className="text-wedding-lilac">Device Type</TableHead>
                    <TableHead className="text-wedding-lilac">Visitors</TableHead>
                    <TableHead className="text-wedding-lilac">Percentage</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="border-b-wedding-gold/10 hover:bg-wedding-gold/5">
                    <TableCell className="text-white">Mobile</TableCell>
                    <TableCell className="text-white">{analyticsData.deviceBreakdown.mobile}</TableCell>
                    <TableCell className="text-white">{((analyticsData.deviceBreakdown.mobile / analyticsData.totalVisitors) * 100).toFixed(1)}%</TableCell>
                  </TableRow>
                  <TableRow className="border-b-wedding-gold/10 hover:bg-wedding-gold/5">
                    <TableCell className="text-white">Desktop</TableCell>
                    <TableCell className="text-white">{analyticsData.deviceBreakdown.desktop}</TableCell>
                    <TableCell className="text-white">{((analyticsData.deviceBreakdown.desktop / analyticsData.totalVisitors) * 100).toFixed(1)}%</TableCell>
                  </TableRow>
                  <TableRow className="border-b-wedding-gold/10 hover:bg-wedding-gold/5">
                    <TableCell className="text-white">Tablet</TableCell>
                    <TableCell className="text-white">{analyticsData.deviceBreakdown.tablet}</TableCell>
                    <TableCell className="text-white">{((analyticsData.deviceBreakdown.tablet / analyticsData.totalVisitors) * 100).toFixed(1)}%</TableCell>
                  </TableRow>
                  <TableRow className="border-b-wedding-gold/10 hover:bg-wedding-gold/5">
                    <TableCell className="text-white">Other</TableCell>
                    <TableCell className="text-white">{analyticsData.deviceBreakdown.other}</TableCell>
                    <TableCell className="text-white">{((analyticsData.deviceBreakdown.other / analyticsData.totalVisitors) * 100).toFixed(1)}%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pages" className="space-y-4">
          <Card className="border-wedding-gold/20 bg-black/60 backdrop-blur-sm shadow-lg">
            <CardHeader className="border-b border-wedding-gold/10 pb-4">
              <CardTitle className="text-wedding-gold font-serif">Top Pages</CardTitle>
              <CardDescription className="text-wedding-lilac-light">Most visited pages on your wedding website</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-b-wedding-gold/20">
                    <TableHead className="text-wedding-lilac">Page</TableHead>
                    <TableHead className="text-wedding-lilac">Views</TableHead>
                    <TableHead className="text-wedding-lilac">Percentage</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {analyticsData.topPages.map((page, index) => (
                    <TableRow key={index} className="border-b-wedding-gold/10 hover:bg-wedding-gold/5">
                      <TableCell className="text-white">{page.page}</TableCell>
                      <TableCell className="text-white">{page.views}</TableCell>
                      <TableCell className="text-white">{page.percentage.toFixed(1)}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsView;
