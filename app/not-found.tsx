import Notice from './components/notice/Notice';

export default function NotFoundPage() {
  return (
    <main className="flex flex-grow flex-col items-center gap-6 py-8">
      <Notice
        notice="Page Not Found"
        description="The page you are trying to reach does not exist. Please check the URL or return to the homepage."
        status="fail"
      />
    </main>
  );
}
