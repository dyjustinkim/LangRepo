resource "aws_db_instance" "main" {
    allocated_storage                     = 20
    copy_tags_to_snapshot                 = true
    db_name                               = "langrepodb"
    engine                                = "postgres"
    engine_version                        = "17.6"
    identifier                            = "langrepodb"
    instance_class                        = "db.t4g.micro"
    password                              = var.db_password
    performance_insights_enabled          = true 
    region                                = "us-east-1"
    skip_final_snapshot                   = true
    storage_encrypted                     = true
    username                              = var.db_username
}

# Integrated database with Terraform