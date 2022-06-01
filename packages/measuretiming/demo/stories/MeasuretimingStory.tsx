/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { useEffect, useState } from 'react';
import { Story } from '@storybook/react';
import { generateTimingHooks } from '@zendeskgarden/container-measuretiming';

const { useStoryTimingInA } = generateTimingHooks(
  {
    idPrefix: 'story',
    name: 'Story'
  },
  'A'
);

interface IArgs {
  text: string;
  content: 'immediately' | 'takes-a-while';
  mounted: boolean;
  isActive: boolean;
  reportFn: (report: any, metadata: any) => void;
}

const Hook = ({ content, reportFn, isActive }: Omit<IArgs, 'mounted'>) => {
  useStoryTimingInA({
    idSuffix: content,
    isActive,
    reportFn
  });

  return <div>Rendering immediately</div>;
};

const TakesAWhile = ({ content, reportFn, isActive }: Omit<IArgs, 'mounted'>) => {
  useStoryTimingInA({
    idSuffix: content,
    isActive,
    reportFn
  });

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (progress >= 100) return;
    setTimeout(() => {
      setProgress(prev => prev + 1);
    }, 30);
  }, [progress]);

  return <div>Simulating something that loads for a while... {progress}%</div>;
};

export const MeasuretimingStory: Story<IArgs> = ({ mounted, ...props }: IArgs) => {
  const { content } = props;
  const render = content === 'immediately' ? <Hook {...props} /> : <TakesAWhile {...props} />;

  return mounted ? render : <div>Nothing to show, element unmounted.</div>;
};
