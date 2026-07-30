import Link from 'next/link';

type RoleCardProps = {
  accent?: boolean;
  description: string;
  href: string;
  label: string;
  title: string;
};

export function RoleCard({ accent = false, description, href, label, title }: RoleCardProps) {
  return (
    <Link className={accent ? 'role-card accent' : 'role-card'} href={href}>
      <span>{label}</span>
      <strong>{title}</strong>
      <p>{description}</p>
    </Link>
  );
}
