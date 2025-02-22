# Web dev tuntiesimerkit

## Authorization Rules

- **PUT /api/entries/:id**: Only the entry owner can update the entry.
- **DELETE /api/entries/:id**: Only the entry owner can delete the entry.
- **PUT /api/users/:id**: Users can update only their own user info.
- **DELETE /api/users/:id**: Users can delete only their own user info.
