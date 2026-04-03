export default function Divider({ className = '' }: { className?: string }) {
  return (
    <hr
      className={`border-0 border-t border-[rgba(0,0,0,0.08)] ${className}`}
      aria-hidden="true"
    />
  )
}
