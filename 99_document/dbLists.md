# Loot Adventure | DB

```mermaid
erDiagram
RANKING {
    index  userId PK
    string userName
    address address
    uint point
    datetime created_at
    datetime updated_at
}

XP {
    index  userId PK
    string userName
    address address
    uint xp
    datetime created_at
    datetime updated_at
}
```
