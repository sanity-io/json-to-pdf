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
  "imageUrl": "https://cdn.sanity.io/images/e8pwkiz9/production/be9baedbdf9878f16e17e8408735dadf1f60d283-1023x1027.png"
}
```

Serialized, the request might look like this:
```bash
curl https://json-to-pdf.sanity-io.now.sh/api/business-card?fileType=png&document={%22_createdAt%22%3A%222019-11-08T09%3A01%3A19Z%22%2C%22_id%22%3A%22649d43d2-cf09-4b8d-97b0-1cf1c0516efc%22%2C%22_rev%22%3A%22WMYoh99nZcxo0kcwEnFAi0%22%2C%22_type%22%3A%22person%22%2C%22_updatedAt%22%3A%222019-11-08T09%3A01%3A27Z%22%2C%22contactInfo%22%3A{%22_type%22%3A%22contactInfo%22%2C%22email%22%3A%22rosie%40example.com%22%2C%22linkedIn%22%3A%22rosie-the-riveter%22%2C%22phone%22%3A%22555-12345%22%2C%22twitter%22%3A%22%40rosietheriveter%22}%2C%22description%22%3A%22We%20can%20do%20it!%22%2C%22name%22%3A%22Rosie%20The%20Riveter%22%2C%22photo%22%3A{%22_type%22%3A%22figure%22%2C%22asset%22%3A{%22_ref%22%3A%22image-2a551a5dcfe76c91a392fb0405e129bbb7eddead-901x901-png%22%2C%22_type%22%3A%22reference%22}}%2C%22imageUrl%22%3A%22https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fe8pwkiz9%2Fproduction%2F19091fab26e0b891e261ea6e1f6f446c35106dd4-214x54.svg%3Fw%3D500%22}&imageUrl=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fe8pwkiz9%2Fproduction%2F19091fab26e0b891e261ea6e1f6f446c35106dd4-214x54.svg%3Fw%3D500
```
