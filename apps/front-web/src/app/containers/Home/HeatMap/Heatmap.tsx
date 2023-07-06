import { Slider } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { HeatMapComponent } from '../../../components/Heatmap/HeatmapComponent';
import { formatSliderValue } from '../../../utils/heatmap/formatSliderValue';
import { useNavigate } from 'react-router-dom';
import { Data, List } from '../../../components/Trash/Listing/TrashListingComponent';

export const Heatmap = () => {
  const [heatmapStartMonth, setHeatmapStartMonth] = useState(6);
  const navigate = useNavigate();
  const [heatmapStartDate, setHeatmapStartDate] = useState(
    formatSliderValue(heatmapStartMonth)
  );
  const [data, setData] = useState<Data | undefined>();

  useEffect(() => {
    const abortController = new AbortController();

    const fetchedData = async () => {
      const response = await fetch(
        import.meta.env.VITE_APP_BACKEND_URL + `/api/trash/heatmap?startDate=${heatmapStartDate.toISOString()}`,
        {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      setData(data);

      if(response.status === 401) {
        navigate("/logout");
      }
    };
    fetchedData();


    return () => {
      abortController.abort();
    }
  }, [heatmapStartDate, navigate]);


  const handleChange = useCallback((event: Event, newValue: number | number[]) => {
    setHeatmapStartMonth(newValue as number);
    setHeatmapStartDate(formatSliderValue(newValue as number));
  }, []);

  const heatmapData = useMemo(() => data ? data.trashs.map((item: any) => [
    item.latitude,
    item.longitude,
    1.2,
  ]): [] as [number, number, number][], [data]);

  if (!data) return null;

  return (
    <div style={{ position: 'relative' }}>
      <HeatMapComponent
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        /** @ts-ignore */
        heatmapData={heatmapData}
        heatmapDate={heatmapStartDate}
      />
      <div style={{
        position: 'absolute',
        zIndex: 500,
        width: '100%',
        bottom: 0,
        background: 'linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.75) 75%, rgba(0,0,0,0) 100%)',
        padding: '10px'
      }}>
        <Slider
          value={heatmapStartMonth}
          onChange={handleChange}
          max={12}
          min={1}
          valueLabelFormat={value => `Depuis ${value} mois`}
          aria-labelledby="heatmap-slider"
          valueLabelDisplay="auto"
          marks={true}
        />
      </div>
    </div>
  );
};
