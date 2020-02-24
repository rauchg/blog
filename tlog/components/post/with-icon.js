import { memo, useMemo } from 'react';

const withIcon = (icon, opts = {}) => {
  const { color: defaultColor, size: defaultSize, fill: defaultFill } = opts;
  const Icon = props => {
    const {
      size = defaultSize || '24px',
      color = defaultColor || 'currentColor',
      weight = 'normal',
      fill = defaultFill,
      align,
      ...restProps
    } = props;

    delete restProps.fill;
    delete restProps.stroke;
    delete restProps.width;
    delete restProps.height;

    const strokeWidth = useMemo(() => {
      if (weight === 'bold') {
        return 2;
      } else if (props.weight === 'light') {
        return 1;
      }
      return 1.5;
    }, [weight]);

    const verticalAlign = useMemo(() => {
      if (!align) return null;
      if (align === 'top') {
        return 'text-top';
      } else if (align === 'bottom') {
        return 'text-bottom';
      } else if (align === 'middle') {
        return 'middle';
      }
      return null;
    }, [align]);

    return (
      <svg
        viewBox="0 0 24 24"
        width={size}
        height={size}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        shapeRendering="geometricPrecision"
        {...restProps}
        style={{
          color,
          verticalAlign,
        }}
        dangerouslySetInnerHTML={{
          __html: icon,
        }}
      />
    );
  };

  return memo(Icon);
};

export default withIcon;
