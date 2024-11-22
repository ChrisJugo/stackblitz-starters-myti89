import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, LineChart, DonutChart } from "@tremor/react"
import { warrantyConversionData, warrantyRevenueData, warrantyCoverageData, expirationData } from "@/lib/mock/analyticsData"

export function WarrantyAnalytics() {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Warranty Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="conversion">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="conversion">Conversion Rates</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="types">Coverage Types</TabsTrigger>
          </TabsList>
          
          <TabsContent value="conversion">
            <div className="h-[400px]">
              <BarChart
                data={warrantyConversionData}
                categories={["attempts", "conversions"]}
                index="month"
                valueFormatter={(value) => `${value}`}
                colors={["blue", "green"]}
                yAxisWidth={48}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="revenue">
            <div className="h-[400px]">
              <LineChart
                data={warrantyRevenueData}
                index="month"
                categories={["revenue"]}
                colors={["emerald"]}
                valueFormatter={(value) => `$${value.toLocaleString()}`}
                yAxisWidth={56}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="types">
            <div className="h-[400px]">
              <DonutChart
                data={warrantyCoverageData}
                category="value"
                index="name"
                valueFormatter={(value) => `${value}%`}
                colors={["slate", "violet", "indigo"]}
              />
            </div>
          </TabsContent>
        </Tabs>

        {/* Add Expiration Timeline */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Warranty Expiration Timeline</h3>
          <div className="h-[300px]">
            <BarChart
              data={expirationData}
              categories={["expiring", "renewed", "expired"]}
              index="month"
              valueFormatter={(value) => `${value}`}
              colors={["yellow", "green", "red"]}
              stack
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

