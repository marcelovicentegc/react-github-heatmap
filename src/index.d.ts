import React, { CSSProperties } from 'react';
import { ColorInput } from 'tinycolor2';

export type HeatmapData = {
  years: {
    year: string;
    total: number;
    range: {
      start: string;
      end: string;
    };
  }[];
  contributions: {
    date: string;
    count: number;
    color: string;
    intensity: number;
  }[];
};

export type Props = {
  data: HeatmapData;
  blockSize?: number;
  blockMargin?: number;
  color?: ColorInput;
  dateFormat?: string;
  fontSize?: number;
  fullYear?: boolean;
  style?: CSSProperties;
  theme?: Theme;
  years?: number[];
};

export type Theme = {
  background: string;
  text: string;
  grade4: string;
  grade3: string;
  grade2: string;
  grade1: string;
  grade0: string;
};

declare function createCalendarTheme(
  baseColor: ColorInput,
  textColor?: string,
  emptyCellColor?: string,
  background?: string,
): Theme;

declare const Heatmap: React.FC<Props>;

export { createCalendarTheme, Heatmap };
