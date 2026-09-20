import { CalendarDays, Heart } from "lucide-react";

const DashboardHero = ({ user }) => {
  return (
    <>
      <div className="relative mb-10 min-h-[360px] overflow-hidden rounded-xl border border-border bg-surface shadow-2xl">
        {user?.relationship?.coverPhoto && (
          <img
            src={user.relationship.coverPhoto}
            alt="Cover"
            className="absolute inset-0 h-full w-full object-cover brightness-90 saturate-90"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-transparent" />

        <div className="relative flex min-h-[360px] items-end p-6 sm:p-8 lg:p-10">
          <div className="flex items-center gap-5">
            <div className="flex h-16 w-16 shrink-0 -rotate-0 items-center justify-center overflow-hidden rounded-sm border-4 border-paper bg-paper font-display text-xl font-semibold text-paper-primary shadow-xl sm:h-20 sm:w-20">
              {user?.relationship?.couplePhoto ? (
                <img
                  src={user.relationship.couplePhoto}
                  alt=""
                  className="h-full w-full object-cover"
                />
              ) : (
                <>
                  {user?.username?.[0]?.toUpperCase()}
                  {user?.partner &&
                    `+${user.partner.username[0].toUpperCase()}`}
                </>
              )}
            </div>

            <div>
              <h1 className="text-3xl font-medium tracking-tight text-heading sm:text-5xl">
                Good Morning, {user?.username}
              </h1>

              <p className="mt-2 font-display text-base italic text-body sm:text-lg">
                Welcome back to your little corner of memories
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                {user?.partner && (
                  <span className="flex items-center gap-1.5 text-heading">
                    <Heart
                      size={15}
                      fill="currentColor"
                      className="text-primary"
                    />
                    <span>
                      Your story with{" "}
                      {user?.partner?.username?.[0]?.toUpperCase() +
                        user?.partner?.username?.slice(1)}
                    </span>
                  </span>
                )}

                <span className="flex items-center gap-1.5 text-body/80">
                  <CalendarDays size={15} />
                  <span>
                    {new Date().toLocaleDateString("en-GB", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                    })}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardHero;
