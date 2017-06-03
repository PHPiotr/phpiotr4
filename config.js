module.exports = {

    'api_url': 'https://boo-kings.herokuapp.com',
    'api_headers': {
        'Content-Type': 'application/json'
    },
    'secret': 'my_secret_passphrase',
    'database': 'mongodb://localhost/phpiotr4',
    'token_expires_in': 1440,
    'token_key': 'BEARER_TOKEN',
    'event': {
        'auth_failed': 'auth_failed',
        'auth_success': 'auth_success',
        'token_received': 'token_received'
    }

};