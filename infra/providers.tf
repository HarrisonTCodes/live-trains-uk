terraform {
  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = ">= 4.8"
    }

    neon = {
      source = "kislerdm/neon"
    }
  }
}

provider "vercel" {
  api_token = var.vercel_api_token
  team      = var.vercel_team
}

provider "neon" {
  api_key = var.neon_api_key
}