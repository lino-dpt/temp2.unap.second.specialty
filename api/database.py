import MySQLdb

# Database configuration
db_config = {
    'host': 'localhost',
    'user': 'root',
    'passwd': '',
    'db': 'second_specialty',
}

# Create a connection to the database
conn = MySQLdb.connect(**db_config)