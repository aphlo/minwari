variable "project_id" {
  description = "プロジェクトID"
  type        = string
  default     = "minwarikan"
}

variable "region" {
  description = "リージョン"
  type        = string
  default     = "asia-northeast1"
}

variable "cloud_run_service_account_name" {
  description = "Cloud Run用サービスアカウントID"
  type        = string
  default     = "minwari-cloud-run"
}

variable "cloud_run_service_account_display_name" {
  description = "Cloud Run用サービスアカウント表示名"
  type        = string
  default     = "minwari Cloud Run"
}

variable "artifact_registry_repository_id" {
  description = "Artifact RegistryリポジトリID"
  type        = string
  default     = "minwari"
}

variable "cloud_run_service_name" {
  description = "Cloud Runサービス名"
  type        = string
  default     = "minwari-webapp"
}

variable "cloud_run_min_instances" {
  description = "Cloud Run最小インスタンス数"
  type        = number
  default     = 0
}

variable "cloud_run_max_instances" {
  description = "Cloud Run最大インスタンス数"
  type        = number
  default     = 10
}

variable "cloud_run_cpu" {
  description = "Cloud Run CPU"
  type        = string
  default     = "1"
}

variable "cloud_run_memory" {
  description = "Cloud Runメモリ"
  type        = string
  default     = "512Mi"
}

variable "cloud_run_container_port" {
  description = "Cloud Runコンテナポート"
  type        = number
  default     = 8080
}

variable "cloud_run_env_vars" {
  description = "Cloud Run環境変数"
  type        = map(string)
  default     = {}
}

variable "cloud_run_domain_name" {
  description = "Cloud Runドメインマッピング対象のドメイン"
  type        = string
  default     = "app.oursplit.us"
}

variable "github_owner" {
  description = "GitHubオーナー名"
  type        = string
  default     = "aphlo"
}

variable "github_repo" {
  description = "GitHubリポジトリ名"
  type        = string
  default     = "minwari"
}

variable "github_workload_identity_pool_id" {
  description = "Workload Identity Pool ID"
  type        = string
  default     = "github-actions"
}

variable "github_workload_identity_provider_id" {
  description = "Workload Identity Provider ID"
  type        = string
  default     = "github-actions"
}

variable "github_service_account_name" {
  description = "GitHub Actions用サービスアカウントID"
  type        = string
  default     = "minwari-github-actions"
}

variable "github_service_account_display_name" {
  description = "GitHub Actions用サービスアカウント表示名"
  type        = string
  default     = "minwari GitHub Actions"
}

variable "github_service_account_roles" {
  description = "GitHub Actions用サービスアカウントに付与するロール"
  type        = list(string)
  default = [
    "roles/artifactregistry.writer",
    "roles/run.admin",
    "roles/iam.serviceAccountUser"
  ]
}
