resource "neon_project" "live_trains_uk_db" {
  name = "live-trains-uk-db"
}

resource "neon_branch" "main" {
  project_id = neon_project.live_trains_uk_db.id
  name       = "main"
}

resource "neon_role" "default" {
  project_id = neon_project.live_trains_uk_db.id
  branch_id  = neon_branch.main.id
  name       = "default"
}