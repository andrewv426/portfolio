import Entry from "./Entry.jsx";
import { jobs } from "../data/work.js";

function Experience() {
  return (
    <section className="experience">
      <h2>work</h2>

      {jobs.map((job) => (
        <Entry entry={job} key={job.name} />
      ))}
    </section>
  );
}

export default Experience;
