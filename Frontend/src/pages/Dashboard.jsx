import { useAuth } from "../context/useAuth";
import { useRelationshipModal } from "../context/useRelationshipModal";

const Dashboard = () => {
  const { user } = useAuth();
  const { relation } = useRelationshipModal();

  return (
    <>
      <main>
        <section className="mb-8">
          <div className=" flex items-center gap-4">
            <img
              src={null}
              alt="Upender and Mithuna"
              className="h-14 w-14 rounded-full border-2 border-white shadow-sm "
            />
            <div>
              <h1 className="text-3xl font-semibold  text-heading">
                Good morning, {user?.username}
              </h1>
              <p className="mt-2 text-base text-body">
                Welcome back to your little corner of memories
              </p>
              <p className="mt-1 text-sm text-muted">
                Date:{new Date().toLocaleDateString("en-GB")}
              </p>
            </div>
          </div>
        </section>
        {console.log(relation)}
        {!relation && (
          <section className="mb-8">
            <div className="rounded-xl border border-primary/30 bg-primary/5 p-6">
              <p className="text-sm font-medium text-primary">One step left</p>
              <h2 className="mt-1 text-xl font-semibold text-heading">
                Connect with your partner
              </h2>
              <p className="mt-2 text-sm text-body">
                Share your code or enter theirs to start building your story
                together.
              </p>
              <button className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-hover">
                Connect Now
              </button>
            </div>
          </section>
        )}
      </main>
    </>
  );
};

export default Dashboard;
