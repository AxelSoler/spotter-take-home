import Link from "next/link";

export default function NavItem({
  icon,
  label,
  href,
  flexDirection = "flex-col"
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
  flexDirection?: string;
}) {
  return (
    <Link href={href} className="w-full">
      <div
        className={`flex ${flexDirection} items-center hover:text-blue-600 hover:bg-gray-400 rounded-md p-1 md:p-4 gap-2 cursor-pointer`}
      >
        {icon}
        <span className="mt-1 text-center leading-tight whitespace-nowrap overflow-hidden text-ellipsis">{label}</span>
      </div>
    </Link>
  );
}
