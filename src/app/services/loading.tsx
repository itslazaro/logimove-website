import { Container } from "@/components/ui/Container";

export default function ServicesLoading() {
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
          <div className="space-y-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="grid gap-6 rounded-3xl border border-gray-200 bg-white p-7 shadow-sm md:grid-cols-3 md:p-9"
              >
                <div className="md:col-span-1">
                  <div className="size-14 animate-pulse rounded-2xl bg-gray-200" />
                  <div className="mt-4 h-7 w-40 animate-pulse rounded-lg bg-gray-200" />
                </div>
                <div className="md:col-span-2">
                  <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
                  <div className="mt-2 h-4 w-3/4 animate-pulse rounded bg-gray-200" />
                  <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
                    {[1, 2, 3, 4].map((j) => (
                      <div key={j} className="h-4 w-48 animate-pulse rounded bg-gray-200" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
