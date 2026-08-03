import Link from 'next/link';

import { HeaderPrintButton } from '@/components/common/HeaderPrintButton';

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
      <div className="topbar-actions">
        {!compact && <Link className="dark-button" href="/">홈</Link>}
        <HeaderPrintButton />
      </div>
    </header>
  );
}
