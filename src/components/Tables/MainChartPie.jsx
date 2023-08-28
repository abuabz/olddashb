import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';

export default function PieChart() {
  useEffect(() => {
    const pieChartCanvas = document.getElementById('pieChart');
    if (pieChartCanvas) {
      const ctx = pieChartCanvas.getContext('2d');
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['India', 'China', 'Italy'],
          datasets: [
            {
              label: 'My First Dataset',
              data: [1324171354, 1403500365, 60483973],
              backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
              hoverOffset: 4,
            },
          ],
        },
      });
    }
  }, []);

  return (
    <div className="col-lg-6">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Pie Chart</h5>

          {/* Pie Chart */}
          <canvas id="pieChart" style={{ maxHeight: '400px' }}></canvas>
          {/* End Pie Chart */}
        </div>
      </div>
    </div>
  );
}
