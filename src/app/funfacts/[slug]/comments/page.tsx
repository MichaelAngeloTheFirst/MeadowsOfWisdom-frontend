'use client';
import { TestComp } from './components/TestComp';

export default function Comments({ params: { slug } }: { params: { slug: number } }) {
  return (
    <main className="flex w-full justify-center">
      <TestComp fact_id={slug} />
    </main>
  );
}
