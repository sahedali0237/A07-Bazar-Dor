export async function GET() {
  // TODO: Replace with database query when you set up a database
  const categories = [
    { id: "vegetables", title: "শাকসবজি" },
    { id: "fish", title: "মাছ" },
    { id: "meat", title: "মাংস" },
    { id: "rice", title: "চাল" },
    { id: "oil", title: "তেল" },
    { id: "spices", title: "মশলা" },
    { id: "fruits", title: "ফল" },
    { id: "dairy", title: "দুগ্ধজাত" },
  ];

  return Response.json(categories);
}
