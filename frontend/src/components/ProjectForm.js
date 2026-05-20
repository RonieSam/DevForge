import React, { useState } from 'react'

export default function ProjectForm({submitForm, project, closeForm}) {

    const [form, setForm] = useState(project);

    function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleStackChange(idx, value) {
    const updatedStack = [...form.stack];
    updatedStack[idx] = value;
    setForm({
      ...form,
      stack: updatedStack,
    });
  }

  function addStack() {
    setForm({
      ...form,
      stack: [...form.stack, ""],
    });
  }

  function removeStack(idx) {
    const updatedStack = form.stack.filter(
      (_, index) => index !== idx
    );
    setForm({
      ...form,
      stack: updatedStack,
    });
  }

  function handleSubmit(e){
    e.preventDefault()
    submitForm(form)
    closeForm(false)
  }

  return (
    <form className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-5">

        {/* Top section */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-4 min-w-0">
            {/* Name */}
            <input
              type="text"
              value={form.name}
              onChange={handleChange}
              name="name"
              placeholder="Project Name"
              className="w-full text-2xl font-bold outline-none border-b border-transparent focus:border-gray-300 pb-2 text-gray-900"
            />

            {/* Description */}
            <textarea
              value={form.desc}
              onChange={handleChange}
              name="desc"
              rows={3}
              placeholder="Project Description"
              className="w-full resize-none text-sm text-gray-600 outline-none border border-gray-200 rounded-xl p-3 focus:border-gray-400 focus:ring-1 focus:ring-gray-200 transition"
            />

            {/* Github */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-400">
                GitHub Repository
              </label>
              <input
                type="text"
                value={form.github}
                onChange={handleChange}
                name="github"
                placeholder="https://github.com/..."
                className="border border-gray-200 rounded-lg p-2.5 text-sm outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-200 transition"
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 shrink-0">
            <button
              className="px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 transition"
              type='submit'
            >
              Save
            </button>
            <button
              className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition"
              onClick={() => closeForm(false)}
              type="button"
            >
              Cancel
            </button>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="space-y-3 border-t border-gray-100 pt-5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-800">
              Tech Stack
            </h3>
            <button
              type="button"
              onClick={addStack}
              className="px-3 py-1 rounded-lg bg-gray-900 text-white text-xs font-medium hover:bg-gray-700 transition"
            >
              + Add
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {form.stack.map((tech, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200"
              >
                <input
                  value={tech}
                  onChange={(e) =>
                    handleStackChange(idx, e.target.value)
                  }
                  className="bg-transparent outline-none text-xs font-medium w-20 text-gray-700"
                />
                <button
                  type="button"
                  onClick={() => removeStack(idx)}
                  className="text-red-400 hover:text-red-600 text-xs transition"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </form>
  )
}
