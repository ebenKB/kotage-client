/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import Chart from 'chart.js';


class Doughnut extends Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
  }

  componentDidMount() {
    this.myChart = new Chart(this.chartRef.current, {
      type: 'doughnut',
      data: {
        labels: this.props.data.map((d) => d.label),
        datasets: [{
          data: this.props.data.map((d) => d.value),
          backgroundColor: this.props.colors,
        }],
      },
      options: {
        legend: {
          display: true,
          position: 'bottom',
        },
        animation: {
          animateScale: true,
        },
        cutoutPercentage: 55,
        plugins: {
          doughnutlabel: {
            labels: [
              {
                text: '90',
                font: {
                  size: '60',
                  family: 'Arial, Helvetica, sans-serif',
                  style: 'italic',
                  weight: 'bold',
                },
                color: '#bc2c1a',
              },
            ],
          },
        },
      },
    });
  }

  componentDidUpdate() {
    this.myChart.data.labels = this.props.data.map((d) => d.label);
    this.myChart.data.datasets[0].data = this.props.data.map((d) => d.value);
    this.myChart.update();
  }

  render() {
    return <canvas ref={this.chartRef} />;
  }
}
export default Doughnut;
