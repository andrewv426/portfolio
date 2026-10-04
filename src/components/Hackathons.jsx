import Entry from "./Entry.jsx";
import { hackathons } from "../data/work.js";

function Hackathons() {
  return (
    <section className="hackathons">
      <h2>hackathons</h2>
      {hackathons.map((entry) => (
        <Entry entry={entry} key={entry.name} />
      ))}
    </section>
  );
}

export default Hackathons;
