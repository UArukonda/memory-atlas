// const MemoryCard = ({ memory }) => {
//   return (
//     <>
//       <div className="rounded-xl border border-border bg-surface p-5 transition hover:-translate-y-0.5 hover:shadow-sm">
//         <h3 className="font-medium text-heading">{memory.title}</h3>
//         {memory.place && (
//           <p className="mt-1 text-sm text-muted">📍 {memory.place}</p>
//         )}
//         <p className="mt-2 text-sm text-body line-clamp-2">
//           {memory.description}
//         </p>
//         {memory.photos?.length > 0 ? (
//           <img
//             src={`${memory.photos[0]}`}
//             alt={memory.title}
//             className="mt-2 h-32 w-full rounded-md object-cover "
//           />
//         ) : (
//           <div className="mt-2 flex h-32 w-full items-center justify-center rounded-md bg-primary/5 text-sm text-muted">
//             📷 No photo yet
//           </div>
//         )}
//         <p className="mt-3 text-xs text-muted">
//           {new Date(memory.date).toLocaleDateString("en-GB", {
//             day: "numeric",
//             month: "long",
//             year: "numeric",
//           })}
//         </p>
//       </div>
//     </>
//   );
// };

// export default MemoryCard;

import { MapPin, CalendarDays } from "lucide-react";

const MemoryCard = ({ memory }) => {
  return (
    <div className="group overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      {memory.photos?.length > 0 ? (
        <img
          src={memory.photos[0]}
          alt={memory.title}
          className="aspect-[2/2] w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
      ) : (
        <div className="flex h-48 w-full items-center justify-center bg-primary/5 text-sm text-muted">
          <span>No photo yet</span>
        </div>
      )}

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold text-heading">{memory.title}</h3>
        </div>

        {memory.place && (
          <div className="mt-1 flex items-center gap-1.5 text-sm text-muted">
            <MapPin size={14} strokeWidth={1.8} />
            <span>{memory.place}</span>
          </div>
        )}

        <p className="mt-3 line-clamp-2 text-sm leading-6 text-body">
          {memory.description}
        </p>

        <div className="mt-4 flex items-center gap-1.5 border-t border-border pt-3 text-xs text-muted">
          <CalendarDays size={14} strokeWidth={1.8} />
          <span>
            {new Date(memory.date).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MemoryCard;
