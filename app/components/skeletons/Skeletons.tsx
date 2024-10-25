export default function Skeletons({ count = 5 }: { count?: number }) {
  return Array.from({ length: count }).map((_, index: number) => (
    <div
      key={`skeleton${index}`}
      className="h-24 w-11/12 max-w-[500px] animate-pulse rounded-xl bg-gray-300"
    />
  ));
}
