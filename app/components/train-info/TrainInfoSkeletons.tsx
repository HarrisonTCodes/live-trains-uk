export default function TrainInfoSkeletons() {
  return Array.from({ length: 5 }).map((_, index: number) => (
    <div
      key={`skeleton${index}`}
      className="flex h-24 w-11/12 max-w-[500px] animate-pulse divide-x-2 rounded-xl bg-gray-300"
    />
  ));
}
