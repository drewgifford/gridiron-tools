#!/bin/sh
set -e

echo "Running database migrations..."
bun etc/scripts/migrate.ts

echo "Starting server..."
exec bun server.js
