output "repository_id" {
  description = "Artifact RegistryリポジトリID"
  value       = google_artifact_registry_repository.this.repository_id
}

output "repository_url" {
  description = "DockerリポジトリURL"
  value       = "${var.region}-docker.pkg.dev/${var.project_id}/${var.repository_id}"
}
