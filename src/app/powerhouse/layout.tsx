import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Power House Picks | Power House League',
  description: 'Manage Game of the Week picks for the Power House League.',
}

const PowerhouseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col px-4 py-10 md:px-6 lg:px-8">
        <header className="mb-10">
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">PowerHouse Picks</h1>
          <p className="mt-2 text-sm text-slate-300">
            Weekly Game of the Week picks for the Power House League.
          </p>
        </header>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}

export default PowerhouseLayout

