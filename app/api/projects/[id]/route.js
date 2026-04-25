
import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";
import cloudinary from "@/lib/cloudinary";

export async function PUT(req, context) {
  const params = await context.params;

  try {
    await connectDB();
    const body = await req.json();

    const existingProject = await Project.findById(params.id);

    // ✅ CHECK PIN LIMIT ONLY IF CHANGING TO PINNED
    if (body.pinned && !existingProject.pinned) {
      const pinnedCount = await Project.countDocuments({ pinned: true });

      if (pinnedCount >= 4) {
        return Response.json(
          { error: "Maximum 4 pinned projects allowed" },
          { status: 400 }
        );
      }
    }

    let mainImageUrl = body.mainImage;
    let galleryUrls = body.images || [];
    let videoUrl = body.video || "";

    // 🔥 MAIN IMAGE
    if (body.mainImage?.startsWith("data:")) {
      const upload = await cloudinary.uploader.upload(body.mainImage, {
        folder: "projects/main",
      });
      mainImageUrl = upload.secure_url;
    }

    // 🔥 GALLERY
    if (body.newImages?.length > 0) {
      const uploads = await Promise.all(
        body.newImages.map((img) =>
          cloudinary.uploader.upload(img, {
            folder: "projects/gallery",
          })
        )
      );

      galleryUrls = [
        ...galleryUrls,
        ...uploads.map((u) => u.secure_url),
      ];
    }

    // 🔥 VIDEO
    if (body.video?.startsWith("data:")) {
      const upload = await cloudinary.uploader.upload(body.video, {
        resource_type: "video",
        folder: "projects/videos",
      });
      videoUrl = upload.secure_url;
    }

    const updated = await Project.findByIdAndUpdate(
      params.id,
      {
        ...body,
        mainImage: mainImageUrl,
        images: galleryUrls,
        video: videoUrl,
      },
      { new: true }
    );

    return Response.json(updated);

  } catch (error) {
    console.error(error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}


export async function GET(req, context) {
  const params = await context.params;

  await connectDB();

  const project = await Project.findById(params.id);

  return Response.json(project);
}

// ❌ DELETE (optional but useful)
export async function DELETE(req, context) {
  const params = await context.params;

  await connectDB();

  await Project.findByIdAndDelete(params.id);

  return Response.json({ message: "Deleted successfully" });
}