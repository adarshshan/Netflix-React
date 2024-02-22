import { useDebugValue, useState } from "react";
function useLogin() {
    const [rememberLogin, setRememberLogin] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return [rememberLogin, setRememberLogin, email, setEmail, password, setPassword];
}
function useProfile() {
    const [movies, setMovies] = useState([]);
    useDebugValue('removed movie' + movies);
    return [movies, setMovies];
}
function useSignUp() {
    const [rememberLogin, setRememberLogin] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return [rememberLogin, setRememberLogin, email, setEmail, password, setPassword]
}

export {
    useLogin,
    useProfile,
    useSignUp
}