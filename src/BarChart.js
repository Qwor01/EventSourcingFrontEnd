import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import './BarChart.css';

// Registrar los componentes de Chart.js que usaremos
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ fecha }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/clientes');
        const clientes = response.data.clientes;
        const filteredClientes = clientes.filter(cliente => cliente.nombre !== null);
        const ids = filteredClientes.map(cliente => cliente.id);
        const nombres = filteredClientes.map(cliente => cliente.nombre);

        const dataPromises = ids.map(id => {
          let url = `http://127.0.0.1:8000/clientes/${id}`;
          if (fecha) {
            url += `/at?timestamp=${fecha}`;
          }
          return axios.get(url);
        });

        const dataResponses = await Promise.all(dataPromises);
        const fetchedData = dataResponses.map(res => res.data);
        const values = fetchedData.map(item => item.balance);

        setData({
          labels: nombres,
          datasets: [
            {
              label: 'My Dataset',
              data: values,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        });

        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, [fecha]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="chart-container">
      <div className="chart">
        <Bar data={data} />
      </div>
    </div>
  );
};

export default BarChart;


