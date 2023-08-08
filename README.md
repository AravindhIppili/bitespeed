## Bitespeed Backend Task: Identity Reconciliation

# Base URL

The base URL to ping for the "/identify" endpoint is: `https://bitespeed-7b62.onrender.com`

# Request Format

Make an HTTP POST request to the "/identify" endpoint with a JSON body in the following format:

```json
{
    "email": "customer@example.com",
    "phoneNumber": "1234567890"
}
```

You can provide either an email or a phoneNumber or both in the request body.

# Response Format

The service will respond with a JSON payload containing the consolidated contact information. The response format is as follows:

```json
{
    "contact": {
        "primaryContactId": number,
        "emails": string[],          // First element being the email of primary contact
        "phoneNumbers": string[],    // First element being the phoneNumber of primary contact
        "secondaryContactIds": number[] // Array of all Contact IDs that are "secondary" to the primary contact
    }
}
```

# Example

Request:

```json
{
    "email": "customer@example.com",
    "phoneNumber": "1234567890"
}
```

Response:

```json
{
    "contact": {
        "primaryContactId": 1,
        "emails": ["customer@example.com"],
        "phoneNumbers": ["1234567890"],
        "secondaryContactIds": []
    }
}
```
