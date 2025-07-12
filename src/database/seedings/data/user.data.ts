const users = [
    {
        identification: "123456789",
        email: "user@example.com",
        name: "Carlos ",
        password: "admin",
    }
]

export const usersData = users.map((employee) => ({
    identification: employee.identification,
    email: employee.email,
    name: employee.name,
    password: employee.password,
}))