import Navbar from './components/Navbar'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-5">
      {/* <h1 className="text-4xl font-bold text-center"> Next.js + Tailwind CSS + TypeScript </h1> */}
      <Navbar />
    </main>
  )

}
