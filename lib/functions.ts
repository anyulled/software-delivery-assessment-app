import { Color, DeltaType } from '@tremor/react';
import { TrackerBlockProps } from '@tremor/react/dist/components/vis-elements/Tracker/Tracker';

export const colorIndicator = (value: number): Color => {
  if (value < 0 || value > 5) {
    throw new Error('Invalid indicator value');
  }

  switch (true) {
    case value <= 1:
      return 'red';
    case value <= 2:
      return 'orange';
    case value <= 3:
      return 'yellow';
    case value <= 4:
      return 'lime';
    default:
      return 'green';
  }
};
export const levelAdvice = (value: number): string => {
  if (value < 0 || value > 5) {
    throw new Error('Invalid indicator value');
  }

  switch (true) {
    case value <= 1:
      return 'Critical improvement needed';
    case value <= 2:
      return 'Needs work';
    case value <= 3:
      return 'Average';
    case value <= 4:
      return 'Improving';
    default:
      return 'Good shape';
  }
};
export const deltaIndicator = (value: number): DeltaType => {
  if (value < 0 || value > 5) {
    throw new Error('Invalid indicator value');
  }
  switch (true) {
    case value <= 1:
      return 'decrease';
    case value <= 2:
      return 'moderateDecrease';
    case value <= 3:
      return 'unchanged';
    case value <= 4:
      return 'moderateIncrease';
    default:
      return 'increase';
  }
};
export const getAverageScore = (
  continuousDeliveryData: TrackerBlockProps[]
): number =>
  parseFloat(
    (
      continuousDeliveryData.reduce(
        (total, data) => total + (data?.key as number),
        0
      ) / continuousDeliveryData.length
    ).toFixed(2)
  );
