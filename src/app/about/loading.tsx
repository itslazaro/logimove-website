import { Container } from "@/components/ui/Container";

export default function AboutLoading() {
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
          <div className="mb-12 flex flex-col items-center gap-4 text-center sm:mb-16">
            <div className="h-8 w-32 animate-pulse rounded-full bg-gray-200" />
            <div className="h-10 w-64 animate-pulse rounded-lg bg-gray-200" />
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-48 animate-pulse rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="size-12 animate-pulse rounded-xl bg-gray-200" />
                <div className="mt-5 h-6 w-32 animate-pulse rounded bg-gray-200" />
                <div className="mt-2 h-4 w-full animate-pulse rounded bg-gray-200" />
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
