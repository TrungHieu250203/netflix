import { Bar } from "react-chartjs-2";
import "chart.js/auto";


// eslint-disable-next-line react/prop-types
const ChartComponent = ({ totalUsers, totalMovies, totalComments, totalViews }) => {
  const data = {
    labels: ["Total Users", "Total Movies", "Total Comments", "Total Views"],
    datasets: [
      {
        label: "Data Overview",
        data: [totalUsers, totalMovies, totalComments, totalViews],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default ChartComponent;
