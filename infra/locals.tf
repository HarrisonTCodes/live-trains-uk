locals {
  env_file_content = fileexists("../.env.prod") ? file("../.env.prod") : ""

  # Parse environment variables into a map
  env_vars = {
    for line in compact(split("\n", local.env_file_content)) :
    trimspace(split("=", line)[0]) => trimspace(join("=", slice(split("=", line), 1, length(split("=", line)))))
    if !startswith(trimspace(line), "#") && length(split("=", line)) >= 2 && trimspace(line) != ""
  }

  env_var_sensitive_identifiers = ["DATABASE_URL", "API_KEY", "SECRET", "POSTGRES"]
}
