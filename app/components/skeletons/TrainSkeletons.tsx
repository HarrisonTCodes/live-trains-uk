export default function TrainSkeletons({ count = 5 }: { count?: number }) {
  return Array.from({ length: count }).map((_, index: number) => (
    <div
      key={`TrainSkeleton${index}`}
      className="h-40 w-[90vw] max-w-[700px] animate-pulse rounded-lg bg-gray-300"
    />
  ));
}
