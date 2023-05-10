import { Client } from '@temporalio/client';
import { nanoid } from 'nanoid';
import wait from 'waait';
import { counter, incrementSignal } from './workflows';

async function run() {
  const client = new Client();

  const handle = await client.workflow.start(counter, {
    args: ['Temporal'],
    taskQueue: 'hello-world',
    workflowId: 'workflow-' + nanoid(),
  });
  console.log(`Started workflow ${handle.workflowId}`);

  await handle.signal(incrementSignal, 10);
  await wait(1500);
  await handle.signal(incrementSignal, 20);
  await wait(2000);
  await handle.signal(incrementSignal, 12);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
