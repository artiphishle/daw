export default function DeepHouse() {
  const articles = [
    {
      content: {
        blockquote:
          "The TR-909 drum machine created by Roland Corporation in 1984, successor to Roland TR-808. The TR-909 is built on both analogue and sampling technology. It is a popular drum machine in genres such as house, techno and hip hop. However, it was not particularly popular when it was released; it was considered too synthetic.",
        cite: "https://www.w3schools.com/html/html_quotation_elements.asp",
      },
      foundOn: 1692878201603,
      heading: "The history of the TR-909",
      id: "rolandTr909",
    },
    {
      content: {
        blockquote:
          "Only around 10,000 TR-909s were made, but the machine&apos;s lasting impact is apparent on dance floors to this day. Much like the TR-808&apos;s dominance in rap and hip-hop, the TR-909 left an indelible mark on electronic music styles like techno, house, acid, and industrial. It&apos;s the sound you hear in your head when you think of floor-shaking dance music.",
        cite: "",
      },
      foundOn: 1692910113762,
      heading: "Sibling rivalry",
      id: "siblingRivalry",
    },
  ];

  return (
    <section>
      <h1>Deep House</h1>
      {articles.map(({ id, heading, content: { blockquote, cite } }) => (
        <article key={id}>
          <h1>{heading}</h1>
          <blockquote>{blockquote}</blockquote>
          <footer>
            <small>{cite}</small>
          </footer>
        </article>
      ))}
    </section>
  );
}
