export const caseStudies = {
  "dropbox-learning-platform": {
    title: "learning platform",
    context: "dropbox · may – aug 2026 · shipped to production on aws ecs",
    intro: [
      "a django/postgresql platform that turns internal assessment data into personalized skill reports and learning modules, serving 1500+ dropbox employees.",
      "most of the hard parts were not the product surface. they were keeping learner state truthful when the data feeding it came from an external service that could retry, duplicate, arrive early, or partially fail — and when two different writers had a legitimate claim to the same rows.",
    ],
    sections: [
      {
        heading: "an assessment lifecycle that survives double-clicks and duplicate callbacks",
        body: [
          "the flow was not request/response. the app created an assessment with a third-party provider, redirected the learner away, then waited for a server-to-server callback carrying only an instance key. the provider controlled timing and retries, and delivered callbacks at least once.",
          "that opens several races at once. two concurrent starts can both observe \"no active attempt\" and create two separate paid assessments — and uniqueness on the returned vendor key cannot prevent it, because each create call returns a different key. a \"scores ready\" callback can race with scoring itself, returning http 200 with a null completion date and zeroed scores. the same callback can arrive twice.",
          "i modeled attempts as an explicit state machine — pending, completed, unavailable — and closed the check-then-create race by locking the learner row inside a transaction and re-checking. a competing request reuses the winner's attempt instead of creating a second one. callback processing resolves an instance key to exactly one pending attempt and refuses unknown or ambiguous matches rather than guessing one into a learner account.",
          "the webhook response encodes the retry decision. not-ready results and generic provider failures keep the attempt pending and return a retryable 5xx. expired keys and structurally invalid or mismatched payloads retire the attempt and acknowledge, because retrying cannot repair that data — which is what stops permanent errors from generating retry storms.",
          "the tradeoff: this holds a database lock across a vendor network call. that is simple and safe at the volume it runs at, but long network latency reduces concurrency. it is also exactly-once at the local persistence boundary, not across the external one — a crash between vendor success and local commit stays a reconciliation case. at higher scale i would separate claiming from network i/o and add a reconciliation worker.",
        ],
      },
      {
        heading: "a boundary that is strict and tolerant at the same time",
        body: [
          "the vendor's score payload was nested and unstable. scores arrived as numbers or as numeric strings, dates sometimes omitted timezones, field names differed by nesting level, and the score scale had no documented upper bound. the same skill went by one name in our product, another in older fixtures, and a third in the live api. sometimes we received all 15 skill scores; sometimes only four category scores with missing child arrays.",
          "joining on display names was fragile, because product copy and vendor terminology evolved independently. storing raw json and interpreting it in templates would have spread vendor assumptions through the whole application. rejecting everything that was not the ideal 15-leaf shape would have been safe but operationally brittle.",
          "i built an anti-corruption layer: recursively validate the vendor structure, normalize aliases into one canonical key space independent of display names, and convert it into a typed internal representation written through a single atomic path.",
          "the real work was deciding where to be tolerant and where to fail closed. numeric strings and naive timestamps get normalized. duplicate canonical keys, negative scores, and unknown tracks get rejected. a recognized category missing its child detail projects its score down to known child skills and marks that projection explicitly, so degraded data is never indistinguishable from real detail. an unknown leaf is preserved as unresolved source data rather than guessed into a product skill — and the read layer refuses to render that result as complete.",
          "reingestion upserts on user, source, and instance key rather than duplicating, and removes stale child rows that disappeared between runs.",
        ],
      },
      {
        heading: "two legitimate writers over the same rows",
        body: [
          "lesson content had two owners. repository-controlled initialization defined taxonomy, ordering, and defaults. a bounded in-app editor owned the authored copy that administrators actually wrote.",
          "always upserting from the repository would eventually destroy human work — an administrator retitles a lesson, initialization runs again, the edit is gone. never updating existing rows would protect edits but leave a partially initialized environment permanently unrepairable. and a naive \"fill empty fields\" rule mistakes an intentionally cleared section for missing data.",
          "i split ownership by model and field. code-owned structure synchronizes on every run. untouched authored fields receive blank-only backfills. the first meaningful in-app edit marks a lesson human-owned and freezes it from future reseeding, including fields an administrator deliberately cleared.",
          "concurrent editors were a related but separate problem: an edit form stays open for minutes, so a database lock cannot span the session. the form carries the row timestamp and a signed snapshot of every authored field it can change, and saving performs one conditional update against the version originally loaded. a stale save writes nothing, preserves what the administrator typed, and names exactly which fields conflicted before allowing an intentional retry. the signature matters — it lets the server explain the conflict without trusting client-supplied comparison data.",
          "the tradeoff is coarse, row-level ownership: once any field on a lesson is edited in-app, later repository improvements to that lesson stop flowing automatically. per-field provenance and a three-way merge would be the next step.",
        ],
      },
      {
        heading: "durable notifications without adding a broker",
        body: [
          "result emails and assessment-lifecycle slack messages involved two independently failing systems. sending inside the request would couple completed learner work to provider health, with no recovery path if the database committed and the provider did not.",
          "a full broker and worker framework would have solved it, but exceeded what the workload justified. postgresql already provided durability, locking, and indexing, so i modeled delivery explicitly as an outbox with states for pending, sending, retry, sent, failed, and suppressed.",
          "for result email, the result, the completed attempt, and a unique delivery row commit in the same transaction — if it rolls back, neither learner state nor email work survives. slack completion is deliberately queued best-effort after the assessment transaction commits, so a slack enqueue failure can never roll back a learner's result. that asymmetry is the whole guarantee, and it is worth stating precisely.",
          "workers claim due rows under row locks while skipping rows locked by other workers, mark them sending, assign an expiring lease, then release the transaction before calling the provider. crashed claims become recoverable when the lease expires. eligibility is re-checked at send time, because a delayed message may no longer be valid after a role change, a track change, or a newer result superseding a retake reminder. the outbox stores references and operational metadata — never email addresses, scores, or message bodies.",
          "this is not external exactly-once delivery, and i would not claim it is. if a provider accepts a message and the process crashes before marking it sent, the lease expires and the message may go out again. closing that needs provider-side idempotency keys.",
        ],
      },
      {
        heading: "fail-closed identity and role synchronization",
        body: [
          "roles could not be self-selected or allowed to drift from okta. i projected okta groups into application roles at login time, recomputing on every login rather than persisting manually editable roles.",
          "the fail-closed direction is the important one: missing or malformed group claims remove access instead of preserving yesterday's permissions. an administrator who loses their okta admin group loses local privileges on their next login.",
          "identity resolution uses the stable okta subject rather than email, since email is mutable and can be reassigned. legacy accounts without a subject fall back to case-insensitive email only when okta marks it verified, and the app refuses to relink an account already claimed by another subject.",
          "slack was treated as an optional integration, not an authentication dependency — it runs only after authorization, accepts a member only on an exact verified-email match that is not deleted and not a bot, and a slack outage cannot block an otherwise authorized login.",
        ],
      },
    ],
  },

  "dropbox-signal-router": {
    title: "customer signal router",
    context: "dropbox · may – aug 2026 · best tech execution · most likely to ship",
    intro: [
      "an agentic pipeline that turns unstructured customer signal into triaged, reproducible engineering work.",
      "support-forum posts arrive across five sources with no owning team, no severity, and no reproduction steps. the manual path from a report to a triaged ticket took about three days. this took it under 30 minutes across roughly 400 reports a week.",
    ],
    sections: [
      {
        heading: "classification",
        body: [
          "an llm agent ingests posts from five separate sources and classifies each one: owning team, severity, and a summary condensed from the original report.",
        ],
      },
      {
        heading: "enrichment and automated reproduction",
        body: [
          "each signal is enriched by joining internal experiment and feature-flag logs on user id, which gives the runtime context a raw forum post lacks — what the reporting user actually had enabled at the time.",
          "a playwright mcp agent then drives a browser to reproduce and validate the reported issue against that context, so a ticket carries a confirmed repro rather than a description.",
        ],
      },
      {
        heading: "downstream agents",
        body: [
          "validated repros chain into downstream agents that file structured jira tickets and open candidate prs, which is what collapses the report-to-triaged-ticket window from days to minutes.",
        ],
      },
    ],
  },
};
