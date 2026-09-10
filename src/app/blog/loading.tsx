import { Container } from "@/components/ui/Container";

export default function BlogLoading() {
  return (
    <>
      <section className="border-b border-gray-100 bg-gray-50 py-20 sm:py-24">
        <Container>
          <div className="h-8 w-32 animate-pulse rounded-full bg-gray-200" />
          <div className="mt-5 h-12 w-96 max-w-full animate-pulse rounded-lg bg-gray-200" />
          <div className="mt-6 h-6 w-80 max-w-full animate-pulse rounded-lg bg-gray-200" />
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-3">
                  <div className="h-6 w-24 animate-pulse rounded-full bg-gray-200" />
                  <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
                </div>
                <div className="h-6 w-full animate-pulse rounded bg-gray-200" />
                <div className="mt-3 h-4 w-full animate-pulse rounded bg-gray-200" />
                <div className="mt-2 h-4 w-3/4 animate-pulse rounded bg-gray-200" />
                <div className="mt-6 flex-1 border-t border-gray-100 pt-4">
                  <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
