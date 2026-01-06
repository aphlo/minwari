variable "project_id" {
  description = "GCP project ID"
  type        = string
}

variable "region" {
  description = "Cloud Runリージョン"
  type        = string
}

variable "service_name" {
  description = "Cloud Runサービス名"
  type        = string
}

variable "image" {
  description = "デプロイするコンテナイメージ"
  type        = string
}

variable "service_account_email" {
  description = "Cloud Runサービスアカウントのメールアドレス"
  type        = string
}

variable "env_vars" {
  description = "Cloud Run環境変数"
  type        = map(string)
  default     = {}
}

variable "min_instances" {
  description = "最小インスタンス数"
  type        = number
  default     = 0
}

variable "max_instances" {
  description = "最大インスタンス数"
  type        = number
  default     = 10
}

variable "cpu" {
  description = "CPU"
  type        = string
  default     = "1"
}

variable "memory" {
  description = "メモリ"
  type        = string
  default     = "512Mi"
}

variable "container_port" {
  description = "コンテナポート"
  type        = number
  default     = 8080
}

variable "domain_name" {
  description = "Cloud Runドメインマッピングのドメイン"
  type        = string
  default     = "app.oursplit.us"
}

variable "ingress" {
  description = "Cloud Run ingress設定"
  type        = string
  default     = "INGRESS_TRAFFIC_ALL"
}

terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 6.0"
    }
    google-beta = {
      source  = "hashicorp/google-beta"
      version = "~> 6.0"
    }
  }
}
