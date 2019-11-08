# json-to-pdf

This thing only handles a person document. It must be shaped like this:

```
{
  "_id": "449d40d2-cf09-4b8d-97b0-1cf1c051596f",
  "_type": "person",
  "contactInfo": {
    "_type": "contactInfo",
    "email": "laika@example.com",
    "linkedIn": "laika",
    "phone": "555-88776",
    "twitter": "@laika"
  },
  "description": "I'm Laika. Like and subscribe!",
  "name": "Laika",
  "profileImageUrl": "https://cdn.sanity.io/images/e8pwkiz9/production/be9baedbdf9878f16e17e8408735dadf1f60d283-1023x1027.png"
}
```


http://localhost:3000/api/json-to-pdf?document=<stringifyied-person-document>
