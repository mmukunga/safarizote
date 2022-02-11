import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

const chartConfig = {
  type: "bar",
  data: {
    labels: [],
    datasets: [
      {
        label: ["# of Values"],
        data: []
      }
    ]
  }
};

const BarChart = props => {
  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  const [chartData, setChartData] = useState(props.data.values);
  const [chartLabels, setChartLabels] = useState(props.data.labels);
  
  const updateDataset = (datasetIndex, newData, newLabels) => {
    if(chartInstance){
      chartInstance.data.datasets[datasetIndex].data = newData;
      chartInstance.data.labels = newLabels;
      chartInstance.update();
    } else {
      chartConfig.data.datasets[datasetIndex].data = newData;
      chartConfig.data.labels = newLabels;
    }  
  };

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      updateDataset(0, chartData, chartLabels)
      const newChartInstance = new Chart(chartContainer.current, chartConfig);
      setChartInstance(newChartInstance);
    }
  }, [chartContainer]);

  useEffect(() => {
    setChartData(props.data.values);
    setChartLabels(props.data.labels);
    updateDataset(0, props.data.values, props.data.labels);
  }, [props.data.values]);

  return (
    <div style={{ padding: "20px" }}>
      <canvas ref={chartContainer} />
    </div>
  );
};

export default BarChart;
