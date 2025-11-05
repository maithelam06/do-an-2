<?php

return [
    'paths' => [
        'api/*',
        'sanctum/csrf-cookie',
        'register',
        'login',
        'logout',
        'email/*',
        'forgot-password'
    ],

   'paths' => ['api/*', 'sanctum/csrf-cookie', 'login', 'logout', 'register','forgot-password'],

'allowed_origins' => ['http://localhost:5173'],
'allowed_methods' => ['*'],
'allowed_headers' => ['*'],

'supports_credentials' => true,
];
