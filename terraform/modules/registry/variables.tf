variable "project_id" {
  description = "GCP project ID"
  type        = string
}

variable "region" {
  description = "Artifact Registryのリージョン"
  type        = string
}

variable "repository_id" {
  description = "Artifact RegistryリポジトリID"
  type        = string
}

variable "description" {
  description = "リポジトリ説明"
  type        = string
  default     = ""
}
