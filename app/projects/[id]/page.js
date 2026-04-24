// "use client";
// import { useParams, useRouter } from "next/navigation";
// import React, { useEffect, useState } from "react";

// function Page() {
//   const { id } = useParams();
//   const router = useRouter();

//   const [form, setForm] = useState(null);

//   // 🔥 FETCH SINGLE PROJECT
//   const fetchProject = async () => {
//     const res = await fetch(`/api/projects/${id}`);
//     const data = await res.json();
//     setForm(data);
//     console.log(data)
//   };

//   useEffect(() => {
//     fetchProject();
//   }, []);

//   if (!form) return <p>Loading...</p>;

//   // 🔥 UPDATE
//   const handleUpdate = async (e) => {
//     e.preventDefault();

//     const res = await fetch(`/api/projects/${id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(form),
//     });

//     if (res.ok) {
//       alert("Updated ✅");
//       router.push("/projects"); // go back
//     } else {
//       alert("Error ❌");
//     }
//   };

//   return (
//     <div className="p-10">
//       <h1 className="text-3xl font-bold mb-6 text-[#002f67]">Edit Project</h1>

//       <form onSubmit={handleUpdate} className="grid grid-cols-2 gap-6">

//         <input className="bg-[#002f67]/10 w-full px-2 py-1 outline-0 shadow-md border-b border-[#002f67]/16 mb-4" value={form.title} onChange={(e)=>setForm({...form, title:e.target.value})} placeholder="Title"/>
//         <input className="bg-[#002f67]/10 w-full px-2 py-1 outline-0 shadow-md border-b border-[#002f67]/16 mb-4" value={form.overview} onChange={(e)=>setForm({...form, overview:e.target.value})} placeholder="Overview"/>
//         <input className="bg-[#002f67]/10 w-full px-2 py-1 outline-0 shadow-md border-b border-[#002f67]/16 mb-4" value={form.yearCompleted} onChange={(e)=>setForm({...form, yearCompleted:e.target.value})} placeholder="Year"/>
//         <input className="bg-[#002f67]/10 w-full px-2 py-1 outline-0 shadow-md border-b border-[#002f67]/16 mb-4" value={form.clientName} onChange={(e)=>setForm({...form, clientName:e.target.value})} placeholder="Client Name"/>
//         <input className="bg-[#002f67]/10 w-full px-2 py-1 outline-0 shadow-md border-b border-[#002f67]/16 mb-4" value={form.clientLocation} onChange={(e)=>setForm({...form, clientLocation:e.target.value})} placeholder="Location"/>
//         <input className="bg-[#002f67]/10 w-full px-2 py-1 outline-0 shadow-md border-b border-[#002f67]/16 mb-4" value={form.clientIndustry} onChange={(e)=>setForm({...form, clientIndustry:e.target.value})} placeholder="Industry"/>
//         <input className="bg-[#002f67]/10 w-full px-2 py-1 outline-0 shadow-md border-b border-[#002f67]/16 mb-4" value={form.scopeOfWork} onChange={(e)=>setForm({...form, scopeOfWork:e.target.value})} placeholder="Scope"/>
//         <input className="bg-[#002f67]/10 w-full px-2 py-1 outline-0 shadow-md border-b border-[#002f67]/16 mb-4" value={form.size} onChange={(e)=>setForm({...form, size:e.target.value})} placeholder="Size"/>

//         {/* PINNED */}
//         <label className="flex gap-2 items-center">
//           <input
//             type="checkbox"
//             checked={form.pinned}
//             onChange={(e) =>
//               setForm({ ...form, pinned: e.target.checked })
//             }
//           />
//           Pinned
//         </label>

//         <button className="col-span-2 bg-[#ffc800] py-3 font-bold">
//           SAVE CHANGES
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Page;
"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function Page() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState(null);

  const [mainImage, setMainImage] = useState(null);
  const [images, setImages] = useState([]); // new images
  const [video, setVideo] = useState(null);

  // 🔥 convert to base64
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  // 🔥 FETCH
  const fetchProject = async () => {
    const res = await fetch(`/api/projects/${id}`);
    const data = await res.json();
    setForm(data);
  };

  useEffect(() => {
    fetchProject();
  }, []);

  if (!form) return <p>Loading...</p>;

  // 🔥 UPDATE
  const handleUpdate = async (e) => {
    e.preventDefault();

    const mainBase64 = mainImage
      ? await toBase64(mainImage)
      : form.mainImage;

    const newImagesBase64 = await Promise.all(
      images.map((img) => toBase64(img))
    );

    const videoBase64 = video ? await toBase64(video) : form.video;

    const payload = {
      ...form,
      mainImage: mainBase64,
      images: form.images, // existing images
      newImages: newImagesBase64, // new uploads
      video: videoBase64,
    };

    const res = await fetch(`/api/projects/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      alert("Updated ✅");
      router.push("/projects");
    } else {
      alert("Error ❌");
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6 text-[#002f67]">
        Edit Project
      </h1>

      <form onSubmit={handleUpdate} className="grid grid-cols-2 gap-6">

        {/* TEXT FIELDS */}
        <input value={form.title} onChange={(e)=>setForm({...form, title:e.target.value})} placeholder="Title" className="input"/>
        <input value={form.overview} onChange={(e)=>setForm({...form, overview:e.target.value})} placeholder="Overview" className="input"/>
        <input value={form.yearCompleted} onChange={(e)=>setForm({...form, yearCompleted:e.target.value})} placeholder="Year" className="input"/>
        <input value={form.clientName} onChange={(e)=>setForm({...form, clientName:e.target.value})} placeholder="Client Name" className="input"/>
        <input value={form.clientLocation} onChange={(e)=>setForm({...form, clientLocation:e.target.value})} placeholder="Location" className="input"/>
        <input value={form.clientIndustry} onChange={(e)=>setForm({...form, clientIndustry:e.target.value})} placeholder="Industry" className="input"/>
        <input value={form.scopeOfWork} onChange={(e)=>setForm({...form, scopeOfWork:e.target.value})} placeholder="Scope" className="input"/>
        <input value={form.size} onChange={(e)=>setForm({...form, size:e.target.value})} placeholder="Size" className="input"/>

        {/* PINNED */}
        <label className="flex gap-2 items-center col-span-2">
          <input
            type="checkbox"
            checked={form.pinned}
            onChange={(e)=>setForm({...form, pinned:e.target.checked})}
          />
          Pinned
        </label>

        {/* MAIN IMAGE */}
        <div className="col-span-2">
          <p>Main Image</p>
          <label className="flex items-center justify-center w-48 border-2 border-dashed cursor-pointer">
            {!mainImage ? (
              <img src={form.mainImage} className="h-full w-full object-cover"/>
            ) : (
              <div>
              <img src={URL.createObjectURL(mainImage)} className=""/>
              </div>
            )}
            <input type="file" className="hidden" onChange={(e)=>setMainImage(e.target.files[0])}/>
          </label>
        </div>

        {/* GALLERY */}
        <div className="col-span-2">
          <p>Gallery</p>

          <div className="grid grid-cols-6 gap-3">

            {/* EXISTING */}
            {form.images?.map((img, index) => (
              <div key={index} className="relative">
                <img src={img} className="h-32 w-full object-cover"/>

                <button
                  type="button"
                  onClick={()=>{
                    setForm({
                      ...form,
                      images: form.images.filter((_,i)=>i!==index)
                    });
                  }}
                  className="absolute top-1 right-1 bg-red-500 text-white px-2 text-xs cursor-pointer"
                >
                  ✕
                </button>
              </div>
            ))}

            {/* NEW */}
            {images.map((img, i) => (
              <img
                key={i}
                src={URL.createObjectURL(img)}
                className="h-32 w-full object-cover"
              />
            ))}

            {/* ADD */}
            <label className="flex items-center justify-center h-32 w-full border-2 border-dashed cursor-pointer">
              +
              <input
                type="file"
                multiple
                className="hidden"
                onChange={(e)=>
                  setImages(prev=>[
                    ...prev,
                    ...Array.from(e.target.files)
                  ])
                }
              />
            </label>

          </div>
        </div>

        {/* VIDEO */}
        <div className="col-span-2">
          <p>Video</p>

          <label className="flex items-center justify-center h-40 border-2 border-dashed cursor-pointer">
            {!video ? (
              form.video ? (
                <video src={form.video} controls className="h-full w-full"/>
              ) : (
                "+"
              )
            ) : (
              <video src={URL.createObjectURL(video)} controls className="h-full w-full"/>
            )}

            <input type="file" className="hidden" onChange={(e)=>setVideo(e.target.files[0])}/>
          </label>
        </div>

        {/* SUBMIT */}
        <button className="col-span-2 bg-[#ffc800] py-3 font-bold cursor-pointer text-[#002f67]">
          SAVE CHANGES
        </button>
      </form>
    </div>
  );
}

export default Page;