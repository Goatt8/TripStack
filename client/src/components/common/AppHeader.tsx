import Link from 'next/link';

type AppHeaderProps = {
  compact?: boolean;
  title: string;
};

export function AppHeader({ compact = false, title }: AppHeaderProps) {
  return (
    <header className={compact ? 'topbar logo-topbar' : 'topbar'}>
      <div>
        <p className="eyebrow">TripStack</p>
        {!compact && <h1>{title}</h1>}
      </div>
      {!compact && <Link className="dark-button" href="/">홈</Link>}
    </header>
  );
}
