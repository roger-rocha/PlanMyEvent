"use client"

import {Bar, BarChart, ResponsiveContainer, XAxis, YAxis} from "recharts"

export type chartData = {
  name: string
  total: number
}


interface ChartProps {
  event: chartData[]
}

export function Overview({event}: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height={225}>
      <BarChart data={event}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
