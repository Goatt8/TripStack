import Link from 'next/link';

type AppHeaderProps = {
  title: string;
};

export function AppHeader({ title }: AppHeaderProps) {
  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">TripStack</p>
        <h1>{title}</h1>
      </div>
      <Link className="dark-button" href="/">역할 변경</Link>
    </header>
  );
}
