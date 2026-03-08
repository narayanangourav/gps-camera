export const BREAKPOINT_TABLET = 768;
export const BREAKPOINT_DESKTOP = 1200;
export const HEIGHT_BREAKPOINT_COMPACT = 760;
export const HEIGHT_BREAKPOINT_TALL = 960;

type ResponsiveValues<T> = {
  mobile: T;
  tablet?: T;
  desktop?: T;
};

type HeightResponsiveValues<T> = {
  compact: T;
  regular?: T;
  tall?: T;
};

export const responsiveValue = <T>(
  width: number,
  values: ResponsiveValues<T>,
): T => {
  if (width >= BREAKPOINT_DESKTOP) {
    return values.desktop ?? values.tablet ?? values.mobile;
  }

  if (width >= BREAKPOINT_TABLET) {
    return values.tablet ?? values.mobile;
  }

  return values.mobile;
};

export const isCompactScreen = (width: number) => width < BREAKPOINT_TABLET;

export const responsiveHeightValue = <T>(
  height: number,
  values: HeightResponsiveValues<T>,
): T => {
  if (height >= HEIGHT_BREAKPOINT_TALL) {
    return values.tall ?? values.regular ?? values.compact;
  }

  if (height >= HEIGHT_BREAKPOINT_COMPACT) {
    return values.regular ?? values.compact;
  }

  return values.compact;
};

export const isShortScreen = (height: number) =>
  height < HEIGHT_BREAKPOINT_COMPACT;
