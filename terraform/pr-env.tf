terraform {
  backend "remote" {
    organization = "devolution"
    workspaces {
      name = "roster"
    }
  }
}

resource "null_resource" "terraform-github-actions" {
 triggers = {
   value = "This resource was created using GitHub Actions!"
 }
}