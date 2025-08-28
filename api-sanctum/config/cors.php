<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['http://localhost:5173'], // ✅ only allow your frontend
    'allowed_headers'   => ['*'],
    'exposed_headers'   => [],
    'max_age'           => 3600,
    'supports_credentials' => true,
];
