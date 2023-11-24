'use client';
import { TestComp } from './components/TestComp';
import Provider from './components/VoteContext';

export default function Comments({ params: { factId } }: { params: { factId: number } }) {
  console.log(factId);
  if(factId == undefined) return (<div>loading</div>)
   
  return (
    <main className="flex min-h-0 w-full flex-grow justify-center">
      <Provider comment={[]} factId = {factId}>
        <TestComp factId={factId} />
      </Provider>
    </main>
  );
}
