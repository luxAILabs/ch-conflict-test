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
If there's a merge conflict, it will attempt to rebase and spawn a resolver agent if needed.

To spawn a new agent with context from a previous commit:
```bash
ch spawn <commit-sha>
```
