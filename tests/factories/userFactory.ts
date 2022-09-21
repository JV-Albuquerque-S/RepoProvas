export default function userBody() {
    const body: {email: string; password: string; confirmPassword?: string} = {
        email: "abc@gmail.com",
        password: "123"
    };
    return body;
};