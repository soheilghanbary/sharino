'use client';
import { useRouter } from 'next/navigation';

export default function NotFoundPage() {
  const router = useRouter();
  return (
    <div>
      <div className="my-32 space-y-4 text-center">
        <h1 className="text-center font-extrabold text-4xl">
          متاسفانه صفحه مورد نظر یافت نشد!
        </h1>
        <button
          type="button"
          className="rounded-md bg-blue-600 px-4 py-2 font-medium shadow-sm"
          onClick={() => router.back()}
        >
          برگشت به صفحه قبلی
        </button>
      </div>
    </div>
  );
}
