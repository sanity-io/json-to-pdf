# Bring JSON, get a PDF (or one of the other outputs)

Outputs: `png`, `png`, `jpeg`, `html`

Currently, this thing only handles one particular job: Turn a person document into a business card.

The person doc must be shaped like this:

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


http://localhost:3000/api/business-card?fileType=pdf&document=<stringifyied-person-document>
