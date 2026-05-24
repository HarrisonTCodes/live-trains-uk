terraform {
  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = ">= 4.8"
    }
  }
}

provider "vercel" {
  api_token = var.vercel_api_token
  team      = var.vercel_team
}