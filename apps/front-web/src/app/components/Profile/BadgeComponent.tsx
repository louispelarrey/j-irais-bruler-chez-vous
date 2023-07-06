import {
  Whatshot
} from '@mui/icons-material';
import { FC } from 'react';

interface BadgeComponentProps {
  count: number;
}

const BadgeComponent: FC<BadgeComponentProps> = ({ count }) => {
  let icon = <Whatshot fontSize="small" />;

  if (count > 100) {
    icon = <Whatshot fontSize="large" />;
  } else if (count > 50) {
    icon = <Whatshot fontSize="medium" />;
  } else if (count > 20) {
    icon = <Whatshot fontSize="inherit" />;
  } else if (count > 10) {
    icon = <Whatshot fontSize="small" />;
  }
  return icon;
};

export default BadgeComponent;