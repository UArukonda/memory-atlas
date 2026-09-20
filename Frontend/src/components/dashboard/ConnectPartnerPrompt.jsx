const ConnectPartnerPrompt = ({ onConnect }) => {
  return (
    <>
      <section className="mb-8">
        <div className="rounded-lg border border-dashed border-primary/40 bg-primary/5 p-6">
          <p className="eyebrow">One step left</p>

          <h2 className="mt-2 font-display text-2xl font-medium text-heading">
            Connect with your partner
          </h2>

          <p className="mt-2 text-sm leading-6 text-body">
            Share your code or enter theirs to start building your story
            together.
          </p>

          <button
            onClick={onConnect}
            className="mt-5 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-ink transition hover:bg-primary-hover"
          >
            Connect Now
          </button>
        </div>
      </section>
    </>
  );
};

export default ConnectPartnerPrompt;
