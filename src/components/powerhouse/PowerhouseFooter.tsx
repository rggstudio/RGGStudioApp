import Link from 'next/link'

const PowerhouseFooter = () => {
  return (
    <footer className="mt-16 border-t border-slate-800 pt-6">
      <div className="text-center">
        <p className="text-sm text-slate-400 leading-relaxed">
          Created by League member{' '}
          <span className="font-semibold text-slate-300">Shopmaster</span>.{' '}
          <span className="block sm:inline">
            Helping out small businesses, churches, and creators build web apps that work.
          </span>{' '}
          -{' '}
          <Link 
            href="/" 
            className="font-semibold text-blue-400 hover:text-blue-300 transition-colors underline decoration-blue-400/50 hover:decoration-blue-300/70"
          >
            RGG Studio
          </Link>
        </p>
      </div>
    </footer>
  )
}

export default PowerhouseFooter

