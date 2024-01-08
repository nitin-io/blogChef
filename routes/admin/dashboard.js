export default function (req, res) {
  res.render("dashboard", {
    user: req.session.user.name,
    lastLogIn: req.session.user.lastLogIn,
    posts: [
      {
        id: 1,
        author: "Joe Mockery",
        title: "Express is awesome!",
        content: "Express is awesome framework, have you tried it?",
      },
      {
        id: 2,
        author: "John Doe",
        title: "Pug is awesome template engine",
        content: "Pug is remarkable when it comes to generate html code",
      },
    ],
  });
}
