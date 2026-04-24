import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";
import cloudinary from "@/lib/cloudinary";

// ✅ CREATE PROJECT
// export async function POST(req) {
//   try {
//     await connectDB();

//     const body = await req.json();

//     console.log("Incoming Project:", body);

//     // 🔥 Upload main image
//     const mainImageUpload = await cloudinary.uploader.upload(
//       body.mainImage,
//       {
//         folder: "projects/main",
//       }
//     );

//     // 🔥 Upload gallery images
//     const galleryUploads = await Promise.all(
//       body.images.map((img) =>
//         cloudinary.uploader.upload(img, {
//           folder: "projects/gallery",
//         })
//       )
//     );

//     const galleryUrls = galleryUploads.map((img) => img.secure_url);

//     // 🔥 Upload video (if exists)
//     let videoUrl = "";
//     if (body.video) {
//       const videoUpload = await cloudinary.uploader.upload(body.video, {
//         resource_type: "video",
//         folder: "projects/videos",
//       });

//       videoUrl = videoUpload.secure_url;
//     }

//     // ✅ Save to MongoDB
//     const project = await Project.create({
//       title: body.title,
//       overview: body.overview,
//       yearCompleted: body.yearCompleted,
//       clientName: body.clientName,
//       clientLocation: body.clientLocation,
//       clientIndustry: body.clientIndustry,
//       scopeOfWork: body.scopeOfWork,
//       size: body.size,
//       pinned: body.pinned || false,
//       mainImage: mainImageUpload.secure_url,
//       images: galleryUrls,
//       video: videoUrl,
//     });

//     return Response.json(project, { status: 201 });

//   } catch (error) {
//     console.error("PROJECT CREATE ERROR:", error);
//     return Response.json({ error: error.message }, { status: 500 });
//   }
// }



// export async function POST(req) {
//   try {
//     await connectDB();

//     const body = await req.json();

//     // ✅ CHECK PIN LIMIT
//     if (body.pinned) {
//       const pinnedCount = await Project.countDocuments({ pinned: true });

//       if (pinnedCount >= 4) {
//         return Response.json(
//           { error: "Maximum 4 pinned projects allowed" },
//           { status: 400 }
//         );
//       }
//     }

//     // 🔥 Upload main image
//     const mainImageUpload = await cloudinary.uploader.upload(
//       body.mainImage,
//       { folder: "projects/main" }
//     );

//     // 🔥 Upload gallery images
//     const galleryUploads = await Promise.all(
//       body.images.map((img) =>
//         cloudinary.uploader.upload(img, {
//           folder: "projects/gallery",
//         })
//       )
//     );

//     const galleryUrls = galleryUploads.map((img) => img.secure_url);

//     // 🔥 Upload video
//     let videoUrl = "";
//     if (body.video) {
//       const videoUpload = await cloudinary.uploader.upload(body.video, {
//         resource_type: "video",
//         folder: "projects/videos",
//       });
//       videoUrl = videoUpload.secure_url;
//     }

//     const project = await Project.create({
//       ...body,
//       mainImage: mainImageUpload.secure_url,
//       images: galleryUrls,
//       video: videoUrl,
//       pinned: body.pinned || false,
//     });

//     return Response.json(project, { status: 201 });

//   } catch (error) {
//     console.error("PROJECT CREATE ERROR:", error);
//     return Response.json({ error: error.message }, { status: 500 });
//   }
// }

export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const pinned = searchParams.get("pinned");

  let query = {};

  if (pinned === "true") {
    query.pinned = true;
  }

  const projects = await Project.find(query).sort({ createdAt: -1 });

  return Response.json(projects);
}

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    // ✅ CHECK PIN LIMIT
    if (body.pinned) {
      const pinnedCount = await Project.countDocuments({ pinned: true });

      if (pinnedCount >= 4) {
        return Response.json(
          { error: "Maximum 4 pinned projects allowed" },
          { status: 400 }
        );
      }
    }

    // 🔥 Upload main image
    const mainImageUpload = await cloudinary.uploader.upload(
      body.mainImage,
      { folder: "projects/main" }
    );

    // 🔥 Upload gallery images
    const galleryUploads = await Promise.all(
      body.images.map((img) =>
        cloudinary.uploader.upload(img, {
          folder: "projects/gallery",
        })
      )
    );

    const galleryUrls = galleryUploads.map((img) => img.secure_url);

    // 🔥 Upload video
    let videoUrl = "";
    if (body.video) {
      const videoUpload = await cloudinary.uploader.upload(body.video, {
        resource_type: "video",
        folder: "projects/videos",
      });
      videoUrl = videoUpload.secure_url;
    }

    const project = await Project.create({
      ...body,
      mainImage: mainImageUpload.secure_url,
      images: galleryUrls,
      video: videoUrl,
      pinned: body.pinned || false,
    });

    return Response.json(project, { status: 201 });

  } catch (error) {
    console.error("PROJECT CREATE ERROR:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}


// export async function GET() {
//   await connectDB();

//   const projects = await Project.find().sort({ createdAt: -1 });

//   return Response.json(projects);
// }