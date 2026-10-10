output "cloud_run_service_account_email" {
  description = "Cloud Run用サービスアカウントのメールアドレス"
  value       = google_service_account.cloud_run.email
}

output "cloud_run_service_account_name" {
  description = "Cloud Run用サービスアカウントのリソース名"
  value       = google_service_account.cloud_run.name
}

output "api_reader_service_account_email" {
  description = "Firestore read-only API runtime identity"
  value       = google_service_account.api_reader.email
}
