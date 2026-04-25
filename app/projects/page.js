"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

function Page() {
  const [active, setActive] = useState("create");
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  console.log(projects);
  // console.log(form)
  const [form, setForm] = useState({
    title: "",
    description: "",
    overview: "",
    yearCompleted: "",
    clientName: "",
    clientLocation: "",
    clientIndustry: "",
    scopeOfWork: "",
    size: "",
    pinned: false,
  });
  const handleDelete = async () => {
    const res = await fetch(`/api/projects/${selectedId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      alert("Deleted ✅");
      setProjects((prev) => prev.filter((p) => p._id !== selectedId));
    } else {
      alert("Delete failed ❌");
    }

    setShowDelete(false);
    setSelectedId(null);
  };
  const [mainImage, setMainImage] = useState(null);
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔥 convert files
    const mainImageBase64 = mainImage ? await toBase64(mainImage) : null;

    const galleryBase64 = await Promise.all(images.map((img) => toBase64(img)));

    const videoBase64 = video ? await toBase64(video) : null;

    const payload = {
      ...form,
      mainImage: mainImageBase64,
      images: galleryBase64,
      video: videoBase64,
    };

    const res = await fetch("/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      alert("Project Created ✅");
    } else {
      alert("Error ❌");
    }
  };

  const fetchProjects = async () => {
    const res = await fetch("/api/projects");
    const data = await res.json();
    setProjects(data);
  };
  useEffect(() => {
    fetchProjects();
  }, []);
  return (
    <div className="grid grid-cols-6 h-screen border-t-4 border-[#002f67] ">
      <div className=" h-screen  border-r-2 border-[#002f67] p-4 font-bold">
        <p
          onClick={() => {
            setActive("create");
          }}
          className={`${active === "create" ? "bg-[#ffc800] shadow-xl" : ""} my-2 px-6 py-2 hover:cursor-pointer`}
        >
          CREATE
        </p>
        <p
          onClick={() => {
            setActive("edit");
          }}
          className={`${active === "edit" ? "bg-[#ffc800] shadow-xl" : ""} my-2 px-6 py-2 hover:cursor-pointer`}
        >
          EDIT
        </p>
      </div>
      {active === "create" ? (
        <div className="col-span-5 bg-[#002f67]/10 py-4 px-12 h-screen overflow-y-scroll">
          {/* <h6 className="text-[#002f67] font-semibold tracking-widest pt-4">
            SYSTEM INITIALIZATION
          </h6> */}
          <h1 className="text-[#002f67] my-4 text-6xl font-black">
            New Project Entry
          </h1>
          <hr className="border-[#ffc800] border-2 w-24 " />
          <div>
            <form
              onSubmit={handleSubmit}
              className=" w-full grid grid-cols-2 gap-6"
            >
              <div className="bg-white border-l-4 border-[#002f67] p-8 mt-4">
                <p className="text-[#002f67]/68 font-semibold tracking-widest text-sm">
                  PROJECT OVERVIEW FIELD
                </p>
                <input
                  onChange={(e) =>
                    setForm({ ...form, overview: e.target.value })
                  }
                  className="bg-[#002f67]/10 w-full px-2 py-1 outline-0 shadow-md border-b border-[#002f67]/16 mb-4"
                />
                <p className="text-[#002f67]/68 font-semibold tracking-widest text-sm">
                  TITLE/NAME
                </p>
                <input
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="bg-[#002f67]/10 w-full px-2 py-1 outline-0 shadow-md border-b border-[#002f67]/16 mb-4"
                />
                <p className="text-[#002f67]/68 font-semibold tracking-widest text-sm">
                  YEAR COMPLETED
                </p>
                <input
                  onChange={(e) =>
                    setForm({ ...form, yearCompleted: e.target.value })
                  }
                  className="bg-[#002f67]/10 w-full px-2 py-1 outline-0 shadow-md border-b border-[#002f67]/16 mb-4"
                />
                <p className="text-[#002f67]/68 font-semibold tracking-widest text-sm">
                  CLIENT NAME
                </p>
                <input
                  onChange={(e) =>
                    setForm({ ...form, clientName: e.target.value })
                  }
                  className="bg-[#002f67]/10 w-full px-2 py-1 outline-0 shadow-md border-b border-[#002f67]/16 mb-4"
                />
                <p className="text-[#002f67]/68 font-semibold tracking-widest text-sm">
                  CLIENT LOCATION
                </p>
                <input
                  onChange={(e) =>
                    setForm({ ...form, clientLocation: e.target.value })
                  }
                  className="bg-[#002f67]/10 w-full px-2 py-1 outline-0 shadow-md border-b border-[#002f67]/16 mb-4"
                />
                <p className="text-[#002f67]/68 font-semibold tracking-widest text-sm">
                  CLIENT INDUSTRY
                </p>
                <input
                  onChange={(e) =>
                    setForm({ ...form, clientIndustry: e.target.value })
                  }
                  className="bg-[#002f67]/10 w-full px-2 py-1 outline-0 shadow-md border-b border-[#002f67]/16 mb-4"
                />
                <p className="text-[#002f67]/68 font-semibold tracking-widest text-sm">
                  SCOPE OF WORK
                </p>
                <input
                  onChange={(e) =>
                    setForm({ ...form, scopeOfWork: e.target.value })
                  }
                  className="bg-[#002f67]/10 w-full px-2 py-1 outline-0 shadow-md border-b border-[#002f67]/16 mb-4"
                />
                <p className="text-[#002f67]/68 font-semibold tracking-widest text-sm">
                  SIZE
                </p>
                <input
                  onChange={(e) => setForm({ ...form, size: e.target.value })}
                  className="bg-[#002f67]/10 w-full px-2 py-1 outline-0 shadow-md border-b border-[#002f67]/16 mb-4"
                />
                  <p className="text-[#002f67]/68 font-semibold tracking-widest text-sm">
                  DESCRIPTION
                </p>
                <input
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="bg-[#002f67]/10 w-full px-2 py-1 outline-0 shadow-md border-b border-[#002f67]/16 mb-4"
                />
              </div>
              <div className="bg-white border-l-4 border-[#002f67] p-8 mt-4">
                {/* MAIN IMAGE */}
                <div className="mb-4">
                  <p className="text-[#002f67]/68 font-semibold tracking-widest text-sm">
                    MAIN IMAGE (Landscape Recommended)
                  </p>

                  <label className="mt-2 flex items-center justify-center h-40 border-2 border-dashed bg-gray-100 border-gray-300 rounded cursor-pointer hover:border-[#002f67] transition">
                    {!mainImage ? (
                      <span className="text-3xl text-[#002f67]">+</span>
                    ) : (
                      <img
                        src={URL.createObjectURL(mainImage)}
                        className="h-full w-full object-cover rounded"
                      />
                    )}

                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => setMainImage(e.target.files[0])}
                    />
                  </label>
                </div>
                {/* GALLERY */}
                <div className="mb-4">
                  <p className="text-[#002f67]/68 font-semibold tracking-widest text-sm">
                    GALLERY IMAGES
                  </p>

                  <div className="grid grid-cols-3 gap-3 mt-2">
                    {/* Existing Images */}
                    {images.map((img, i) => (
                      <div key={i} className="relative h-24">
                        <img
                          src={URL.createObjectURL(img)}
                          className="h-full w-full object-cover rounded"
                        />
                      </div>
                    ))}

                    {/* Upload Box */}
                    <label className="flex items-center justify-center h-24 border-2 border-dashed border-gray-300 bg-gray-100 rounded cursor-pointer hover:border-[#002f67] transition">
                      <span className="text-2xl text-[#002f67]">+</span>

                      <input
                        type="file"
                        multiple
                        className="hidden"
                        onChange={(e) =>
                          setImages((prev) => [
                            ...prev,
                            ...Array.from(e.target.files),
                          ])
                        }
                      />
                    </label>
                  </div>
                </div>
                {/* VIDEO */}
                <div className="mb-4">
                  <p className="text-[#002f67]/68 font-semibold tracking-widest text-sm">
                    VIDEO
                  </p>

                  <label className="mt-2 flex items-center justify-center h-40 border-2 border-dashed border-gray-300 bg-gray-100 rounded cursor-pointer hover:border-[#002f67] transition">
                    {!video ? (
                      <span className="text-3xl text-[#002f67]">+</span>
                    ) : (
                      <video
                        src={URL.createObjectURL(video)}
                        controls
                        className="h-full w-full object-cover rounded"
                      />
                    )}

                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => setVideo(e.target.files[0])}
                    />
                  </label>
                </div>
              </div>
              <label className="bg-[#002f67] p-6 flex justify-between items-center  cursor-pointer">
                <p className=" tracking-widest font-bold text-white">
                  PINNED <br />
                  <span className="text-sm text-white/68">
                    Pin in Home Page
                  </span>
                </p>

                {/* TOGGLE */}
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={form.pinned}
                    onChange={(e) =>
                      setForm({ ...form, pinned: e.target.checked })
                    }
                    className="sr-only peer"
                  />

                  {/* Track */}
                  <div className="w-14 h-7 bg-gray-300 rounded-full peer-checked:bg-[#ffc800] transition-colors duration-300"></div>

                  {/* Thumb */}
                  <div className="absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-7"></div>
                </div>
              </label>
              <button
                type="submit"
                className="hover:rounded bg-[#ffc800] cursor-pointer text-[#002f67] font-bold tracking-widest"
              >
                EXECUTE CREATION
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="col-span-5 bg-[#002f67]/10 py-4 px-12 h-screen overflow-y-scroll">
          {/* <h6 className="text-[#002f67] font-semibold tracking-widest pt-4">
            INVENTORY DASHBOARD
          </h6> */}
          <h1 className="text-[#002f67] my-4 text-6xl font-black">
            ACTIVE ARCHIVES
          </h1>
          <hr className="border-[#ffc800] border-2 w-24 " />
          {projects.length === 0 ? (
            <div className="flex justify-center items-center">
              <p>No data</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 mt-4 gap-6">
              {projects.map((i) => {
                return (
                  <div className="bg-white border-l-4 border-[#002f67] p-4">
                    <img src={i.mainImage} className="mb-4" />
                    <p>Title: {i.title}</p>
                    <p>Overview: {i.overview}</p>
                    <p>Year Completed: {i.yearCompleted}</p>
                    <p>Client Name: {i.clientName}</p>
                    <p>Client Location: {i.clientLocation}</p>
                    <p>Client Industry: {i.clientIndustry}</p>
                    <p>Scope of Work: {i.scopeOfWork}</p>
                    <p>Size: {i.size}</p>
                    <p>
                      Pinned:{" "}
                      <span
                        className={i.pinned ? "text-green-600" : "text-red-500"}
                      >
                        {i.pinned ? "Pinned" : "Not Pinned"}
                      </span>
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => router.push(`/projects/${i._id}`)}
                        className="col-span-2 bg-[#ffc800] px-4 py-2 text-[#002f67] font-semibold hover:rounded cursor-pointer"
                      >
                        Edit
                      </button>
                      <div
                        onClick={() => {
                          setSelectedId(i._id);
                          setShowDelete(true);
                        }}
                        className="flex justify-center items-center border-[#002f67] border cursor-pointer"
                      >
                        {" "}
                        <img className="h-6" src="/trash.png" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
      {showDelete && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-xl w-[90%] max-w-md text-center">
            <h2 className="text-xl font-bold text-[#002f67] mb-4">
              Confirm Deletion
            </h2>

            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this project?
            </p>

            <div className="flex justify-center gap-4">
              {/* Cancel */}
              <button
                onClick={() => setShowDelete(false)}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
              >
                Cancel
              </button>

              {/* Confirm */}
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
