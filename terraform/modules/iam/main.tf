resource "google_service_account" "cloud_run" {
  account_id   = var.cloud_run_service_account_name
  display_name = var.cloud_run_service_account_display_name
  project      = var.project_id
}

resource "google_project_iam_member" "cloud_run_roles" {
  for_each = toset(var.cloud_run_service_account_roles)

  project = var.project_id
  role    = each.value
  member  = "serviceAccount:${google_service_account.cloud_run.email}"
}
