'use client'

import React from 'react';

import { 
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';



interface OverviewChartProps {
    data: any;
}

const OverviewChart : React.FC<OverviewChartProps> = ({data}) => {

    const chartData = Object.keys(data).map((key) => ({
        name: key,
        value: data[key]
    }))


    return ( 
    <ResponsiveContainer width={'100%'} height={400}>
        <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
    </ResponsiveContainer>
    );
}
 
export default OverviewChart;