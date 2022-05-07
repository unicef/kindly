---
sidebar_position: 7
---

# 📄 API Documentation

## List all available endpoints

List all endpoints available through this API.

```
GET /
```
### Code Samples

**Shell**

```bash
curl http://localhost:8080/
```

### Default Response

```
Status: 200 OK
```
```json
{
    "detect": "/detect"
}
```

## Cyberbullying detection

Send a piece of text and through this API to determine if it is offensive to post or not.

```
POST /detect
```

```PAYLOAD```
```
{
    "text":"this movie is great"
}
```

### Code Samples

**Shell**

```bash
curl \
  -X POST \
  -H "Content-Type: application/json" \
  http://localhost:8080/detect \
  -d '{"text":"this movie is great"}'
```

### Default Response

```
Status: 200 OK
```
```json
{
    "result": {
        "not-offensive": "0.8308081",
        "offensive": "0.1691919"
        },
    "text": "this movie is great"
}

```
