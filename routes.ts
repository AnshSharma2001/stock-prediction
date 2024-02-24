/**
 * An array of routes that are accessible to the public
 * these Routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = [
    "/"
];

/**
 * An array of routes that are used for authentication
 * these Routes will redirect login user to /dashboard
 * @type {string[]}
 */
export const authRoute = [
    "/login",
    "/register"
];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for authentication
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

export const DEFAULT_LOGIN_REDIRECT = "/dashboard";