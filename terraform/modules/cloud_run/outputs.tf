output "service_name" {
  description = "Cloud Runサービス名"
  value       = google_cloud_run_v2_service.service.name
}

output "service_uri" {
  description = "Cloud RunサービスURI"
  value       = google_cloud_run_v2_service.service.uri
}

output "domain_mapping_records" {
  description = "ドメインマッピング用DNSレコード"
  value       = try(google_cloud_run_domain_mapping.mapping[0].status[0].resource_records, [])
}
