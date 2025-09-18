"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { DatabaseStats } from "@/lib/types/databaseStatus";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

interface Props {
  data: DatabaseStats;
}

const CollectionInPercentage = ({ data }: Props) => {
  const totalDocuments = data?.total_documents || 1;

  // Prepare chart data
  const chartData = data.collections.map((col) => ({
    collection: col.name,
    documents: col.document_count,
    percentage: Number(
      ((col.document_count / totalDocuments) * 100).toFixed(2),
    ),
    fill: "var(--color-documents)",
  }));

  const chartConfig = {
    documents: {
      label: "Documents",
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig;

  return (
    <Card className="min-w-96">
      <CardHeader>
        <CardTitle>Collections in Database</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{ left: 0 }}
          >
            <YAxis
              dataKey="collection"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              // you can format the labels if needed
            />
            <XAxis dataKey="documents" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => `Collection: ${value}`}
                  formatter={(value, name, props) => [
                    `${value} docs (${props.payload.percentage}%)`,
                    "Documents",
                  ]}
                />
              }
            />
            <Bar dataKey="documents" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default CollectionInPercentage;
