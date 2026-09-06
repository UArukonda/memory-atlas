// import Input from "./Input";
// import { useState } from "react";

// const MemoryForm = ({
//   title,
//   formOpen,
//   formState,
//   dispatch,
//   onSave,
//   photoInputRef,
//   onFileChange,
// }) => {
//   const [formError, setFormError] = useState("");

//   const handleSaveClick = () => {
//     if (!formState.description) {
//       setFormError("Description is required.");
//       return;
//     }
//     setFormError("");
//     onSave();
//   };

//   return (
//     <>
//       <div className="bg-black/40 fixed inset-0 z-50 flex items-center justify-center px-4">
//         <div className="bg-surface w-full max-w-md rounded-xl p-6 shadow-xl">
//           <h2 className="font-semibold text-heading text-xl">{title} Memory</h2>
//           <div className="mt-4 grid grid-cols-2 gap-4">
//             <Input
//               label="Title"
//               id="title"
//               name="title"
//               value={formState.title}
//               onChange={(e) => {
//                 dispatch({
//                   type: "SET_FIELD",
//                   field: "title",
//                   value: e.target.value,
//                 });
//               }}
//               placeholder="Title"
//             />
//             <Input
//               label="Place"
//               id="place"
//               name="place"
//               value={formState.place}
//               onChange={(e) => {
//                 dispatch({
//                   type: "SET_FIELD",
//                   field: "place",
//                   value: e.target.value,
//                 });
//               }}
//               placeholder="Where was this?"
//             />
//             <input
//               type="file"
//               accept="image/*"
//               ref={photoInputRef}
//               multiple
//               onChange={onFileChange}
//               className="hidden"
//             />
//             <button
//               type="button"
//               onClick={() => photoInputRef.current.click()}
//               className="mt-3 border border-border hover:bg-gray-50 px-4 py-2 rounded-lg transition font-medium text-body text-sm"
//             >
//               Upload Photos
//             </button>
//             <div className="col-span-2 flex flex-col gap-2">
//               <label htmlFor="description">description</label>
//               <textarea
//                 name="description"
//                 id="description"
//                 required
//                 value={formState.description}
//                 onChange={(e) => {
//                   dispatch({
//                     type: "SET_FIELD",
//                     field: "description",
//                     value: e.target.value,
//                   });
//                 }}
//                 className="resize-none rounded-md border border-border px-3 py-2 text-body outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:bg-gray-100 disabled:text-muted disabled:cursor-not-allowed"
//               />
//             </div>
//             {formError && <p className="text-sm text-danger">{formError}</p>}
//             <div className="col-span-2">
//               <Input
//                 label="Date"
//                 id="date"
//                 type="date"
//                 value={formState.date}
//                 onChange={(e) => {
//                   dispatch({
//                     type: "SET_FIELD",
//                     field: "date",
//                     value: e.target.value,
//                   });
//                 }}
//                 name="date"
//               />
//             </div>
//           </div>
//           <div className="mt-6 flex justify-end gap-3">
//             <button
//               type="button"
//               onClick={() => formOpen(false)}
//               className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-body transition hover:bg-primary/5"
//             >
//               Cancel
//             </button>{" "}
//             <button
//               type="button"
//               onClick={handleSaveClick}
//               className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-hover"
//             >
//               Save
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default MemoryForm;

import Input from "./Input";
import { useState } from "react";
import { X, ImagePlus, Save } from "lucide-react";

const MemoryForm = ({
  title,
  formOpen,
  formState,
  dispatch,
  onSave,
  photoInputRef,
  onFileChange,
}) => {
  const [formError, setFormError] = useState("");

  const handleSaveClick = () => {
    if (!formState.description) {
      setFormError("Description is required.");
      return;
    }

    setFormError("");
    onSave();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-border px-6 py-5 sm:px-8">
          <div>
            <p className="text-sm font-medium text-primary">Memory Atlas</p>

            <h2 className="mt-1 text-2xl font-semibold tracking-tight text-heading">
              {title} Memory
            </h2>

            <p className="mt-1 text-sm text-muted">
              Save a moment you'll want to remember.
            </p>
          </div>

          <button
            type="button"
            onClick={() => formOpen(false)}
            className="rounded-lg p-2 text-muted transition hover:bg-background hover:text-heading"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <div className="max-h-[75vh] overflow-y-auto px-6 py-6 sm:px-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {/* Title */}
            <Input
              label="Title"
              id="title"
              name="title"
              value={formState.title}
              onChange={(e) => {
                dispatch({
                  type: "SET_FIELD",
                  field: "title",
                  value: e.target.value,
                });
              }}
              placeholder="What should you call this memory?"
            />

            {/* Place */}
            <Input
              label="Place"
              id="place"
              name="place"
              value={formState.place}
              onChange={(e) => {
                dispatch({
                  type: "SET_FIELD",
                  field: "place",
                  value: e.target.value,
                });
              }}
              placeholder="Where was this?"
            />

            {/* Date */}
            <div className="sm:col-span-2">
              <Input
                label="Date"
                id="date"
                type="date"
                name="date"
                value={formState.date}
                onChange={(e) => {
                  dispatch({
                    type: "SET_FIELD",
                    field: "date",
                    value: e.target.value,
                  });
                }}
              />
            </div>

            {/* Description */}
            <div className="sm:col-span-2">
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-medium text-heading"
              >
                What happened?
              </label>

              <textarea
                name="description"
                id="description"
                value={formState.description}
                onChange={(e) => {
                  dispatch({
                    type: "SET_FIELD",
                    field: "description",
                    value: e.target.value,
                  });
                  setFormError("");
                }}
                placeholder="Tell the story behind this memory..."
                rows={6}
                className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm leading-6 text-body outline-none transition placeholder:text-muted/70 focus:border-primary focus:ring-4 focus:ring-primary/10"
              />

              {formError && (
                <p className="mt-2 text-sm text-danger">{formError}</p>
              )}
            </div>

            {/* Photos */}
            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-medium text-heading">
                Photos
              </label>

              <input
                type="file"
                accept="image/*"
                ref={photoInputRef}
                multiple
                onChange={onFileChange}
                className="hidden"
              />

              <button
                type="button"
                onClick={() => photoInputRef.current?.click()}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-background px-4 py-6 text-sm font-medium text-body transition hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
              >
                <ImagePlus size={20} strokeWidth={1.8} />
                Add photos
              </button>

              {formState.photos?.length > 0 && (
                <p className="mt-2 text-xs text-muted">
                  {formState.photos.length} photo(s) selected
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-border bg-background px-6 py-4 sm:px-8">
          <button
            type="button"
            onClick={() => formOpen(false)}
            className="rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-body transition hover:bg-surface"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSaveClick}
            className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-primary-hover"
          >
            <Save size={17} />
            Save Memory
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemoryForm;
