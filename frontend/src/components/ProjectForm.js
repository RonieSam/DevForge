import React, { useState } from 'react'

export default function ProjectForm({submitForm,project,closeForm}) {

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
   
            <form className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">

                {/* Top */}
                <div className="flex items-start justify-between gap-4">

                  <div className="flex-1 space-y-4">

                    {/* Name */}
                    <input
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      name="name"
                      placeholder="Project Name"
                      className="w-full text-4xl font-bold outline-none border-b border-transparent focus:border-zinc-300 pb-2"
                    />

                    {/* Description */}
                    <textarea
                      value={form.desc}
                      onChange={handleChange}
                      name="desc"
                      rows={3}
                      placeholder="Project Description"
                      className="w-full resize-none text-zinc-600 outline-none border rounded-2xl p-3 focus:border-zinc-400"
                    />

                    {/* Github */}
                    <div className="flex flex-col gap-2">
                      <label className="text-sm text-zinc-500 font-medium">
                        GitHub Repository
                      </label>

                      <input
                        type="text"
                        value={form.github}
                        onChange={handleChange}
                        name="github"
                        placeholder="https://github.com/..."
                        className="border rounded-xl p-3 outline-none focus:border-zinc-400"
                      />
                    </div>
                  </div>

                  {/* Save */}
                  <button className="px-5 py-2 rounded-xl bg-zinc-900 text-white hover:bg-zinc-700 transition" type='submit'>
                    Save
                  </button>
                  <button className="px-5 py-2 rounded-xl bg-zinc-900 text-white hover:bg-zinc-700 transition" onClick={()=>closeForm(false)}>
                    Cancel
                  </button>
                </div>

                {/* Stack */}
                <div className="space-y-3">

                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg">
                      Tech Stack
                    </h3>

                    <button
                      type="button"
                      onClick={addStack}
                      className="px-3 py-1 rounded-lg bg-zinc-900 text-white text-sm hover:bg-zinc-700 transition"
                    >
                      + Add
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-3">

                    {form.stack.map((tech, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-100 border border-zinc-200"
                      >
                        <input
                          value={tech}
                          onChange={(e) =>
                            handleStackChange(idx, e.target.value)
                          }
                          className="bg-transparent outline-none text-sm font-medium w-24"
                        />

                        <button
                          type="button"
                          onClick={() => removeStack(idx)}
                          className="text-red-500 hover:text-red-700"
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
