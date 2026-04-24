// import { connectDB } from "@/lib/mongodb";
// import Contact from "@/models/Contact";
// import { sendMail } from "@/lib/mail";


// // GET ALL CONTACTS
// export async function GET() {
//   await connectDB();
//   const contacts = await Contact.find().sort({ createdAt: -1 });
//   return Response.json(contacts);
// }

// export async function POST(req) {
//   await connectDB();

//   const body = await req.json();

//   console.log("BODY:", body); // ✅ debug
//     await sendMail(body);

//   const contact = await Contact.create({
//     name: body.name,
//     email: body.email,
//     phone: body.phone,        // ✅ MUST BE HERE
//     service: body.service,    // ✅ MUST BE HERE
//     message: body.message,
//   });

//   return Response.json(contact);
// }
import { connectDB } from "@/lib/mongodb";
import Contact from "@/models/Contact";

// ✅ GET ALL CONTACTS
export async function GET() {
  try {
    await connectDB();

    const contacts = await Contact.find().sort({
      createdAt: -1,
    });

    return Response.json(contacts, {
      status: 200,
      headers: {
        "Cache-Control": "no-store", // 🚨 prevent caching
      },
    });
  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

// ✅ CREATE CONTACT
// export async function POST(req) {
//   try {
//     await connectDB();

//     const body = await req.json();

//     console.log("Incoming:", body); // 🧪 debug

//     const contact = await Contact.create({
//       name: body.name,
//       email: body.email,
//       phone: body.phone,        // ✅ included
//       service: body.service,    // ✅ included
//       message: body.message,
//       status: "new",
//     });

//     return Response.json(contact, { status: 201 });
//   } catch (error) {
//     return Response.json(
//       { error: error.message },
//       { status: 500 }
//     );
//   }
// }