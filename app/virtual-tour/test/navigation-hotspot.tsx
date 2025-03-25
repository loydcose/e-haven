export default function NavigationHotspot({ onClick }: { onClick: () => void }) {
  return (
    <div
      className="absolute bottom-10 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-black text-white rounded cursor-pointer"
      onClick={onClick}
    >
      Go Forward →
    </div>
  );
}
