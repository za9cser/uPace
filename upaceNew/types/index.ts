export interface TimeSplit {
  id: string;
  minutes: number;
  seconds: number;
  deciseconds: number;
}

export interface SummaryOptions {
  includeMinutes: boolean;
  includeSeconds: boolean;
  includeDeciseconds: boolean;
}

export interface PaceInputs {
  time?: string; // Format: HH:MM:SS
  pace?: string; // Format: MM:SS (min/km)
  distance?: number; // km
}

export interface LapSplit {
  n: number;
  distance: number; // km
  totalTime: string; // Format: HH:MM:SS
  splitTime: string; // Format: MM:SS
}

export interface LapDistance {
  id: string;
  value: string;
}
