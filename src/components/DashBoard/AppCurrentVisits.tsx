import PropTypes from "prop-types";
import ReactApexChart from "react-apexcharts";
// @mui
import { useTheme, styled } from "@mui/material/styles";
import { Card, CardHeader } from "@mui/material";
import { FC } from "react";
import useChart from "./useChart";
import { fNumber } from "../../utils/formatNumber";

// utils
// components

// ----------------------------------------------------------------------

const CHART_HEIGHT = 372;
const LEGEND_HEIGHT = 72;

const StyledChartWrapper = styled("div")(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(5),
  "& .apexcharts-canvas svg": { height: CHART_HEIGHT },
  "& .apexcharts-canvas svg,.apexcharts-canvas foreignObject": {
    overflow: "visible",
  },
  "& .apexcharts-legend": {
    height: LEGEND_HEIGHT,
    alignContent: "center",
    position: "relative !important",
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
}));

// ----------------------------------------------------------------------

interface Props {
  title: string;
  subheader?: string;
  chartColors: string[];
  chartData: any[];
}

export const AppCurrentVisits: FC<Props> = ({
  title,
  subheader,
  chartColors,
  chartData,
  ...other
}) => {
  const theme = useTheme();

  const chartLabels = chartData.map((i) => i.label);

  const chartSeries = chartData.map((i) => i.value);

  const chartOptions = useChart({
    colors: chartColors,
    labels: chartLabels,
    stroke: { colors: [theme.palette.background.paper] },
    legend: { floating: true, horizontalAlign: "center" },
    dataLabels: { enabled: true, dropShadow: { enabled: false } },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (seriesName: any) => fNumber(seriesName),
        title: {
          formatter: (seriesName: any) => `${seriesName}`,
        },
      },
    },
    plotOptions: {
      pie: { donut: { labels: { show: false } } },
    },
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <StyledChartWrapper dir="ltr">
        <ReactApexChart
          type="pie"
          series={chartSeries}
          options={chartOptions}
          height={280}
        />
      </StyledChartWrapper>
    </Card>
  );
};
