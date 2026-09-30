import { environment } from '../../../environments/environment';

const BASE_URL = environment.apiUrl;

// Users URLs
export const USER_LOGIN_URL = BASE_URL + '/api/user/login';
export const USER_REGISTER_URL = BASE_URL + '/api/user/register';
export const GET_ALL_USERS_PAGINATED_URL = BASE_URL + '/api/user/paginated';
export const UPDATE_USER_ROLE_URL = BASE_URL + '/api/user/update-role';

// CATEGORIAS URLs
export const CATEGORIAS_REGISTER_URL = BASE_URL + '/api/categorias/register';
export const GET_ALL_CATEGORIAS_URL = BASE_URL + '/api/categorias/';
export const GET_ALL_CATEGORIAS_PAGINATED_URL =
  BASE_URL + '/api/categorias/paginated';

// upload URLs
export const UPLOAD_IMAGE_URL = BASE_URL + '/uploads/';

// Post URLs
export const POST_REGISTER_URL = BASE_URL + '/api/posts/register';
export const GET_ALL_POSTS_PAGINATED_URL = BASE_URL + '/api/posts/paginated';
export const POST_ID_URL = BASE_URL + '/api/posts/id/:id';
