export default function Skeletons({ count = 5 }: { count?: number }) {
  return Array.from({ length: count }).map((_, index: number) => (
    <div
      key={`Skeleton${index}`}
      className="min-h-24 w-[90vw] max-w-[700px] animate-pulse rounded-lg bg-gray-300"
    />
  ));
}
