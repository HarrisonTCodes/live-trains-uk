resource "neon_project" "live_trains_uk_db" {
  name = "live-trains-uk-db"
}

resource "neon_branch" "main" {
  project_id = neon_project.live_trains_uk_db.id
  name       = "main"
}