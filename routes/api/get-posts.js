export default function (req, res) {
  const posts = [
    { id: 1, title: "This is title 1 for post 1" },
    { id: 2, title: "this is title 2 for post 2" },
  ];

  res.json(posts);
}
