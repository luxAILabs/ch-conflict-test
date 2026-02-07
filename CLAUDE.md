# Project Instructions

## ContextHub

**Never use `git commit` or `git push` directly. Always use `ch commit`.**

When you are done with your changes and ready to commit, ask the user:
> "Ready to commit these changes? I'll use `ch commit` to save the context."

Then run:
```bash
ch commit -m "concise description" --goal "<goal>" --subgoal "<subgoal>"
```

**Always include both `--goal` and `--subgoal`.** Write them as a software engineer scoping work — be detailed and specific, not terse.

#### `--goal` (the high-level objective)

Describe the broader objective this commit contributes to. Include enough context that someone unfamiliar with the project can understand the purpose. Cover: what feature or system is being built, why it matters, what the end state looks like, and how this commit fits into the bigger picture.

Example:
```
--goal "Building a complete user authentication system with OAuth2, session management, and role-based access control. The system needs to support enterprise SSO providers, handle token refresh flows, and integrate with the existing user database. This is the foundational auth layer that all API endpoints will depend on for access control."
```

#### `--subgoal` (the specific task in this commit)

Describe exactly what this commit accomplishes. Structure it as: what the problem was, what constraints or requirements had to be met, what you changed and why you made those specific choices, what trade-offs you considered, and what's left to do.

Example:
```
--subgoal "Problem: The OAuth2 implementation was using the implicit grant flow which is deprecated and insecure for server-side apps — tokens were exposed in URL fragments. Requirements: Must use Authorization Code flow with PKCE, must handle token refresh without user interaction, must store refresh tokens encrypted at rest. Implementation: Replaced the implicit flow in auth_middleware.py with Authorization Code + PKCE using a new PKCEChallenge class. Added token_store.py with AES-256 encrypted storage for refresh tokens. Updated the /callback endpoint to exchange codes for tokens server-side. Trade-off: Chose to store refresh tokens in the database rather than Redis for durability over speed — auth token refresh is infrequent enough that the latency is acceptable. Still TODO: Token revocation endpoint and refresh token rotation."
```

This stages, commits, uploads context to R2, and pushes — all in one step.

### Merge Conflicts

If `ch commit` detects a merge conflict during push, it will:
1. Abort the rebase to keep the working tree clean
2. Create a resolution record in R2 with `status: "pending"` and `repo_path`
3. Print a URL to the resolution UI

The `ch resolve` command accepts `--resolution-id <id>` to reuse an existing resolution record instead of creating a new one. When run this way, it skips creating a new record and updates the existing one to `status: "in_progress"`.

### Spawning Agents with Context

To continue work from a previous commit or understand its reasoning:
```bash
ch spawn <commit-sha>
```
