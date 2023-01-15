# Prisma Selections

Prisma selections allow you to define "select aliases", so instead of writing:

```typescript
const user = await prisma.user.select({
  id: true,
  fullName: true,
  username: true,
  avatarUrl: true,
  // ...
})
```

You can write this instead:

```typescript
const user = await prisma.user.select({
  $profileData: true
})
```

And fully leverage the powerful intellisense provided by Prisma's TypeScript types!
