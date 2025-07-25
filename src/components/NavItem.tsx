export default function NavItem({ icon, label, flexDirection = "flex-col" }: { icon: React.ReactNode; label: string; flexDirection?: string }) {
  return (
    <div className={`flex ${flexDirection} items-center hover:text-blue-600 hover:bg-gray-400 rounded-md p-4 gap-2 cursor-pointer`}>
      {icon}
      <span className="mt-1 text-center leading-tight">{label}</span>
    </div>
  );
}