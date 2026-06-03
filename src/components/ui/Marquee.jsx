/**
 * Infinite CSS marquee. Duplicates its children once and translates -50%
 * so the loop is seamless. Pauses on hover. `reverse` flips direction.
 */
export default function Marquee({ children, duration = 32, reverse = false, className = '' }) {
  return (
    <div className={`group/marquee w-full overflow-hidden ${className}`}>
      <div
        className={`marquee-track ${reverse ? 'marquee-reverse' : ''}`}
        style={{ '--marquee-duration': `${duration}s` }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  )
}
