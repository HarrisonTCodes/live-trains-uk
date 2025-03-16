export default function Skeletons({ className, count }: { className?: string; count?: number }) {
  return Array.from({ length: count ?? 5 }).map((_, index: number) => (
    <div
      key={`Skeleton${index}`}
      className={`w-[90vw] max-w-[700px] animate-pulse rounded-lg bg-gray-300 ${className}`}
    />
  ));
}
