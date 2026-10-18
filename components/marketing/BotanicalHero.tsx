export function BotanicalHero({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 200"
      className={className}
      role="img"
      aria-label="A friendly sprout growing in a garden under a bright sun"
      focusable="false"
    >
      <circle cx="160" cy="100" r="96" className="fill-mint" />
      <circle cx="248" cy="44" r="24" className="fill-sun" />
      <path
        d="M160 150V70"
        strokeWidth="8"
        strokeLinecap="round"
        className="stroke-primary"
        fill="none"
      />
      <path d="M160 110c-28 0-48-16-48-40 28-4 48 12 48 40z" className="fill-primary" />
      <path d="M160 92c28 0 48-16 48-40-28-4-48 12-48 40z" className="fill-primary" />
      <circle cx="160" cy="62" r="16" className="fill-lavender" />
      <circle cx="160" cy="62" r="7" className="fill-sun" />
      <path
        d="M110 168h100l-10 20a8 8 0 0 1-7 4h-66a8 8 0 0 1-7-4z"
        className="fill-lavender"
      />
      <ellipse cx="80" cy="176" rx="26" ry="10" className="fill-sky" />
      <ellipse cx="244" cy="178" rx="22" ry="8" className="fill-sky" />
    </svg>
  );
}
