module.exports = {
    'facebookAuth': {
        'clientID':  '', // your App ID
        'clientSecret':  '', // your App Secret
        'callbackURL':  'http://localhost:3000/auth/facebook/callback',
        'profileFields': ['id', 'displayName', 'email', 'first_name', 'middle_name', 'last_name']
    }
}
