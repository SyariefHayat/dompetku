import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react';
import { PieChart as RechartsPieChart, Pie, Sector, Tooltip } from 'recharts';

import { transactionsAtom } from '@/jotai/atoms';
import { totalTransactionsAtom } from '../../../../jotai/atoms';

const renderCustomShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload } = props;

    return (
        <g>
            <text
                x={cx}
                y={cy}
                dy={8}
                textAnchor="middle"
                fill={fill}
                style={{ fontSize: '14px', fontWeight: 'bold' }}
            >
                {payload.name}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
        </g>
    );
};

const CustomPieChart = () => {
    const [key, setKey] = useState(0);

    const [transactions] = useAtom(transactionsAtom);
    const [totalTransactions, setTotalTransactions] = useAtom(totalTransactionsAtom);

    useEffect(() => {
        setKey((prevKey) => prevKey + 1);
    }, []);

    const getTypeTotals = (data) => {
        if (data.length === 0) {
        // Data kosong, gunakan nilai default
        return [
            { name: 'Pendapatan', value: 0, fill: '#4caf50' },
            { name: 'Pengeluaran', value: 0, fill: '#f44336' }
        ];
    }

    const income = data
        .filter((t) => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

    const expense = data
        .filter((t) => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

    setTotalTransactions(income + expense);

    return [
        { name: 'Pendapatan', value: income, fill: '#4caf50' },
        { name: 'Pengeluaran', value: expense, fill: '#f44336' }
    ];
};

    const data = getTypeTotals(transactions);

    return (
        <RechartsPieChart key={key} width={300} height={300}>
            <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={100}
                dataKey="value"
                nameKey="name"
                fill={(entry) => entry.fill}
                shape={renderCustomShape}
                isAnimationActive={true}
                animationBegin={0} 
                animationDuration={1000}
            />
            <Tooltip 
                formatter={(value, name, props) => {
                return [`Rp ${value.toLocaleString()}`, name];  
                }}
            />
        </RechartsPieChart>
    );
};

export default CustomPieChart;
