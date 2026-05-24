resource "vercel_project" "live_trains_uk" {
  name      = "live-trains-uk"
  framework = "nextjs"

  git_repository = {
    type = "github"
    repo = "HarrisonTCodes/live-trains-uk"
    org  = var.vercel_team
  }
}

resource "vercel_project_environment_variable" "env_vars" {
  for_each = local.env_vars

  project_id = vercel_project.live_trains_uk.id
  key        = each.key
  value      = each.value
  sensitive  = can(regex("DATABASE_URL|API_KEY|SECRET|POSTGRES", each.key))
  target     = ["preview", "production"]
}