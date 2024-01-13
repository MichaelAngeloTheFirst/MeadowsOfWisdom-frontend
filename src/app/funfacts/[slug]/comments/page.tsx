'use client';
import { CommentViewComponent } from './components/CommentViewComponent';
import Provider from './components/VoteContext';

export default function Comments({ params }: { params: { slug: number } }) {
  return (
    <main className="flex min-h-0 w-full flex-grow justify-center">
      <Provider comment={[]} factId={params.slug}>
        <CommentViewComponent factId={params.slug} />
      </Provider>
    </main>
  );
}
