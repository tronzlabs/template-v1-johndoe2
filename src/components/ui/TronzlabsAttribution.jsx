/**
 * Responsive “Built by Tronzlabs” label — matches Nebula template footer pattern.
 */
export default function TronzlabsAttribution({ className = '' }) {
  return (
    <a
      href="https://www.tronzlabs.com"
      target="_blank"
      rel="noreferrer"
      data-cursor="hover"
      className={`inline-flex max-w-full flex-wrap items-center gap-2 text-xs transition-opacity hover:opacity-90 ${className}`}
    >
      <span className="text-sand/50">Built by</span>
      <span className="font-medium whitespace-nowrap">
        <span className="text-sand">Tron</span>
        <span className="text-red underline underline-offset-2">z</span>
        <span className="text-sand/60">labs</span>
      </span>
      <img
        src="/tronzlabs-logo.png"
        alt=""
        width={16}
        height={16}
        className="h-4 w-4 shrink-0 object-contain"
        aria-hidden="true"
      />
    </a>
  )
}
