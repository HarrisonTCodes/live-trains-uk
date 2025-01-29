import { FaClock } from 'react-icons/fa6';
import Tag from '../tag/Tag';

export default function HeadingWidget({
  children,
  text,
  tag,
}: {
  children: React.ReactNode;
  text: string;
  tag?: React.ReactNode;
}) {
  return (
    <div className="flex w-[90vw] max-w-[700px] flex-col items-center justify-center gap-4 rounded-lg border border-stone-300 bg-white p-3 md:flex-row md:justify-between">
      {/* Text and tag */}
      <div className="flex flex-col items-center gap-1 md:items-start">
        <h2 className={`text-center text-stone-600 md:text-left ${tag && 'md:pl-1'}`}>{text}</h2>
        {tag && (
          <Tag>
            <FaClock className="text-stone-600" /> {tag}
          </Tag>
        )}
      </div>

      {/* Button */}
      <div className="flex w-full justify-center gap-2 md:w-fit md:justify-end">{children}</div>
    </div>
  );
}
