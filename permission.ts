export const serviceAccount = {
  "type": "service_account",
  "project_id": "green-6bd7d",
  "private_key_id": process.env.SERVICE_ACC_PRIV_ID, 
  "private_key": process.env.SERVICE_ACC_PRIV_KEY?.replace(/\\n/gm, "\n"),
  "client_email": "firebase-adminsdk-oes5v@green-6bd7d.iam.gserviceaccount.com",
  "client_id": "116959505581483990221",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": process.env.SERVICE_ACC_CERT_URL
}
