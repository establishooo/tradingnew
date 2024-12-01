import { createChart, ColorType } from 'lightweight-charts';
import { useEffect, useRef } from 'react';

interface ChartProps {
  data: { time: string; value: number }[];
  symbol: string;
}

export function Chart({ data, symbol }: ChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { color: '#ffffff' },
        textColor: '#333',
      },
      grid: {
        vertLines: { color: '#f0f0f0' },
        horzLines: { color: '#f0f0f0' },
      },
      width: chartContainerRef.current.clientWidth,
      height: 400,
    });

    const lineSeries = chart.addLineSeries({
      color: '#2563eb',
      lineWidth: 2,
    });
    lineSeries.setData(data);

    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [data]);

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-4">{symbol} Price Chart</h2>
      <div ref={chartContainerRef} />
    </div>
  );
}