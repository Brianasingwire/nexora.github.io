// Takes the slot of Pulseflow's pine stats band. Nexora has no real metrics to
// show yet, so the band carries the problem statement instead of numbers.
export default function Problem() {
  return (
    <section className="bg-pine">
      <div className="mx-auto grid max-w-7xl gap-6 px-6 py-14 md:grid-cols-12 md:items-end">
        <h2 className="font-display text-3xl font-semibold leading-tight tracking-[-0.03em] text-balance text-mintbright md:col-span-5">
          Manual follow-up is costing you customers.
        </h2>
        <p className="max-w-[56ch] text-pretty text-white/70 md:col-span-7">
          Every unanswered lead, every delayed response, every manual data entry step is a chance for a customer to go elsewhere. Most businesses don't have a staffing problem — they have a systems problem.
        </p>
      </div>
    </section>
  );
}
