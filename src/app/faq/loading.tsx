import { Container } from "@/components/ui/Container";

export default function FaqLoading() {
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
          <div className="mx-auto max-w-3xl space-y-10">
            {[1, 2, 3].map((cat) => (
              <div key={cat}>
                <div className="mb-4 flex items-center gap-3">
                  <div className="size-9 animate-pulse rounded-lg bg-gray-200" />
                  <div className="h-6 w-40 animate-pulse rounded bg-gray-200" />
                </div>
                <div className="space-y-3">
                  {[1, 2, 3].map((q) => (
                    <div key={q} className="rounded-2xl border border-gray-200 bg-white px-5 py-4">
                      <div className="h-5 w-full animate-pulse rounded bg-gray-200" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
