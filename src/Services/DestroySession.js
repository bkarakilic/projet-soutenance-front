export const DestroySession = () => {
    sessionStorage.removeItem('user_token_id');
    sessionStorage.removeItem('user_login');
    sessionStorage.removeItem('user_roles');
};