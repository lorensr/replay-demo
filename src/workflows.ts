import { defineSignal, proxyActivities, setHandler, sleep } from '@temporalio/workflow';
import type * as activities from './activities';

const { greet } = proxyActivities<typeof activities>({
  startToCloseTimeout: '1 minute',
});

export const incrementSignal = defineSignal<[number]>('increment');

export async function counter(name: string): Promise<void> {
  let total = 0;
  let activity1: string, activity2: string; // eslint-disable-line prefer-const

  setHandler(incrementSignal, (count) => {
    total += count;
  });

  await sleep('1s');
  activity1 = await greet(name);
  await sleep('2s');
  activity2 = await greet(name);

  // don't complete the workflow
  await new Promise(() => {
    return;
  });
}
