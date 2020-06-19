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
        cutoutPercentage: 60,
        plugins: {
          doughnutlabel: {
            labels: [
              {
                text: 'The title',
                font: {
                  size: '60',
                },
                color: 'red',
              },
              {
                text: '90',
                font: {
                  size: '50',
                },
                color: 'grey',
              },
              {
                text: '$100.000',
                font: {
                  size: '30',
                },
                color: 'red',
              },
              {
                text: '95%',
                font: {
                  size: '45',
                },
                color: 'green',
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
