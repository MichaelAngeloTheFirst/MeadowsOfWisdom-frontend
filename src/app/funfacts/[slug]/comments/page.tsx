'use client';
import { TestComp } from './components/TestComp';
import Provider from './components/VoteContext';

export default function Comments({ params: { slug } }: { params: { slug: number } }) {
  return (
    <main className="flex min-h-0 w-full flex-grow justify-center">
      <Provider comment={[]}>
        <TestComp fact_id={slug} />
      </Provider>
    </main>
  );
}
