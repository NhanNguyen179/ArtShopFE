import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
// @mui
import { Box, Card, CardHeader } from '@mui/material';
// utils
// components
import { FC } from "react";
import useChart from './useChart';
import { fNumber } from '../../utils/formatNumber';

// ----------------------------------------------------------------------



interface Props {
  title: string,
  subheader: string,
  chartData: any[],
}

export const AppConversionRates: FC<Props> =  ({ title, subheader, chartData, ...other }) => {
  const chartLabels = chartData.map((i) => i._id);

  const chartSeries = chartData.map((i) => i.count);

  const chartOptions = useChart({
    tooltip: {
      color:"red",
      marker: { show: false },
      y: {
        formatter: (seriesName : any) => fNumber(seriesName),
        title: {
          formatter: () => '',
        },
      },
    },
    plotOptions: {
      bar: { horizontal: true, barHeight: '28%', borderRadius: 2 },
    },
    xaxis: {
      categories: chartLabels,
    },
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ mx: 3 }} dir="ltr">
        <ReactApexChart type="bar" series={[{ data: chartSeries }]} options={chartOptions} height={364}/>
      </Box>
    </Card>
  );
}
