import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, LineElement, PointElement, Tooltip, CategoryScale, LinearScale } from 'chart.js';

interface props {
  data: number[];
  label: string;
  labels: string[];
}

Chart.register(LineElement, PointElement, Tooltip, CategoryScale, LinearScale);

const LineChartComponent:React.FC<props> = ({ data, label, labels }) => {
  return (
    <div style={{
      position: 'relative',
      overflow: 'scroll',
      overflowY: 'hidden',
      height: 380,
      marginBottom: 10
    }}>
      <div style={{
        position: 'absolute',
        width: 15000,
        height: 350
      }}>
        <Line
          options={{ maintainAspectRatio: false }}
          data={{
            labels: labels,
            datasets: [{
              label: label,
              data: data,
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: .1
            }]
          }}
        />
      </div>
    </div>
  );
};

export default LineChartComponent;
