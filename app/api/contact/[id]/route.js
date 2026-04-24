import { connectDB } from "@/lib/mongodb";
import Contact from "@/models/Contact";

export async function PUT(req, context) {
  try {
    await connectDB();

    const params = await context.params; // ✅ FIX (IMPORTANT)
    const id = params.id;

    const body = await req.json();

    console.log("Updating:", id, body);

    if (!id) {
      return Response.json(
        { error: "ID missing" },
        { status: 400 }
      );
    }

    const updated = await Contact.findByIdAndUpdate(
      id,
      { status: body.status },
      { returnDocument: "after" } // ✅ modern mongoose
    );

    if (!updated) {
      return Response.json(
        { error: "Contact not found" },
        { status: 404 }
      );
    }

    return Response.json(updated);
  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}