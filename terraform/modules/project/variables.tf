variable "project_id" {
  description = "GCP project ID"
  type        = string
}

variable "services" {
  description = "有効化するAPIサービス一覧"
  type        = list(string)
}
