output "workload_identity_provider" {
  description = "Workload Identity Providerリソース名"
  value       = google_iam_workload_identity_pool_provider.github.name
}

output "workload_identity_pool" {
  description = "Workload Identity Poolリソース名"
  value       = google_iam_workload_identity_pool.github.name
}

output "service_account_email" {
  description = "GitHub Actions用サービスアカウントメール"
  value       = google_service_account.github_actions.email
}
