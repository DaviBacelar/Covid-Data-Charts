import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement } from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarElement);

interface props {
  data: number[];
  label: string;
  labels: string[];
  countrySelected?: string;
}

const ChartComponent:React.FC<props> = ({ data, label, labels, countrySelected }) => {
  const getColorsArray = () => {
    let colors: string[] = [];

    for(let i = 0; i < data.length; i++) {
      colors = [...colors, 'rgb(75, 192, 192)'];
    }

    if(countrySelected?.length) {
      colors[0] = '#fff200';
    }
  
    return colors;
  };

  return (
    <div style={{
      height: 380
    }}>
      <div style={{
        height: 350
      }}>
        <Bar
          options={{ maintainAspectRatio: false }}
          data={{
            labels: labels,
            datasets: [{
              label: label,
              data: data,
              backgroundColor: getColorsArray(),
              borderColor: 'rgb(75, 192, 192)'
            }]
          }}
        />
      </div>
    </div>
  );
}

export default ChartComponent;
