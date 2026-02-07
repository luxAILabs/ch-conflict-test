# Project Instructions

## ContextHub

**Never use `git commit` or `git push` directly. Always use `ch commit`.**

When you are done with your changes and ready to commit, ask the user:
> "Ready to commit these changes? I'll use `ch commit` to save the context."

Then run:
```bash
ch commit -m "concise description of changes"
```

This stages, commits, uploads context to R2, and pushes — all in one step.

### Merge Conflicts

If `ch commit` detects a merge conflict during push, it will:
1. Abort the rebase to keep the working tree clean
2. Print a `ch resolve <local-sha> <remote-sha>` command

**When you see this, run the printed `ch resolve` command.** It will spawn a resolver agent with full context from both sides of the conflict.

### Spawning Agents with Context

To continue work from a previous commit or understand its reasoning:
```bash
ch spawn <commit-sha>
```
