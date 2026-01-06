variable "project_id" {
  description = "GCP project ID"
  type        = string
}

variable "cloud_run_service_account_name" {
  description = "Cloud Run用サービスアカウントID"
  type        = string
}

variable "cloud_run_service_account_display_name" {
  description = "Cloud Run用サービスアカウント表示名"
  type        = string
  default     = "Cloud Run service account"
}

variable "cloud_run_service_account_roles" {
  description = "Cloud Run用サービスアカウントに付与するロール"
  type        = list(string)
  default = [
    "roles/artifactregistry.reader",
    "roles/datastore.user",
    "roles/secretmanager.secretAccessor"
  ]
}
