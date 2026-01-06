variable "project_id" {
  description = "GCP project ID"
  type        = string
}

variable "github_owner" {
  description = "GitHubオーナー名"
  type        = string
}

variable "github_repo" {
  description = "GitHubリポジトリ名"
  type        = string
}

variable "workload_identity_pool_id" {
  description = "Workload Identity Pool ID"
  type        = string
}

variable "workload_identity_provider_id" {
  description = "Workload Identity Provider ID"
  type        = string
}

variable "service_account_name" {
  description = "GitHub Actions用サービスアカウントID"
  type        = string
}

variable "service_account_display_name" {
  description = "GitHub Actions用サービスアカウント表示名"
  type        = string
}

variable "service_account_roles" {
  description = "GitHub Actions用サービスアカウントに付与するロール"
  type        = list(string)
  default     = []
}
