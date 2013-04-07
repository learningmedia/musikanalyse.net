SQLCMD -E -S (local) -i CreateLocalDb.sql
SQLCMD -E -S (local) -i Updates\000.sql
SQLCMD -E -S (local) -i Updates\001.sql
SQLCMD -E -S (local) -i PopulateLocalDb.sql
PAUSE