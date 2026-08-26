import Input from "./Input";

const MemoryForm = ({
  title,
  formOpen,
  formState,
  dispatch,
  onSave,
  photoInputRef,
  onFileChange,
}) => {
  return (
    <>
      <div className="bg-black/40 fixed inset-0 z-50 flex items-center justify-center px-4">
        <div className="bg-surface w-full max-w-md rounded-xl p-6 shadow-xl">
          <h2 className="font-semibold text-heading text-xl">{title} Memory</h2>
          <div className="mt-4 grid grid-cols-2 gap-4">
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
              placeholder="Title"
            />
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
            <input
              type="file"
              accept="image/*"
              ref={photoInputRef}
              onChange={onFileChange}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => photoInputRef.current.click()}
              className="mt-3 border border-border hover:bg-gray-50 px-4 py-2 rounded-lg transition font-medium text-body text-sm"
            >
              Upload Photos
            </button>
            <div className="col-span-2 flex flex-col gap-2">
              <label htmlFor="description">description</label>
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
                }}
                className="resize-none rounded-md border border-border px-3 py-2 text-body outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:bg-gray-100 disabled:text-muted disabled:cursor-not-allowed"
              />
            </div>
            <div className="col-span-2">
              <Input
                label="Date"
                id="date"
                type="date"
                value={formState.date}
                onChange={(e) => {
                  dispatch({
                    type: "SET_FIELD",
                    field: "date",
                    value: e.target.value,
                  });
                }}
                name="date"
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => formOpen(false)}
              className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-body transition hover:bg-primary/5"
            >
              Cancel
            </button>{" "}
            <button
              type="button"
              onClick={onSave}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-hover"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MemoryForm;
