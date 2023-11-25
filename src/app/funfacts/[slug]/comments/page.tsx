'use client';
import { TestComp } from './components/TestComp';
import Provider from './components/VoteContext';


export default function Comments({ params }: { params: { slug: number } }) {
  console.log("slug",params.slug);


  return (
    <main className="flex min-h-0 w-full flex-grow justify-center">
      <Provider comment={[]} factId = {params.slug}>
        <TestComp factId={params.slug} />
      </Provider>
    </main>
  );
}
