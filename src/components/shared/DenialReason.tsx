type Props = {
  status: string
  denialReason?: string | null
  className?: string
}

export default function DenialReason({ status, denialReason, className }: Props) {
  if (status !== 'denied') return null

  const reason = denialReason?.trim()

  return (
    <div className={['text-xs text-slate-400', className].filter(Boolean).join(' ')}>
      <p className="mb-1 font-semibold text-rose-400">Denied:</p>
      <p>{reason || 'No denial reason was provided. If you have questions, contact your commissioner.'}</p>
    </div>
  )
}

