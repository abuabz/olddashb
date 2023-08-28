import React, { Component } from 'react';
import Chart from 'react-apexcharts';

class Dashboard2 extends Component {

  
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
          labels: {
            style: {
              colors: this.props.isDarkMode ? '#ffffff' : '#333333' // Change color based on dark mode
            }
          }
          
        },
        plotOptions: {
          bar: {
            colors: {
              ranges: [
                {
                  from: 0,
                  to: 50,
                  color: '#a95557' // Specify the color for bars in the range 0-50
                },
                {
                  from: 51,
                  to: 100,
                  color: '#a95557' // Specify the color for bars in the range 51-100
                }
                // Add more ranges and colors as needed
              ]
            }
          },
          line: {
            strokeColors: '#2ca593' // Green line color
          }
        }
      },
      
      series: [
        {
          name: "series-1",
          data: [30, 40, 45, 50, 49, 60, 70, 91, 100]
        }
      ]
    };
  }

  render() {
    
    return (
      <div >
        <div className="chartss">
        <div className="app card"  id='chartCard'>
          <div className="row">
            <div className="mixed-chart">
              <Chart
                options={this.state.options}
                series={this.state.series}
                type="bar"
                className="chartBar"
              />
            </div>
          </div>
        </div>
        {/* <div className="app card" id='chartCard' >
          <div className="row">
            <div className="mixed-chart">
                      <Chart
              options={this.state.options}
              series={this.state.series}
              type="line"
              className="chartBar"
            />
            </div>
          </div>
        </div> */}

        </div>
        
      </div>
    );
  }
}

export default Dashboard2;
