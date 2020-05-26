import { useState, useEffect } from 'react';
import { withContext } from 'app/context';

const Breakpoint = ({
  context,
  lg,
  md,
  sm,
  children,
}) => {
  const { breakpoints } = context.theme;
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener('resize', () => {
      setWidth(window.innerWidth);
    });
  }, []);

  const conditional = () => {
    if (lg && width >= breakpoints.lg) {
      return true;
    }
    if (md && width >= breakpoints.md) {
      return true;
    }
    if (sm && width < breakpoints.md) {
      return true;
    }
    return false;
  };

  return conditional() ? children : '';
};

export default withContext(Breakpoint);
