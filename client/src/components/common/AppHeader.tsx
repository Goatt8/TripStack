import Link from 'next/link';

import { HeaderAccountButton } from '@/components/common/HeaderAccountButton';
import { HeaderPrintButton } from '@/components/common/HeaderPrintButton';

type AppHeaderProps = {
  compact?: boolean;
  showAccountMenu?: boolean;
  title: string;
};

export function AppHeader({ compact = false, showAccountMenu = false, title }: AppHeaderProps) {
  return (
    <header className={compact ? 'topbar logo-topbar' : 'topbar'}>
      <div>
        <p className="eyebrow">TripStack</p>
        {!compact && <h1>{title}</h1>}
      </div>
      <div className="topbar-actions">
        {!compact && <Link className="dark-button" href="/consumer">홈</Link>}
        {showAccountMenu && <HeaderAccountButton />}
        <HeaderPrintButton />
      </div>
    </header>
  );
}
