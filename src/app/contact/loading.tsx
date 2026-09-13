import { Container } from "@/components/ui/Container";

export default function ContactLoading() {
  return (
    <>
      <section className="border-b border-gray-100 bg-gray-50 py-20 sm:py-24">
        <Container>
          <div className="h-8 w-32 animate-pulse rounded-full bg-gray-200" />
          <div className="mt-5 h-12 w-96 max-w-full animate-pulse rounded-lg bg-gray-200" />
          <div className="mt-6 h-6 w-80 max-w-full animate-pulse rounded-lg bg-gray-200" />
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-5">
            <div className="lg:col-span-2 space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-5">
                  <div className="size-11 shrink-0 animate-pulse rounded-xl bg-gray-200" />
                  <div className="flex-1">
                    <div className="h-3 w-16 animate-pulse rounded bg-gray-200" />
                    <div className="mt-2 h-5 w-32 animate-pulse rounded bg-gray-200" />
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:col-span-3">
              <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-9">
                <div className="h-8 w-64 animate-pulse rounded-lg bg-gray-200" />
                <div className="mt-2 h-4 w-80 animate-pulse rounded bg-gray-200" />
                <div className="mt-7 space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i}>
                        <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
                        <div className="mt-1.5 h-11 w-full animate-pulse rounded-lg bg-gray-200" />
                      </div>
                    ))}
                    <div className="sm:col-span-2">
                      <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
                      <div className="mt-1.5 h-24 w-full animate-pulse rounded-lg bg-gray-200" />
                    </div>
                  </div>
                  <div className="h-12 w-32 animate-pulse rounded-full bg-gray-200" />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
