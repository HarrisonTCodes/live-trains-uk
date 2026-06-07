resource "neon_project" "live_trains_uk_db" {
  name = "${local.project_name}-db"
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

resource "neon_database" "live_trains_uk_db" {
  project_id = neon_project.live_trains_uk_db.id
  branch_id  = neon_branch.main.id
  name       = "verceldb"
  owner_name = neon_role.default.name
}

resource "neon_endpoint" "live_trains_uk_db" {
  project_id = neon_project.live_trains_uk_db.id
  branch_id  = neon_branch.main.id
  type       = "read_write"
}
