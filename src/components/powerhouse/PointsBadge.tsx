const PointsBadge = ({ points }: { points: number }) => {
  return (
    <span className="inline-flex items-center rounded-full bg-indigo-600/20 px-3 py-1 text-sm font-medium text-indigo-300">
      {points} pts
    </span>
  )
}

export default PointsBadge

