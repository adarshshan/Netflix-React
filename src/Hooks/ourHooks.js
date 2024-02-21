import { useState } from "react";
function useLogin() {
    const [rememberLogin, setRememberLogin] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return [rememberLogin, setRememberLogin, email, setEmail, password, setPassword];
}

export {
    useLogin
}