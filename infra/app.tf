resource "vercel_project" "live_trains_uk" {
  name      = local.project_name
  framework = "nextjs"

  git_repository = {
    type = "github"
    repo = "${local.github_account}/${local.project_name}"
    org  = var.vercel_team
  }
}

resource "vercel_project_environment_variable" "env_vars" {
  for_each = local.env_vars

  project_id = vercel_project.live_trains_uk.id
  key        = each.key
  value      = each.value
  sensitive  = can(regex(join("|", local.env_var_sensitive_identifiers), each.key))
  target     = ["preview", "production"]
}