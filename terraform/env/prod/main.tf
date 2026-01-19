terraform {
  cloud {

    organization = "aphlo"

    workspaces {
      name = "minwari"
    }
  }

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 6.0"
    }
    google-beta = {
      source  = "hashicorp/google-beta"
      version = "~> 6.0"
    }
    archive = {
      source  = "hashicorp/archive"
      version = "~> 2.0"
    }
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
}

provider "google-beta" {
  project = var.project_id
  region  = var.region
}

locals {
  cloud_run_image = "${var.region}-docker.pkg.dev/${var.project_id}/${var.artifact_registry_repository_id}/${var.cloud_run_service_name}:latest"
}

module "project" {
  source = "../../modules/project"

  project_id = var.project_id
  services = [
    "artifactregistry.googleapis.com",
    "cloudresourcemanager.googleapis.com",
    "firestore.googleapis.com",
    "iam.googleapis.com",
    "iamcredentials.googleapis.com",
    "run.googleapis.com",
    "sts.googleapis.com"
  ]
}

module "iam" {
  source = "../../modules/iam"

  project_id                             = var.project_id
  cloud_run_service_account_name         = var.cloud_run_service_account_name
  cloud_run_service_account_display_name = var.cloud_run_service_account_display_name
}

module "registry" {
  source = "../../modules/registry"

  project_id    = var.project_id
  region        = var.region
  repository_id = var.artifact_registry_repository_id
  description   = "Container images for Cloud Run"
}

module "cloud_run" {
  source = "../../modules/cloud_run"

  project_id            = var.project_id
  region                = var.region
  service_name          = var.cloud_run_service_name
  image                 = local.cloud_run_image
  service_account_email = module.iam.cloud_run_service_account_email
  env_vars              = var.cloud_run_env_vars
  min_instances         = var.cloud_run_min_instances
  max_instances         = var.cloud_run_max_instances
  cpu                   = var.cloud_run_cpu
  memory                = var.cloud_run_memory
  container_port        = var.cloud_run_container_port
  container_name        = "minwari-webapp"
  domain_name           = var.cloud_run_domain_name

  providers = {
    google-beta = google-beta
  }
}

module "gha_oidc" {
  source = "../../modules/gha_oidc"

  project_id                    = var.project_id
  github_owner                  = var.github_owner
  github_repo                   = var.github_repo
  workload_identity_pool_id     = var.github_workload_identity_pool_id
  workload_identity_provider_id = var.github_workload_identity_provider_id
  service_account_name          = var.github_service_account_name
  service_account_display_name  = var.github_service_account_display_name
  service_account_roles         = var.github_service_account_roles
}
