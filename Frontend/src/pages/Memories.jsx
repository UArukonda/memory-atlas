// import { createMemory, getMemories } from "../services/memories";
// import { useState, useEffect, useCallback } from "react";
// import { Link } from "react-router-dom";
// import { useMemoryForm } from "../hooks/useMemoryForm";
// import { usePhotoInput } from "../hooks/usePhotoInput";
// import MemoryCard from "../components/MemoryCard";
// import MemoryForm from "../components/MemoryForm";

// const Memories = () => {
//   const [isAddMemoryOpen, setIsAddMemoryOpen] = useState(false);
//   const [memories, setMemories] = useState([]);
//   const { photoInputRef, photoInput, setPhotoInput, handleFileChange } =
//     usePhotoInput();
//   const [formState, dispatch] = useMemoryForm();

//   const fetchMemories = useCallback(async () => {
//     try {
//       const response = await getMemories();
//       setMemories(response.data.memories);
//     } catch (err) {
//       console.log(err?.response?.data?.message);
//     }
//   }, []);

//   useEffect(() => {
//     fetchMemories();
//   }, [fetchMemories]);

//   const handleCreate = async () => {
//     try {
//       await createMemory({
//         ...formState,
//         photos: photoInput,
//       });
//       await fetchMemories();
//       setIsAddMemoryOpen(!isAddMemoryOpen);
//       dispatch({ type: "RESET" });
//       setPhotoInput([]);
//     } catch (err) {
//       console.log(err?.response?.status);
//     }
//   };

//   return (
//     <>
//       <div className="mb-8">
//         <h1 className="text-2xl font-semibold text-heading">Memories</h1>
//         <p className="mt-1 text-sm text-muted">
//           Everything you've shared together
//         </p>
//       </div>
//       {memories.length === 0 ? (
//         <p className="text-sm text-muted">
//           No memories yet, add your first one.
//         </p>
//       ) : (
//         <div className="mt-8 grid grid-cols-1 gap-4 px-2 md:grid-cols-3 md:px-0">
//           {memories.map((memory) => (
//             <Link key={memory._id} to={`/memories/${memory._id}`}>
//               <MemoryCard memory={memory} />
//             </Link>
//           ))}
//         </div>
//       )}
//       <button
//         type="button"
//         onClick={() => setIsAddMemoryOpen(true)}
//         className="fixed bottom-8 right-8 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-3xl text-white shadow-lg transition hover:bg-primary-hover"
//         aria-label="Add memory"
//       >
//         +
//       </button>
//       {isAddMemoryOpen && (
//         <MemoryForm
//           title="Add"
//           formOpen={setIsAddMemoryOpen}
//           formState={formState}
//           dispatch={dispatch}
//           onSave={handleCreate}
//           photoInputRef={photoInputRef}
//           onFileChange={handleFileChange}
//         />
//       )}
//     </>
//   );
// };

// export default Memories;

import { createMemory, getMemories } from "../services/memories";
import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useMemoryForm } from "../hooks/useMemoryForm";
import { usePhotoInput } from "../hooks/usePhotoInput";
import MemoryCard from "../components/MemoryCard";
import MemoryForm from "../components/MemoryForm";
import { Plus } from "lucide-react";

const Memories = () => {
  const [isAddMemoryOpen, setIsAddMemoryOpen] = useState(false);
  const [memories, setMemories] = useState([]);
  const { photoInputRef, photoInput, setPhotoInput, handleFileChange } =
    usePhotoInput();
  const [formState, dispatch] = useMemoryForm();

  const fetchMemories = useCallback(async () => {
    try {
      const response = await getMemories();
      setMemories(response.data.memories);
    } catch (err) {
      console.log(err?.response?.data?.message);
    }
  }, []);

  useEffect(() => {
    fetchMemories();
  }, [fetchMemories]);

  const handleCreate = async () => {
    try {
      await createMemory({
        ...formState,
        photos: photoInput,
      });
      await fetchMemories();
      setIsAddMemoryOpen(!isAddMemoryOpen);
      dispatch({ type: "RESET" });
      setPhotoInput([]);
    } catch (err) {
      console.log(err?.response?.status);
    }
  };

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-heading">Memories</h1>
        <p className="mt-1 text-sm text-muted">
          Everything you've shared together
        </p>
      </div>

      {memories.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-surface px-6 py-16 text-center">
          <h2 className="text-lg font-semibold text-heading">
            No memories yet
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">
            Start preserving the little moments you never want to forget.
          </p>
          <button
            type="button"
            onClick={() => setIsAddMemoryOpen(true)}
            className="mt-6 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-primary-hover"
          >
            Add your first memory
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {memories.map((memory) => (
            <Link
              key={memory._id}
              to={`/memories/${memory._id}`}
              className="group block"
            >
              <MemoryCard memory={memory} />
            </Link>
          ))}
        </div>
      )}

      {memories.length > 0 && (
        <button
          type="button"
          onClick={() => setIsAddMemoryOpen(true)}
          className="fixed right-6 bottom-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-all duration-200 hover:-translate-y-1 hover:bg-primary-hover hover:shadow-xl"
          aria-label="Add memory"
        >
          <Plus size={24} strokeWidth={2.5} />
        </button>
      )}

      {isAddMemoryOpen && (
        <MemoryForm
          title="Add"
          formOpen={setIsAddMemoryOpen}
          formState={formState}
          dispatch={dispatch}
          onSave={handleCreate}
          photoInputRef={photoInputRef}
          onFileChange={handleFileChange}
        />
      )}
    </>
  );
};

export default Memories;
