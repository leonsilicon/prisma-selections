# Prisma Selections

Prisma selections allow you to define "select aliases", so instead of writing:

```typescript
const user = await prisma.user.findUnique({
  select: {
    id: true,
    fullName: true,
    username: true,
    avatarUrl: true,
    // ...
  }
})
```

You can write this instead:

```typescript
const user = await prisma.user.findUnique({
  select: selections.user({
    $profileData: true,
    // ...
  })
})
```

And fully leverage the powerful intellisense provided by Prisma's TypeScript types!

> We need to use custom `selections.xyz` functions and not a generic function like `deepmerge` in order for intellisense to work within the function parameters.
