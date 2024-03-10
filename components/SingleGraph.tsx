import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useConfig } from "@/hooks/use-config";
import { useTheme } from "next-themes";
import { Line, LineChart, ResponsiveContainer } from "recharts";
import { themes } from "@/registry/themes"


// create type for data
//  We can remove subscriptions
const data = [
    {
      price: 10400,
    },
    {
      price: 14405,
    },
    {
      price: 9400,
    },
    {
      price: 8200,
    },
    {
      price: 7000,
    },
    {
      price: 9600,
    },
    {
      price: 11244,
    },
    {
      price: 26475,
    },
  ]

type SingleGraphProps = {
    title: string;
    currentValue:string;
    valueDescription:string;
    data?: typeof data;
}

const SingleGraph = ({title, currentValue, valueDescription} : SingleGraphProps) => {

    const { theme: mode } = useTheme()
    const [config] = useConfig()
  
    const theme = themes.find((theme) => theme.name === config.theme)
    
    return (
        <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-normal">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{currentValue}</div>
          <p className="text-xs text-muted-foreground">
            {valueDescription}
          </p>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{
                  top: 5,
                  right: 10,
                  left: 10,
                  bottom: 0,
                }}
              >
                <Line
                  type="monotone"
                  strokeWidth={2}
                  dataKey="price"
                  activeDot={{
                    r: 6,
                    style: { fill: "var(--theme-primary)", opacity: 0.25 },
                  }}
                  style={
                    {
                      stroke: "var(--theme-primary)",
                      "--theme-primary": `hsl(${
                        theme?.cssVars[mode === "dark" ? "dark" : "light"]
                          .primary
                      })`,
                    } as React.CSSProperties
                  }
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    )

}

export default SingleGraph;