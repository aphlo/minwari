output "artifact_registry_repository_url" {
  description = "Artifact RegistryのDockerリポジトリURL"
  value       = module.registry.repository_url
}

output "cloud_run_service_uri" {
  description = "Cloud RunサービスURI"
  value       = module.cloud_run.service_uri
}

output "cloud_run_domain_mapping_records" {
  description = "Cloud Runドメインマッピング用DNSレコード"
  value       = module.cloud_run.domain_mapping_records
}

output "github_workload_identity_provider" {
  description = "GitHub Actions用Workload Identity Provider"
  value       = module.gha_oidc.workload_identity_provider
}

output "github_actions_service_account_email" {
  description = "GitHub Actions用サービスアカウントメール"
  value       = module.gha_oidc.service_account_email
}
