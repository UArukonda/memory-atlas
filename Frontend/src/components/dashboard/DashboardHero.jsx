import { CalendarDays, Heart } from "lucide-react";

const DashboardHero = ({ user }) => {
  return (
    <>
      <div className="relative mb-8 min-h-[320px] overflow-hidden rounded-2xl border border-border">
        {user?.relationship?.coverPhoto && (
          <img
            src={user.relationship.coverPhoto}
            alt="Cover"
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-black/5" />

        <div className="relative flex min-h-[320px] items-end p-6 sm:p-8 lg:p-10">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white/90 text-lg font-semibold text-primary shadow-sm backdrop-blur-sm">
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
              <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Good Morning, {user?.username}
              </h1>

              <p className="mt-2 text-sm text-white/85 sm:text-base">
                Welcome back to your little corner of memories
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                {user?.partner && (
                  <span className="flex items-center gap-1.5 text-white">
                    <Heart size={15} fill="currentColor" />
                    <span>
                      Your story with{" "}
                      {user?.partner?.username?.[0]?.toUpperCase() +
                        user?.partner?.username?.slice(1)}
                    </span>
                  </span>
                )}

                <span className="flex items-center gap-1.5 text-white/80">
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
