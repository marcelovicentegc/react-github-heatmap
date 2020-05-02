// GitHub theme
export type Theme = {
  [key: string]: string;
  background: string;
  text: string;
  grade4: string;
  grade3: string;
  grade2: string;
  grade1: string;
  grade0: string;
};

export const DEFAULT_THEME = {
  background: 'transparent',
  text: '#000',
  grade4: '#196127',
  grade3: '#239a3b',
  grade2: '#7bc96f',
  grade1: '#c6e48b',
  grade0: '#ebedf0',
};

export const NAMESPACE = 'react-github-heatmap';

export const LINE_HEIGHT = 1.5;
export const MIN_DISTANCE_MONTH_LABELS = 2;
export const TITLE_SCALE_FACTOR = 1.25;
