export const describeTimeMode = (mode? : string[]) => ({
    hasHours: mode?.includes("hh") ?? true,
    hasMinutes: mode?.includes("mm") ?? true,
    hasSeconds: mode?.includes("ss") ?? true,
    hasDeciseconds: mode?.includes("ds") ?? true,
  } as DescribedTimeMode);

export type DescribedTimeMode = {
    hasHours: boolean,
    hasMinutes: boolean,
    hasSeconds: boolean,
    hasDeciseconds: boolean,
}
  