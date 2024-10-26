export default function JourneySkeletons({ count = 5 }: { count?: number }) {
  return Array.from({ length: count }).map((_, index: number) => (
    <div
      key={`JourneySkeleton${index}`}
      className="h-20 w-11/12 max-w-[500px] animate-pulse rounded-xl bg-gray-300"
    />
  ));
}
