const ConnectPartnerPrompt = ({ onConnect }) => {
  return (
    <>
      <section className="mb-8">
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
          <p className="text-sm font-medium text-primary">One step left</p>

          <h2 className="mt-1 text-xl font-semibold text-heading">
            Connect with your partner
          </h2>

          <p className="mt-2 text-sm leading-6 text-body">
            Share your code or enter theirs to start building your story
            together.
          </p>

          <button
            onClick={onConnect}
            className="mt-5 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white transition hover:bg-primary-hover"
          >
            Connect Now
          </button>
        </div>
      </section>
    </>
  );
};

export default ConnectPartnerPrompt;
