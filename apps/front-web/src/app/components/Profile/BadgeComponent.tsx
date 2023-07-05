import {
  Brightness4,
  Brightness5,
  Brightness6,
  Brightness7,
  Whatshot
} from '@mui/icons-material';
import { FC } from 'react';

interface BadgeComponentProps {
  count: number;
}

const BadgeComponent: FC<BadgeComponentProps> = ({ count }) => {
  let icon = <Whatshot />;

  if (count > 100) {
    icon = <Brightness7 />;
  } else if (count > 50) {
    icon = <Brightness6 />;
  } else if (count > 20) {
    icon = <Brightness4 />;
  } else if (count > 10) {
    icon = <Brightness5 />;
  }

  return icon;
};

export default BadgeComponent;